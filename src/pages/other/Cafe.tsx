import { Helmet } from "react-helmet-async";
import { Coffee, Wifi, Clock, CupSoda } from "lucide-react";
import Reveal from "../../components/Reveal";
import React, { useEffect, useState } from "react";
import ImageSlider from "../../components/ImageSlider";

const FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='1600' height='900'><rect width='100%' height='100%' fill='#e5e7eb'/></svg>`
  );

function SafeImg(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const { src, ...rest } = props;
  const [current, setCurrent] = useState(src);
  useEffect(() => setCurrent(src), [src]);
  return (
    <img
      {...rest}
      src={current}
      onError={() => setCurrent(FALLBACK)}
      decoding="async"
      referrerPolicy="no-referrer"
      draggable={false}
    />
  );
}

/** Shared hero heights (easy to tweak later) */
const HERO_H = "h-[62vh] sm:h-[74vh] lg:h-[86vh] max-h-[92vh]";

export default function Cafe() {
  const [heroReady, setHeroReady] = useState(false);
  const [capVisible, setCapVisible] = useState(false);

  // Reveal captions shortly after the image has loaded.
  useEffect(() => {
    if (!heroReady) return;
    const t = window.setTimeout(() => setCapVisible(true), 200);
    return () => clearTimeout(t);
  }, [heroReady]);

  return (
    <>
      <Helmet>
        <title>Café & Lounge | Galaxy – Airport Residence</title>
        <meta
          name="description"
          content="All-day café with specialty coffee, fresh bakes and a relaxing lounge vibe."
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CafeOrCoffeeShop",
            name: "Galaxy Café & Lounge",
            servesCuisine: ["Coffee", "Bakery", "Light meals"],
            telephone: "+94 00 000 0000",
            address: { "@type": "PostalAddress", addressCountry: "LK" },
            url: "https://your-domain.lk/other/cafe",
          })}
        </script>
      </Helmet>

      {/* HERO — tall, with fade-in image + delayed captions */}
      <section className={`relative overflow-hidden ${HERO_H}`}>
        <SafeImg
          src="https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&auto=format&fit=crop&w=2000"
          alt="Café & Lounge"
          onLoad={() => setHeroReady(true)}
          className={[
            "absolute inset-0 h-full w-full object-cover",
            "opacity-0 scale-[1.04] transition-all duration-700 ease-out",
            heroReady ? "opacity-100 scale-100" : "",
          ].join(" ")}
        />
        {/* Subtle readability gradient, dark & light aware */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-white dark:from-slate-900/35 dark:to-slate-950" />

        {/* Captions (top-aligned a bit for a premium feel) */}
        <div className="relative z-10 mx-auto max-w-5xl px-6 pt-10 sm:pt-14 md:pt-16 text-center">
          <h1
            className={[
              "text-4xl sm:text-6xl font-extrabold tracking-tight",
              "transition-all duration-500 ease-out",
              capVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2",
            ].join(" ")}
          >
            Café & Lounge
          </h1>
          <p
            className={[
              "mx-auto mt-3 max-w-3xl text-slate-800/90 dark:text-white/90",
              "transition-opacity duration-400",
              capVisible ? "opacity-100" : "opacity-0",
            ].join(" ")}
          >
            Specialty coffee, fresh bakes and cozy corners—morning to late.
          </p>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-14">
        <div className="mx-auto max-w-7xl px-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              Icon: Coffee,
              t: "Specialty Coffee",
              d: "Single-origin espresso & pour-over",
            },
            {
              Icon: CupSoda,
              t: "Light Bites",
              d: "Sandwiches, salads, sweet bakes",
            },
            {
              Icon: Wifi,
              t: "Work-Friendly",
              d: "Fast Wi-Fi, charging points, comfy seating",
            },
            { Icon: Clock, t: "Open Late", d: "7am – 10pm daily" },
          ].map(({ Icon, t, d }) => (
            <Reveal key={t}>
              <div className="rounded-2xl ring-1 ring-slate-900/10 dark:ring-white/10 p-5 bg-white/80 dark:bg-white/5">
                <Icon className="h-6 w-6" />
                <h3 className="mt-3 font-semibold">{t}</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-white/70">
                  {d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Favourites */}
      <section className="py-6">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mb-6">
            <h2 className="text-2xl font-extrabold">Guest Favourites</h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                img: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?q=80&auto=format&fit=crop&w=1600",
                name: "Flat White",
                sub: "Velvety microfoam, double shot",
              },
              {
                img: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&auto=format&fit=crop&w=1600",
                name: "Avocado Toast",
                sub: "Sourdough, chili flakes, feta",
              },
              {
                img: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&auto=format&fit=crop&w=1600",
                name: "Chicken Panini",
                sub: "Pesto, mozzarella, tomato",
              },
            ].map((d) => (
              <Reveal key={d.name}>
                <div className="rounded-2xl overflow-hidden ring-1 ring-slate-900/10 dark:ring-white/10 bg-white/80 dark:bg-white/5">
                  <SafeImg
                    src={d.img}
                    alt={d.name}
                    className="aspect-[16/10] w-full object-cover"
                  />
                  <div className="p-4">
                    <div className="font-semibold">{d.name}</div>
                    <div className="text-sm text-slate-600 dark:text-white/70">
                      {d.sub}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6">
          <ImageSlider
            ariaLabel="Café gallery"
            images={[
              "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&auto=format&fit=crop&w=2000",
              "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&auto=format&fit=crop&w=2000",
              "https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&auto=format&fit=crop&w=2000",
              "https://images.unsplash.com/photo-1481391319762-47dff72954d9?q=80&auto=format&fit=crop&w=2000",
              "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&auto=format&fit=crop&w=2000",
            ]}
            aspectClassName="aspect-[16/10] sm:aspect-[16/9]"
            autoPlay={4500}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h3 className="text-2xl font-extrabold">Drop By or Reach Out</h3>
          <p className="mt-2 text-slate-700 dark:text-white/80">
            Perfect for quick meetups, casual work sessions and lazy evenings.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="tel:+94000000000"
              className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-white hover:bg-cyan-400"
            >
              Call the Café
            </a>
            <a
              href="mailto:cafe@galaxyresidence.lk"
              className="rounded-xl ring-1 ring-slate-900/10 dark:ring-white/15 px-5 py-3 hover:bg-slate-900/5 dark:hover:bg-white/10"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
