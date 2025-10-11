// src/pages/Home.tsx
import { Helmet } from "react-helmet-async";
import Reveal from "../components/Reveal";
import GalleryGrid from "../widgets/GalleryGrid";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Utensils,
  Gem,
  Coffee,
  Bed as BedIcon,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/** ---------- Safe image with fallback (+onReady) ---------- **/
const FALLBACK_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='675'>
      <defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'>
        <stop stop-color='#e5e7eb' offset='0'/><stop stop-color='#cbd5e1' offset='1'/>
      </linearGradient></defs>
      <rect width='100%' height='100%' fill='url(#g)'/>
      <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
            font-family='system-ui,Segoe UI,Arial' font-size='28' fill='#475569'>
        Image unavailable
      </text>
    </svg>`
  );

type SafeImgProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  fallbackSrc?: string;
  onReady?: () => void;
};

function SafeImg({
  src,
  fallbackSrc = FALLBACK_SVG,
  onReady,
  onError,
  onLoad,
  ...rest
}: SafeImgProps) {
  const [current, setCurrent] = useState(src);
  useEffect(() => setCurrent(src), [src]);

  return (
    <img
      {...rest}
      src={current}
      onLoad={(e) => {
        onLoad?.(e);
        onReady?.();
      }}
      onError={(e) => {
        setCurrent(fallbackSrc);
        onError?.(e);
        onReady?.();
      }}
      referrerPolicy="no-referrer"
      decoding="async"
      draggable={false}
    />
  );
}

/** ---------- Content data ---------- **/
const slides = [
  {
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&auto=format&fit=crop&w=2000",
    title: "Arrive to Quiet Luxury.",
    sub: "A serene airport-side escape designed for effortless stays.",
  },
  {
    img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&auto=format&fit=crop&w=2000",
    title: "Modern, Spacious, Yours.",
    sub: "Settle into calming rooms crafted for real rest.",
  },
  {
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&auto=format&fit=crop&w=2000",
    title: "Experience Delicacies, Reimagined.",
    sub: "One of Sri Lanka’s finest dining experiences.",
  },
  {
    img: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&auto=format&fit=crop&w=2000",
    title: "Café & Lounge, All Day.",
    sub: "Slow mornings, quick catch-ups, and easy evenings.",
  },
];

const services = [
  {
    title: "Restaurant",
    desc: "Modern Sri Lankan and international dishes for breakfast, lunch, and dinner.",
    img: "https://images.unsplash.com/photo-1555993539-1732b0258235?q=80&auto=format&fit=crop&w=1800",
    Icon: Utensils,
  },
  {
    title: "Weddings & Functions",
    desc: "Elegant venues and tailored packages for your big day and special events.",
    img: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&auto=format&fit=crop&w=1800",
    Icon: Gem,
  },
  {
    title: "Café",
    desc: "Coffee, quick bites, and relaxed lounge vibes — all day.",
    img: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&auto=format&fit=crop&w=1800",
    Icon: Coffee,
  },
  {
    title: "Rooms",
    desc: "Comfortable, air-conditioned rooms with thoughtful amenities.",
    img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&auto=format&fit=crop&w=1800",
    Icon: BedIcon,
  },
];

/** ---- Contact details ---- */
const CONTACT = {
  mapsShareUrl: "https://maps.app.goo.gl/mLQeQo2E74R4C3iRA?g_st=ipc",
  email: "thegalaxyairporthotel@gmail.com",
  phonePretty: "076 880 3740",
  phoneE164: "+94768803740",
};

/**
 * EMBED URL
 * Use a clean query-based embed to avoid the “Some custom on-map content could not be displayed” banner.
 * Tip: replace MAP_QUERY with your precise address or venue name for a perfect pin.
 */
const MAP_QUERY = "The Galaxy Airport Hotel, Negombo, Sri Lanka";
const MAPS_EMBED_URL = `https://www.google.com/maps?output=embed&q=${encodeURIComponent(
  MAP_QUERY
)}&z=16&hl=en&mapclient=embed`;

/** ---------- Tiny typewriter ---------- **/
function useTypewriter(text: string, speedMs = 45, key = 0) {
  const [out, setOut] = useState("");
  useEffect(() => {
    let i = 0;
    let t: number | undefined;
    const tick = () => {
      setOut(text.slice(0, i));
      i++;
      if (i <= text.length) t = window.setTimeout(tick, speedMs);
    };
    tick();
    return () => {
      if (t !== undefined) {
        clearTimeout(t);
        t = undefined;
      }
    };
  }, [text, speedMs, key]);
  return out;
}

function TypingSubtitle({
  text,
  index,
  reduce,
  className,
  visible = true,
}: {
  text: string;
  index: number;
  reduce: boolean;
  className?: string;
  visible?: boolean;
}) {
  if (!visible) return <p className={className}>&nbsp;</p>;
  if (reduce) return <p className={className}>{text}</p>;
  const typed = useTypewriter(text, 45, index);
  return (
    <>
      <style>{`@keyframes blink{0%,50%{opacity:1}50.01%,100%{opacity:0}} .cursor:after{content:"|";margin-left:.25rem;animation:blink 1s steps(2,start) infinite}`}</style>
      <p className={className}>
        {typed}
        <span className="cursor" />
      </p>
    </>
  );
}

/** ---------- Animation controls ---------- **/
const HERO_FADE_MS = 1200;

export default function Home() {
  /** HERO */
  const [heroIndex, setHeroIndex] = useState(0);
  const [capVisible, setCapVisible] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState<Record<number, boolean>>({});
  const markHeroLoaded = (i: number) =>
    setHeroLoaded((m) => (m[i] ? m : { ...m, [i]: true }));

  const heroTimerRef = useRef<number | undefined>(undefined);
  const HERO_INTERVAL = 4000;
  const reduceMotion = !!useReducedMotion();
  const fadeMs = reduceMotion ? 0 : HERO_FADE_MS;

  const scheduleHeroNext = () => {
    if (heroTimerRef.current !== undefined) {
      clearTimeout(heroTimerRef.current);
      heroTimerRef.current = undefined;
    }
    heroTimerRef.current = window.setTimeout(() => {
      setCapVisible(false);
      setTimeout(() => setHeroIndex((i) => (i + 1) % slides.length), 100);
    }, HERO_INTERVAL);
  };

  useEffect(() => {
    if (reduceMotion) return;
    scheduleHeroNext();
    return () => {
      if (heroTimerRef.current !== undefined) {
        clearTimeout(heroTimerRef.current);
        heroTimerRef.current = undefined;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [heroIndex, reduceMotion]);

  useEffect(() => {
    if (!heroLoaded[heroIndex]) return;
    const t = window.setTimeout(
      () => setCapVisible(true),
      reduceMotion ? 0 : 250
    );
    return () => clearTimeout(t);
  }, [heroIndex, heroLoaded, reduceMotion]);

  useEffect(() => {
    const onVis = () => {
      if (document.visibilityState === "visible" && !reduceMotion) {
        scheduleHeroNext();
        scheduleServiceNext();
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [reduceMotion]);

  const cap = slides[heroIndex];

  const goToSlide = (i: number) => {
    setCapVisible(false);
    setHeroIndex(i);
    if (!reduceMotion) scheduleHeroNext();
  };

  /** SERVICES */
  const [activeService, setActiveService] = useState(0);
  const serviceTimerRef = useRef<number | undefined>(undefined);
  const SERVICE_INTERVAL = 5000;

  const scheduleServiceNext = (delay = SERVICE_INTERVAL) => {
    if (serviceTimerRef.current !== undefined) {
      clearTimeout(serviceTimerRef.current);
      serviceTimerRef.current = undefined;
    }
    serviceTimerRef.current = window.setTimeout(
      () => setActiveService((i) => (i + 1) % services.length),
      delay
    );
  };
  useEffect(() => {
    if (reduceMotion) return;
    scheduleServiceNext();
    return () => {
      if (serviceTimerRef.current !== undefined) {
        clearTimeout(serviceTimerRef.current);
        serviceTimerRef.current = undefined;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeService, reduceMotion]);

  const handleSelectService = (i: number) => {
    setActiveService(i);
    if (!reduceMotion) scheduleServiceNext();
  };

  /** Height sync: make left image exactly match right column on lg+ */
  const leftWrapRef = useRef<HTMLDivElement | null>(null);
  const rightColRef = useRef<HTMLDivElement | null>(null);
  const [syncedH, setSyncedH] = useState<number | null>(null);

  useEffect(() => {
    if (!rightColRef.current) return;

    const mq = window.matchMedia("(min-width: 1024px)");
    const calc = () => {
      if (!rightColRef.current) return;
      if (mq.matches) {
        const rect = rightColRef.current.getBoundingClientRect();
        setSyncedH(Math.round(rect.height));
      } else {
        setSyncedH(null);
      }
    };

    const ro = new ResizeObserver(calc);
    ro.observe(rightColRef.current);
    window.addEventListener("resize", calc);
    calc();

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", calc);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Galaxy – Airport Residence | Official Site</title>
        <meta
          name="description"
          content="Galaxy – Airport Residence. A modern, airport-side stay with stylish rooms, cozy dining, and a calm lounge."
        />
        <link
          rel="preconnect"
          href="https://images.unsplash.com"
          crossOrigin=""
        />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Hotel",
            name: "Galaxy – Airport Residence",
            url: "https://your-domain.lk/",
            address: { "@type": "PostalAddress", addressCountry: "LK" },
            telephone: CONTACT.phoneE164,
            email: CONTACT.email,
            sameAs: [CONTACT.mapsShareUrl],
          })}
        </script>
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Galaxy – Airport Residence" />
        <meta
          property="og:description"
          content="A modern, airport-side stay with stylish rooms, cozy dining, and a calm lounge."
        />
        <meta
          property="og:image"
          content="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop"
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* HERO */}
      <section
        id="home"
        className="
    relative min-h-[86vh]
    pt-[calc(var(--nav-h)+1px)]
    md:pt-0
    overflow-hidden
  "
      >
        <div className="absolute inset-0">
          {slides.map((s, idx) => (
            <SafeImg
              key={s.img}
              src={s.img}
              alt={s.title}
              onReady={() => markHeroLoaded(idx)}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity ease-in-out ${
                idx === heroIndex
                  ? "opacity-100 z-10"
                  : "opacity-0 z-0 pointer-events-none"
              }`}
              style={{ transitionDuration: `${fadeMs}ms` }}
              loading={idx === 0 ? "eager" : "lazy"}
              {...(idx === 0 ? ({ fetchPriority: "high" } as any) : {})}
              sizes="100vw"
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent" />

        <div className="absolute inset-x-0 top-56 sm:top-56 md:top-56 z-30 px-4">
          <div className="mx-auto max-w-5xl text-center" aria-live="polite">
            <h1
              className={[
                "text-4xl sm:text-6xl font-extrabold leading-tight tracking-tight text-white drop-shadow-md",
                "transition-all duration-500 ease-out [will-change:transform,opacity]",
                capVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-3",
              ].join(" ")}
              style={
                reduceMotion
                  ? { transitionDuration: "0ms", transform: "none" }
                  : undefined
              }
            >
              {cap.title}
            </h1>

            <TypingSubtitle
              text={cap.sub}
              index={heroIndex}
              reduce={reduceMotion}
              visible={capVisible}
              className="mt-4 mx-auto max-w-3xl text-white/90 drop-shadow-sm transition-opacity duration-300"
            />
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-32 sm:bottom-32 z-30 px-6">
          <div className="mx-auto flex max-w-5xl items-center justify-center gap-3">
            <Link
              to="/about"
              className={[
                "inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold text-white shadow-md ring-1 ring-black/5",
                "bg-gradient-to-b from-cyan-500 to-cyan-700 hover:brightness-105 hover:-translate-y-px active:translate-y-0 transition-all duration-200",
                capVisible ? "opacity-100" : "opacity-0 pointer-events-none",
              ].join(" ")}
            >
              About Us
            </Link>

            <a
              href="#gallery"
              className={[
                "inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold",
                "bg-white/85 text-slate-900 ring-1 ring-white/30 hover:bg-white",
                "dark:bg-white/10 dark:text-white dark:ring-white/15 dark:hover:bg-white/20",
                "transition-opacity duration-300",
                capVisible ? "opacity-100" : "opacity-0 pointer-events-none",
              ].join(" ")}
            >
              View Gallery
            </a>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-5 z-40 flex justify-center">
          <div className="flex items-center gap-3">
            {slides.map((_, i) => {
              const active = i === heroIndex;
              return (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => goToSlide(i)}
                  className="relative h-5 w-5 flex items-center justify-center"
                >
                  {active && (
                    <span className="absolute inset-0 rounded-full border-2 border-white/90 shadow-[0_0_0_2px_rgba(0,0,0,.15)]" />
                  )}
                  <span
                    aria-current={active ? "true" : undefined}
                    className={[
                      "rounded-full transition-all",
                      active
                        ? "h-2 w-2 bg-white"
                        : "h-2.5 w-2.5 bg-white/55 hover:bg-white/80",
                    ].join(" ")}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <Reveal>
              <div className="mb-8">
                {/* HEADLINE: richer gold on light, softer/airier gold on dark */}
                <h2
                  className="text-3xl sm:text-4xl font-extrabold tracking-tight
                 text-black dark:text-white"
                >
                  Welcome to The Galaxy Airport Hotel
                </h2>
              </div>

              <p className="mt-4 text-slate-800 dark:text-white/85">
                Just 15 minutes from Bandaranaike International Airport (CMB),
                The Galaxy Airport Hotel is your calm, convenient base for late
                arrivals, early flights, and quick getaways. Settle into
                super-comfortable, air-conditioned rooms—then unwind at our cozy
                café or dine on the finest seafood delights in town.
              </p>

              {/* HIGHLIGHT PILLS: light solid gold; dark translucent gold */}
              <div className="mt-5 flex flex-wrap gap-2">
                <span
                  className="inline-flex items-center gap-2 rounded-full
                           bg-amber-50 text-amber-800 ring-1 ring-amber-200
                           hover:bg-amber-100/60
                           dark:bg-amber-500/10 dark:text-amber-200 dark:ring-amber-300/25
                           dark:hover:bg-amber-400/10 px-3 py-1 text-sm"
                >
                  <MapPin className="h-4 w-4" />
                  15 minutes from CMB Airport
                </span>
                <span
                  className="inline-flex items-center gap-2 rounded-full
                           bg-amber-50 text-amber-800 ring-1 ring-amber-200
                           hover:bg-amber-100/60
                           dark:bg-amber-500/10 dark:text-amber-200 dark:ring-amber-300/25
                           dark:hover:bg-amber-400/10 px-3 py-1 text-sm"
                >
                  <Utensils className="h-4 w-4" />
                  Finest seafood in town
                </span>
                <span
                  className="inline-flex items-center gap-2 rounded-full
                           bg-amber-50 text-amber-800 ring-1 ring-amber-200
                           hover:bg-amber-100/60
                           dark:bg-amber-500/10 dark:text-amber-200 dark:ring-amber-300/25
                           dark:hover:bg-amber-400/10 px-3 py-1 text-sm"
                >
                  <BedIcon className="h-4 w-4" />
                  Super-comfortable rooms
                </span>
              </div>

              {/* AMENITIES BULLETS: slightly deeper gold on light; lighter on dark */}
              <ul className="mt-6 space-y-2 text-slate-800 dark:text-white/85 text-sm">
                <li className="flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-600 dark:bg-amber-400" />
                  Flexible check-in on request
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-600 dark:bg-amber-400" />
                  Complimentary high-speed Wi-Fi across the property
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-600 dark:bg-amber-400" />
                  Cozy lounge &amp; café
                </li>
              </ul>
            </Reveal>

            {/* IMAGES: gold hover ring tuned for both themes */}
            <Reveal className="grid grid-cols-2 gap-3">
              {[
                "https://images.unsplash.com/photo-1551776235-dde6d4829808?q=80&auto=format&fit=crop&w=1200",
                "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?q=80&auto=format&fit=crop&w=1200",
                "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&auto=format&fit=crop&w=1200",
                "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&auto=format&fit=crop&w=1200",
              ].map((src, i) => (
                <SafeImg
                  key={src}
                  className="
              rounded-2xl object-cover aspect-[4/3]
              ring-1 ring-slate-900/10 dark:ring-white/10
              transition-transform duration-500 hover:scale-[1.02]
              hover:ring-amber-400/80 dark:hover:ring-amber-300/70
            "
                  src={src}
                  alt={["Reception", "Room", "Breakfast", "Pool"][i]}
                  loading="lazy"
                />
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* SERVICES — mobile fits one screen; lg+ unchanged */}
      <section id="services" className="py-0 lg:py-12">
        <div
          className="
      mx-auto max-w-7xl px-6
      min-h-[calc(100svh-var(--nav-h))] lg:min-h-0  /* MOBILE: fill one screen */
      grid grid-rows-[auto_1fr]                     /* title + content */
    "
        >
          {/* Title */}
          <Reveal className="mb-3 lg:mb-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              OUR AWESOME SERVICES
            </h2>
            <p className="mt-1 text-sm sm:text-base text-slate-700 dark:text-white/70">
              Check out our awesome services
            </p>
          </Reveal>

          {/* Content */}
          <div
            className="
        row-start-2 min-h-0
        flex flex-col gap-4
        lg:grid lg:items-stretch lg:gap-6
        lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]
        lg:max-h-[calc(100svh-12rem)] lg:overflow-visible
      "
          >
            {/* LEFT (image) */}
            <Reveal className="lg:contents">
              <div
                ref={leftWrapRef}
                style={syncedH ? { height: syncedH } : undefined}
                className="
            relative overflow-hidden rounded-3xl ring-1 ring-slate-900/10 dark:ring-white/10
            h-[42svh] min-h-[240px]   /* MOBILE slice so whole section fits */
            lg:h-auto lg:min-h-0
          "
              >
                <div className="absolute inset-0">
                  {services.map((s, idx) => (
                    <SafeImg
                      key={s.img}
                      src={s.img}
                      alt={s.title}
                      className={`absolute inset-0 h-full w-full object-cover transition-opacity ease-out ${
                        idx === activeService
                          ? "opacity-100 z-10"
                          : "opacity-0 z-0 pointer-events-none"
                      }`}
                      style={{ transitionDuration: "700ms" }}
                      loading="lazy"
                      sizes="(min-width:1024px) 60vw, 100vw"
                    />
                  ))}
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
              </div>
            </Reveal>

            {/* RIGHT (cards) */}
            <div
              ref={rightColRef}
              className="flex-1 min-h-0 flex flex-col gap-3 lg:min-h-0 lg:px-1"
            >
              {services.map(({ title, desc, Icon }, i) => {
                const active = i === activeService;
                return (
                  <Reveal key={title}>
                    <button
                      type="button"
                      onClick={() => handleSelectService(i)}
                      aria-pressed={active}
                      className={[
                        "group w-full text-left rounded-2xl ring-1 ring-inset transition-all",
                        "px-3 py-3 lg:px-5 lg:py-5", // MOBILE tighter; lg original spacing
                        active
                          ? "bg-cyan-600 text-white ring-cyan-700 shadow-lg shadow-cyan-600/25"
                          : "bg-white dark:bg-white/5 ring-slate-200/80 dark:ring-white/15 hover:bg-slate-50 dark:hover:bg-white/10",
                      ].join(" ")}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={[
                            "mt-0.5 inline-flex h-8 w-8 lg:h-9 lg:w-9 shrink-0 items-center justify-center rounded-xl ring-1 ring-inset",
                            active
                              ? "bg-white/15 ring-white/25"
                              : "bg-amber-50 text-amber-600 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-300/25",
                          ].join(" ")}
                        >
                          <Icon className="h-4 w-4 lg:h-5 lg:w-5" />
                        </span>
                        <div>
                          <h3
                            className={[
                              "text-sm lg:text-lg font-semibold",
                              active
                                ? "text-white"
                                : "text-slate-900 dark:text-white",
                            ].join(" ")}
                          >
                            {title}
                          </h3>
                          <p
                            className={[
                              "mt-1 text-xs lg:text-sm leading-relaxed",
                              active
                                ? "text-white/90"
                                : "text-slate-600 dark:text-white/70",
                            ].join(" ")}
                          >
                            {desc}
                          </p>
                        </div>
                      </div>
                    </button>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mb-6 text-center">
            <h2 className="text-3xl font-extrabold sm:text-4xl">Gallery</h2>
            <p className="mt-2 text-slate-700 dark:text-white/70">
              Click any photo to open the gallery.
            </p>
          </Reveal>
          <GalleryGrid />
        </div>
      </section>

      {/* LOCATION & CONTACT */}
      <section id="location" className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mb-8 text-center">
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Location & Contact
            </h2>
            <p className="mt-2 text-slate-700 dark:text-white/70">
              Find us on the map and get in touch.
            </p>
          </Reveal>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Map */}
            <Reveal>
              <div className="overflow-hidden rounded-3xl ring-1 ring-slate-900/10 dark:ring-white/10 shadow">
                <iframe
                  title="Galaxy – Airport Residence location"
                  className="h-[380px] w-full"
                  loading="lazy"
                  src={MAPS_EMBED_URL}
                />
              </div>
            </Reveal>

            {/* Contact */}
            <Reveal>
              <h3 className="text-xl font-bold">Address</h3>
              <p className="mt-2 text-slate-700 dark:text-white/80">
                No. 433/3, Kimbulapitiya Wattha Kadirana South, Negombo, Sri
                Lanka
              </p>
              <div className="mt-6 grid gap-3 text-sm text-slate-700 dark:text-white/80">
                <a
                  className="inline-flex items-center gap-2 rounded-xl px-4 py-3 ring-1 ring-slate-900/10 bg-slate-900/5 hover:bg-slate-900/10 dark:bg-white/10 dark:ring-white/15 dark:hover:bg-white/20"
                  href={CONTACT.mapsShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPin className="h-5 w-5" /> Get Directions
                </a>
                <a
                  className="inline-flex items-center gap-2 rounded-xl px-4 py-3 ring-1 ring-slate-900/10 bg-slate-900/5 hover:bg-slate-900/10 dark:bg-white/10 dark:ring-white/15 dark:hover:bg-white/20"
                  href={`tel:${CONTACT.phoneE164}`}
                >
                  <Phone className="h-5 w-5" /> {CONTACT.phonePretty}
                </a>
                <a
                  className="inline-flex items-center gap-2 rounded-xl px-4 py-3 ring-1 ring-slate-900/10 bg-slate-900/5 hover:bg-slate-900/10 dark:bg-white/10 dark:ring-white/15 dark:hover:bg-white/20"
                  href={`mailto:${CONTACT.email}`}
                >
                  <Mail className="h-5 w-5" /> {CONTACT.email}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
