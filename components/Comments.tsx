import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';

type Comment = {
  id: string;
  name: string;
  message: string;
  created_at: string;
};

const commentsApiUrl = (import.meta.env.VITE_COMMENTS_API_URL || '').replace(/\/$/, '');

export const Comments: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const loadComments = useCallback(async () => {
    if (!commentsApiUrl) {
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(commentsApiUrl, { headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error('Comments are temporarily unavailable. Please try again soon.');
      const data = await response.json();
      setComments(Array.isArray(data.comments) ? data.comments : []);
      setError('');
    } catch {
      setError('Comments are temporarily unavailable. Please try again soon.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void loadComments(); }, [loadComments]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setNotice('');
    if (!commentsApiUrl) {
      setError('Comments are not connected yet. Please check back soon.');
      return;
    }
    if (!name.trim() || !message.trim()) {
      setError('Please add your name and a comment.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(commentsApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: name.trim(), message: message.trim(), website }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Your comment could not be posted. Please try again.');
      setName('');
      setMessage('');
      setWebsite('');
      setNotice('Thanks for sharing your experience.');
      await loadComments();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Your comment could not be posted. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="comments" className="scroll-mt-20 border-t border-zinc-200 bg-white py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-[0.85fr_1.15fr] md:gap-20">
        <div>
          <span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">Your experience</span>
          <h2 className="mb-5 text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl">Ride with us.<br />Tell us about it.</h2>
          <p className="max-w-md text-lg leading-relaxed text-zinc-500">
            Visited our showroom or took a ride? Leave a note for the Mahadev Automotive community.
          </p>
          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm text-zinc-600">
            <MessageSquare size={16} /> {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
          </div>
        </div>

        <div className="space-y-8">
          <form onSubmit={handleSubmit} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 shadow-sm sm:p-7">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h3 className="text-lg font-semibold text-zinc-900">Leave a comment</h3>
              <span className="text-xs text-zinc-400">Be kind. Keep it helpful.</span>
            </div>
            <label className="mb-4 block">
              <span className="mb-2 block text-sm font-medium text-zinc-700">Your name</span>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                maxLength={60}
                autoComplete="name"
                required
                placeholder="Name"
                className="min-h-0 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200"
              />
            </label>
            <label className="mb-4 block">
              <span className="mb-2 block text-sm font-medium text-zinc-700">Your comment</span>
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                maxLength={1000}
                required
                rows={4}
                placeholder="Share your experience..."
                className="min-h-0 w-full resize-y rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm leading-relaxed text-zinc-900 outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200"
              />
              <span className="mt-1 block text-right text-xs text-zinc-400">{message.length}/1000</span>
            </label>
            <label aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
              Leave this field empty
              <input tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} />
            </label>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p role="status" aria-live="polite" className={`text-sm ${error ? 'text-red-600' : 'text-zinc-500'}`}>
                {error || notice}
              </p>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex min-h-0 items-center gap-2 rounded-full bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:cursor-wait disabled:opacity-60"
              >
                {submitting ? 'Posting…' : 'Post comment'} <Send size={15} />
              </button>
            </div>
          </form>

          <div aria-live="polite" className="space-y-4">
            {loading && <p className="text-sm text-zinc-500">Loading comments…</p>}
            {!loading && !error && comments.length === 0 && (
              <p className="rounded-xl border border-dashed border-zinc-300 p-6 text-center text-sm text-zinc-500">No comments yet. Be the first to share your experience.</p>
            )}
            {comments.map((comment) => (
              <article key={comment.id} className="rounded-xl border border-zinc-200 bg-white p-5">
                <div className="mb-3 flex items-start justify-between gap-4">
                  <h4 className="font-semibold text-zinc-900">{comment.name}</h4>
                  <time className="shrink-0 text-xs text-zinc-400" dateTime={comment.created_at}>
                    {new Date(comment.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                  </time>
                </div>
                <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-zinc-600">{comment.message}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
