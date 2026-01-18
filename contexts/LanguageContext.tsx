import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi';

const translations = {
  en: {
    header: {
      brand: "Mahadev Automotive",
      services: "Services",
      scooters: "Scooters",
      gallery: "Gallery",
      contact: "Contact",
      call: "Call Us"
    },
    hero: {
      tag: "Premium EV Dealership",
      title1: "Mahadev",
      title2: "Automotive",
      tagline: "RIDE INTO THE FUTURE",
      sub: "Your trusted partner for premium EV scooters, expert service, and reliable repair in Meerut.",
      btnPrimary: "View Scooters",
      btnSecondary: "Our Services"
    },
    services: {
      title: "Our Services",
      sub: "We are more than just a showroom. We are a complete ecosystem for your electric vehicle needs.",
      items: [
        {
          title: "EV Sales",
          desc: "Discover the latest range of high-performance electric scooters. We offer a curated selection of models perfect for city commutes and long rides.",
          badges: ["Latest Models", "Test Rides", "Finance Options"]
        },
        {
          title: "Expert Repair",
          desc: "Facing an issue? Our certified technicians specialize in EV diagnostics and repair. From battery issues to motor tuning, we fix it all.",
          badges: ["Battery Diagnostics", "Motor Repair", "Part Replacement"]
        },
        {
          title: "Service & Maintenance",
          desc: "Regular maintenance keeps your ride smooth. We provide comprehensive servicing packages to ensure your scooter stays in top condition.",
          badges: ["Periodic Checkup", "Software Updates", "Cleaning"]
        }
      ]
    },
    features: {
      heading: "Engineered for perfection.",
      sub: "Every curve, every bolt, every line of code is intentional.",
      bottom: "Built using aerospace materials, real-world telemetry, and next-gen energy systems.",
      btn: "Explore the technology",
      items: [
        { title: "Infinite Range", desc: "Our new graphene solid-state battery technology delivers up to 75 miles on a single charge." },
        { title: "Aerodynamic Flow", desc: "Sculpted in a wind tunnel. Drag coefficient of 0.24 means you slice through the air." },
        { title: "Titanium Core", desc: "Aerospace-grade titanium frame provides unmatched durability while keeping it featherlight." }
      ]
    },
    models: {
      heading1: "Choose your ",
      heading2: "scooter.",
      sub: "Explore our range of premium electric scooters.",
      items: [
        {
          name: "Active Pro",
          desc: "A versatile scooter perfect for daily commutes and urban riding.",
          specs: ["Range: upto 150 km", "Warranty: upto 3 years", "Spare Parts & Service"],
          priceLabel: "Starting at",
          btn: "Inquire Now"
        },
        {
          name: "BMW Pro",
          desc: "Premium performance with advanced features for the discerning rider.",
          specs: ["Range: upto 150 km", "Warranty: upto 3 years", "Spare Parts & Service"],
          priceLabel: "Starting at",
          btn: "Inquire Now"
        },
        {
          name: "Crown Ola",
          desc: "Elegant design meets powerful performance for a royal experience.",
          specs: ["Range: upto 150 km", "Warranty: upto 3 years", "Spare Parts & Service"],
          priceLabel: "Starting at",
          btn: "Inquire Now"
        },
        {
          name: "Duel Pro",
          desc: "Dual-purpose scooter for both city and highway adventures.",
          specs: ["Range: upto 150 km", "Warranty: upto 3 years", "Spare Parts & Service"],
          priceLabel: "Starting at",
          btn: "Inquire Now"
        },
        {
          name: "Sports One",
          desc: "Sporty design with agile handling for the thrill-seeker.",
          specs: ["Range: upto 150 km", "Warranty: upto 3 years", "Spare Parts & Service"],
          priceLabel: "Starting at",
          btn: "Inquire Now"
        }
      ]
    },
    techSpecs: {
      items: [
        { category: "Propulsion", title: "HyperDrive™ Motor", desc: "Experience the raw power of our proprietary flux-vector control system. Delivering 45kW of peak power, it propels you from 0 to 60mph in a blistering 3.2 seconds." },
        { category: "Energy Architecture", title: "Graphene Solid-State", desc: "Our revolutionary graphene-enhanced solid-state battery technology redefines endurance. Achieving an industry-leading 75 miles on a single charge." },
        { category: "Chassis Dynamics", title: "Aerospace Titanium", desc: "Forged from Grade 5 titanium alloy, the unibody frame offers the strength of steel at half the weight." },
        { category: "Neural Core", title: "V-OS Intelligence", desc: "The scooter that thinks ahead. Powered by dual NVIDIA Orin modules, V-OS processes 500 million operations per second." },
        { category: "Photonics", title: "Adaptive Matrix LED", desc: "See and be seen. Our adaptive matrix headlight system sculpts light around oncoming traffic while illuminating hazards up to 300 meters away." }
      ]
    },
    design: {
      bgText: "DESIGN IN MOTION",
      title: "Visual Identity",
      sub: "We believe transportation should be beautiful. Scroll to exploreEV aesthetic philosophy.",
      cards: [
        { title: "Urban Flow", subtitle: "Designed for the rhythm of the city." },
        { title: "Precision", subtitle: "Every angle calculated." },
        { title: "Nocturnal", subtitle: "Own the night with adaptive lighting." },
        { title: "Freedom", subtitle: "Explore without limits." }
      ]
    },
    gallery: {
      title1: "SHOWROOM",
      title2: "GALLERY",
      sub: "A glimpse into the engineering and lifestyle of EV owners worldwide."
    },
    proof: {
      title: "Trusted by the best.",
      quote: "\"EV has completely transformed my daily commute. It's not just a scooter; it's a piece of art that moves.\"",
      role: "Product Designer @ Vercel",
      stats: ["Active Riders", "Miles Traveled", "CO2 Saved"]
    },
    cta: {
      title: "Get in touch.",
      desc: "Visit our showroom to experience the future of mobility, or reach out for expert support.",
      showroom: "Showroom",
      address: ["H.no-17, N.H.-58 Service Road,", "Near Khirwa Chowk, Kankar Khera,", "Meerut Cantt 250001"],
      directions: "Get Directions",
      contact: "Contact Us",
      sales: "Sales & Support",
      email: "Email",
      hours: "Mon - Sat: 10:00 AM - 8:00 PM",
      footer: "© 2024 Mahadev Automotives. All rights reserved."
    }
  },
  hi: {
    header: {
      brand: "महादेव ऑटोमोटिव्स",
      services: "सेवाएं",
      scooters: "स्कूटर्स",
      gallery: "गैलरी",
      contact: "संपर्क",
      call: "कॉल करें"
    },
    hero: {
      tag: "प्रीमियम ईवी डीलरशिप",
      title1: "महादेव",
      title2: "ऑटोमोटिव्स",
      tagline: "भविष्य की ओर बढ़ें",
      sub: "प्रीमियम ईवी स्कूटर्स, विशेषज्ञ सेवा और विश्वसनीय मरम्मत के लिए आपका भरोसेमंद साथी।",
      btnPrimary: "स्कूटर्स देखें",
      btnSecondary: "हमारी सेवाएं"
    },
    services: {
      title: "हमारी सेवाएं",
      sub: "हम सिर्फ एक शोरूम से बढ़कर हैं। हम आपकी इलेक्ट्रिक वाहन जरूरतों के लिए एक संपूर्ण इकोसिस्टम हैं।",
      items: [
        {
          title: "ईवी सेल्स",
          desc: "हाई-परफॉर्मेंस इलेक्ट्रिक स्कूटर्स की नवीनतम रेंज खोजें। हम शहर और लंबी यात्रा के लिए बेहतरीन मॉडल्स प्रदान करते हैं।",
          badges: ["नवीनतम मॉडल्स", "टेस्ट राइड्स", "फाइनेंस विकल्प"]
        },
        {
          title: "विशेषज्ञ मरम्मत",
          desc: "कोई समस्या है? हमारे सर्टिफाइड टेक्नीशियन ईवी डायग्नोस्टिक्स और मरम्मत में माहिर हैं। बैटरी से लेकर मोटर तक, हम सब ठीक करते हैं।",
          badges: ["बैटरी डायग्नोस्टिक्स", "मोटर मरम्मत", "पार्ट्स रिप्लेसमेंट"]
        },
        {
          title: "सर्विस और रखरखाव",
          desc: "नियमित रखरखाव आपकी सवारी को सुगम रखता है। हम व्यापक सर्विसिंग पैकेज प्रदान करते हैं ताकि आपका स्कूटर टॉप कंडीशन में रहे।",
          badges: ["समय-समय पर चेकअप", "सॉफ्टवेयर अपडेट", "सफाई"]
        }
      ]
    },
    features: {
      heading: "परफेक्शन के लिए निर्मित।",
      sub: "हर मोड़, हर बोल्ट, हर लाइन का एक मकसद है।",
      bottom: "एयरोस्पेस सामग्री, वास्तविक दुनिया की टेलीमेट्री और अगली पीढ़ी के ऊर्जा सिस्टम का उपयोग करके बनाया गया।",
      btn: "तकनीक जानें",
      items: [
        { title: "अनंत रेंज", desc: "हमारी नई ग्राफीन सॉलिड-स्टेट बैटरी तकनीक एक बार चार्ज करने पर 75 मील तक चलती है।" },
        { title: "एयरोडायनामिक फ्लो", desc: "विंड टनल में तराशा गया। 0.24 के ड्रैग गुणांक का मतलब है कि आप हवा को चीरते हुए निकलेंगे।" },
        { title: "टाइटेनियम कोर", desc: "एयरोस्पेस-ग्रेड टाइटेनियम फ्रेम बेजोड़ मजबूती देता है जबकि इसे बेहद हल्का रखता है।" }
      ]
    },
    models: {
      heading1: "अपना स्कूटर ",
      heading2: "चुनें।",
      sub: "हमारे प्रीमियम इलेक्ट्रिक स्कूटर्स की रेंज एक्सप्लोर करें।",
      items: [
        {
          name: "एक्टिव प्रो",
          desc: "दैनिक सफर और शहरी सवारी के लिए एक बहुमुखी स्कूटर।",
          specs: ["अधिकतम स्पीड: 80 किमी/घंटा", "रेंज: 150 किमी", "3 साल वारंटी", "स्पेयर पार्ट्स और सर्विस"],
          priceLabel: "शुरुआती कीमत",
          btn: "पूछताछ करें"
        },
        {
          name: "बीएमडब्ल्यू प्रो",
          desc: "विशिष्ट सवार के लिए उन्नत सुविधाओं के साथ प्रीमियम परफॉर्मेंस।",
          specs: ["अधिकतम स्पीड: 80 किमी/घंटा", "रेंज: 150 किमी", "3 साल वारंटी", "स्पेयर पार्ट्स और सर्विस"],
          priceLabel: "शुरुआती कीमत",
          btn: "पूछताछ करें"
        },
        {
          name: "क्राउन",
          desc: "एक शाही अनुभव के लिए सुरुचिपूर्ण डिज़ाइन और शक्तिशाली परफॉर्मेंस।",
          specs: ["अधिकतम स्पीड: 80 किमी/घंटा", "रेंज: 150 किमी", "3 साल वारंटी", "स्पेयर पार्ट्स और सर्विस"],
          priceLabel: "शुरुआती कीमत",
          btn: "पूछताछ करें"
        },
        {
          name: "ड्यूल प्रो",
          desc: "शहर और हाईवे एडवेंचर्स के लिए ड्यूल-परपज़ स्कूटर।",
          specs: ["अधिकतम स्पीड: 80 किमी/घंटा", "रेंज: 150 किमी", "3 साल वारंटी", "स्पेयर पार्ट्स और सर्विस"],
          priceLabel: "शुरुआती कीमत",
          btn: "पूछताछ करें"
        },
        {
          name: "स्पोर्ट्स वन",
          desc: "थ्रिल-सीकर के लिए एजाइल हैंडलिंग के साथ स्पोर्टी डिज़ाइन।",
          specs: ["अधिकतम स्पीड: 80 किमी/घंटा", "रेंज: 150 किमी", "3 साल वारंटी", "स्पेयर पार्ट्स और सर्विस"],
          priceLabel: "शुरुआती कीमत",
          btn: "पूछताछ करें"
        }
      ]
    },
    techSpecs: {
      items: [
        { category: "प्रोपल्शन", title: "हाइपरड्राइव™ मोटर", desc: "हमारे फ्लक्स-वेक्टर कंट्रोल सिस्टम की ताकत का अनुभव करें। 45kW की पीक पावर के साथ, यह आपको 3.2 सेकंड में 0 से 60mph तक ले जाता है।" },
        { category: "ऊर्जा आर्किटेक्चर", title: "ग्राफीन सॉलिड-स्टेट", desc: "हमारी क्रांतिकारी बैटरी तकनीक। 2000 साइकिलों पर शून्य गिरावट के साथ एक चार्ज पर 75 मील की रेंज।" },
        { category: "चेसिस डायनामिक्स", title: "एयरोस्पेस टाइटेनियम", desc: "ग्रेड 5 टाइटेनियम मिश्र धातु से बना, यूनिबॉडी फ्रेम आधे वजन पर स्टील की ताकत प्रदान करता है।" },
        { category: "न्यूरल कोर", title: "V-OS इंटेलिजेंस", desc: "वो स्कूटर जो आगे की सोचता है। V-OS प्रति सेकंड 500 मिलियन ऑपरेशन प्रोसेस करता है।" },
        { category: "फोटोनिक्स", title: "एडेप्टिव मैट्रिक्स LED", desc: "देखें और दिखें। हमारा हेडलाइट सिस्टम आने वाले ट्रैफिक के चारों ओर प्रकाश को मोड़ता है।" }
      ]
    },
    design: {
      bgText: "गति में डिज़ाइन",
      title: "विजुअल पहचान",
      sub: "हम मानते हैं कि परिवहन सुंदर होना चाहिए। वेलोसे के एस्थेटिक दर्शन को जानने के लिए स्क्रॉल करें।",
      cards: [
        { title: "शहरी प्रवाह", subtitle: "शहर की लय के लिए डिज़ाइन किया गया।" },
        { title: "सटीकता", subtitle: "हर कोण की गणना की गई है।" },
        { title: "रात्रिचर", subtitle: "एडेप्टिव लाइटिंग के साथ रात पर राज करें।" },
        { title: "स्वतंत्रता", subtitle: "बिना किसी सीमा के अन्वेषण करें।" }
      ]
    },
    gallery: {
      title1: "शोरूम",
      title2: "गैलरी",
      sub: "दुनिया भर के वेलोसे मालिकों की इंजीनियरिंग और जीवनशैली की एक झलक।"
    },
    proof: {
      title: "सर्वश्रेष्ठ द्वारा विश्वसनीय।",
      quote: "\"वेलोसे ने मेरे दैनिक सफर को पूरी तरह बदल दिया है। यह सिर्फ एक स्कूटर नहीं है; यह एक चलती-फिरती कला है।\"",
      role: "प्रोडक्ट डिज़ाइनर @ Vercel",
      stats: ["सक्रिय राइडर्स", "मीलों का सफर", "CO2 की बचत"]
    },
    cta: {
      title: "संपर्क करें।",
      desc: "भविष्य की मोबिलिटी का अनुभव करने के लिए हमारे शोरूम आएं, या विशेषज्ञ सहायता के लिए संपर्क करें।",
      showroom: "शोरूम",
      address: ["H.no-17, N.H.-58 सर्विस रोड,", "खिरवा चौक के पास, कंकर खेड़ा,", "मेरठ कैंट 250001"],
      directions: "दिशा - निर्देश प्राप्त करें",
      contact: "संपर्क करें",
      sales: "सेल्स और सपोर्ट",
      email: "ईमेल",
      hours: "सोम - शनि: 10:00 AM - 8:00 PM",
      footer: "© 2024 महादेव ऑटोमोटिव्स। सर्वाधिकार सुरक्षित।"
    }
  }
};

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: typeof translations.en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'hi' : 'en'));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};