import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const jsonHeaders = { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' };

function response(body: unknown, status = 200, headers: HeadersInit = {}) {
  return new Response(JSON.stringify(body), { status, headers: { ...jsonHeaders, ...headers } });
}

async function hashIp(ip: string, salt: string) {
  const bytes = new TextEncoder().encode(`${salt}:${ip}`);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

Deno.serve(async (request) => {
  const allowedOrigins = (Deno.env.get('ALLOWED_ORIGINS') || '')
    .split(',').map((origin) => origin.trim()).filter(Boolean);
  const origin = request.headers.get('origin');

  if (origin && !allowedOrigins.includes(origin)) {
    return response({ error: 'Origin not allowed.' }, 403);
  }

  const corsHeaders: Record<string, string> = {
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'content-type',
    'Vary': 'Origin',
  };
  if (origin && allowedOrigins.includes(origin)) corsHeaders['Access-Control-Allow-Origin'] = origin;
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders });

  if (!['GET', 'POST'].includes(request.method)) {
    return response({ error: 'Method not allowed.' }, 405, { ...corsHeaders, Allow: 'GET, POST, OPTIONS' });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!supabaseUrl || !serviceRoleKey || !allowedOrigins.length) {
    console.error('Comments function is missing server configuration.');
    return response({ error: 'Comments are temporarily unavailable.' }, 503, corsHeaders);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  if (request.method === 'GET') {
    const { data, error } = await supabase
      .from('comments')
      .select('id, name, message, created_at')
      .order('created_at', { ascending: false })
      .limit(100);
    if (error) {
      console.error('Could not load comments:', error.message);
      return response({ error: 'Comments are temporarily unavailable.' }, 503, corsHeaders);
    }
    return response({ comments: data || [] }, 200, corsHeaders);
  }

  let payload: { name?: unknown; message?: unknown; website?: unknown };
  try {
    const contentLength = Number(request.headers.get('content-length') || 0);
    if (contentLength > 5000) return response({ error: 'Comment is too large.' }, 413, corsHeaders);
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > 5000) {
      return response({ error: 'Comment is too large.' }, 413, corsHeaders);
    }
    payload = JSON.parse(rawBody);
  } catch {
    return response({ error: 'Please send a valid comment.' }, 400, corsHeaders);
  }
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return response({ error: 'Please send a valid comment.' }, 400, corsHeaders);
  }

  // Quietly accept honeypot submissions without publishing them.
  if (typeof payload.website === 'string' && payload.website.trim()) {
    return response({ ok: true }, 200, corsHeaders);
  }

  if (typeof payload.name !== 'string' || typeof payload.message !== 'string') {
    return response({ error: 'Please add your name and a comment.' }, 400, corsHeaders);
  }
  const name = payload.name.trim();
  const message = payload.message.trim();
  if (name.length < 1 || name.length > 60 || message.length < 1 || message.length > 1000) {
    return response({ error: 'Name must be 1–60 characters and comment 1–1000 characters.' }, 400, corsHeaders);
  }

  const ip = request.headers.get('cf-connecting-ip') || request.headers.get('x-real-ip') || '';
  const salt = Deno.env.get('RATE_LIMIT_SALT');
  if (!ip || !salt) {
    console.error('Comments function is missing rate-limit configuration.');
    return response({ error: 'Comments are temporarily unavailable.' }, 503, corsHeaders);
  }

  const { data: posted, error } = await supabase.rpc('publish_comment', {
    p_name: name,
    p_message: message,
    p_ip_hash: await hashIp(ip, salt),
  });
  if (error) {
    console.error('Could not publish comment:', error.message);
    return response({ error: 'Comments are temporarily unavailable.' }, 503, corsHeaders);
  }
  if (!posted) return response({ error: 'Please wait before posting another comment.' }, 429, corsHeaders);
  return response({ ok: true }, 201, corsHeaders);
});
