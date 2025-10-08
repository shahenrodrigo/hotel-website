import { Helmet } from "react-helmet-async";
import { Utensils, Sparkles, Clock, Wine, Phone, Mail } from "lucide-react";
import Reveal from "../../components/Reveal";
import React, { useEffect, useState } from "react";
import ImageSlider from "../../components/ImageSlider";

const FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='1600' height='900'>
      <defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'>
        <stop stop-color='#e5e7eb' offset='0'/><stop stop-color='#cbd5e1' offset='1'/>
      </linearGradient></defs><rect width='100%' height='100%' fill='url(#g)'/>
      <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='system-ui,Arial' font-size='22' fill='#64748b'>Image unavailable</text>
    </svg>`
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

export default function Restaurant() {
  return (
    <>
      <Helmet>
        <title>Restaurant | Galaxy – Airport Residence</title>
        <meta
          name="description"
          content="Modern dining with seasonal Sri Lankan and international plates, curated wines, and warm service."
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Restaurant",
            name: "Galaxy Restaurant",
            servesCuisine: ["Sri Lankan", "International"],
            telephone: "+94 00 000 0000",
            address: { "@type": "PostalAddress", addressCountry: "LK" },
            url: "https://your-domain.lk/other/restaurant",
          })}
        </script>
      </Helmet>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <SafeImg
            src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&auto=format&fit=crop&w=2400"
            alt="Table setting at Galaxy Restaurant"
            className="h-[52vh] w-full object-cover sm:h-[64vh]"
          />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_40%,rgba(2,132,199,.20),transparent)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/45 via-transparent to-white dark:from-slate-950/50 dark:via-slate-950/15 dark:to-slate-950" />

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-14 sm:py-16">
          <Reveal>
            <div className="mx-auto max-w-4xl rounded-3xl bg-white/55 dark:bg-black/35 backdrop-blur-md ring-1 ring-black/10 dark:ring-white/10 p-6 sm:p-8 text-center">
              <span className="inline-flex items-center justify-center rounded-full bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 ring-1 ring-cyan-500/25 px-3 py-1 text-xs font-semibold">
                Modern dining
              </span>
              <h1 className="mt-3 text-4xl sm:text-6xl font-extrabold tracking-tight">
                Galaxy Restaurant
              </h1>
              <p className="mx-auto mt-3 max-w-3xl text-slate-700 dark:text-white/85">
                Seasonal Sri Lankan & international plates with curated wines.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="py-14">
        <div className="mx-auto max-w-7xl px-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              Icon: Utensils,
              t: "Seasonal Menu",
              d: "Local produce • Classic & contemporary techniques",
            },
            { Icon: Wine, t: "Curated Wine", d: "Old & new world pairings" },
            {
              Icon: Sparkles,
              t: "Ambient Setting",
              d: "Warm lighting • Intimate booths • Private dining",
            },
            {
              Icon: Clock,
              t: "All-Day Dining",
              d: "Breakfast 7–10 • Lunch 12–3 • Dinner 6–10",
            },
          ].map(({ Icon, t, d }) => (
            <Reveal key={t}>
              <div className="rounded-2xl border border-slate-900/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur p-5 hover:shadow-lg transition-shadow">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 ring-1 ring-cyan-500/25">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-3 font-semibold">{t}</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-white/70">
                  {d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SIGNATURE PLATES */}
      <section className="py-6">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mb-6">
            <h2 className="text-2xl font-extrabold">Signature Plates</h2>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                img: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&auto=format&fit=crop&w=1600",
                name: "Ceylon Spiced Tuna",
                sub: "Green mango • Coconut • Lime",
              },
              {
                img: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?q=80&auto=format&fit=crop&w=1600",
                name: "Coconut Crab Linguine",
                sub: "Chili • Garlic • Lemongrass",
              },
              {
                img: "https://images.unsplash.com/photo-1533777324565-a040eb52fac1?q=80&auto=format&fit=crop&w=1600",
                name: "Tamarind Beef Short Rib",
                sub: "Smoked eggplant • Cashews",
              },
            ].map((d) => (
              <Reveal key={d.name}>
                <div className="group rounded-2xl overflow-hidden border border-slate-900/10 dark:border-white/10 bg-white/70 dark:bg-white/5 hover:shadow-xl transition-all">
                  <SafeImg
                    src={d.img}
                    alt={d.name}
                    className="aspect-[16/10] w-full object-cover"
                  />
                  <div className="p-4">
                    <div className="font-semibold tracking-tight">{d.name}</div>
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

      {/* GALLERY */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6">
          <ImageSlider
            ariaLabel="Restaurant gallery"
            images={[
              "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&auto=format&fit=crop&w=2400",
              "https://images.unsplash.com/photo-1533777324565-a040eb52fac1?q=80&auto=format&fit=crop&w=2400",
              "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&auto=format&fit=crop&w=2400",
              "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&auto=format&fit=crop&w=2400",
              "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?q=80&auto=format&fit=crop&w=2400",
              "https://images.unsplash.com/photo-1541542684-4a1b3d2b4f83?q=80&auto=format&fit=crop&w=2400",
            ]}
            aspectClassName="aspect-[16/10] sm:aspect-[16/9]"
            autoPlay={4500}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h3 className="text-2xl font-extrabold">Book a Table</h3>
          <p className="mt-2 text-slate-700 dark:text-white/80">
            Reserve your table for dinner or a special celebration.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="tel:+94000000000"
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 font-semibold text-white hover:bg-cyan-500 shadow-lg shadow-cyan-600/25"
            >
              <Phone className="h-5 w-5" />
              Call to Reserve
            </a>
            <a
              href="mailto:hello@galaxyresidence.lk"
              className="inline-flex items-center gap-2 rounded-xl ring-1 ring-slate-900/10 dark:ring-white/15 px-5 py-3 hover:bg-slate-900/5 dark:hover:bg-white/10"
            >
              <Mail className="h-5 w-5" />
              Email Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
