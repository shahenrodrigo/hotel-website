import { Helmet } from "react-helmet-async";
import { Gem, Users, CalendarRange, Sparkles, Phone, Mail } from "lucide-react";
import Reveal from "../../components/Reveal";
import React, { useEffect, useState } from "react";
import ImageSlider from "../../components/ImageSlider";

const FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='1600' height='900'>
      <rect width='100%' height='100%' fill='#e5e7eb'/>
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

export default function Functions() {
  return (
    <>
      <Helmet>
        <title>Functions & Events | Galaxy – Airport Residence</title>
        <meta
          name="description"
          content="Elegant venues for weddings, corporate events and celebrations—tailored packages, décor and catering."
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EventVenue",
            name: "Galaxy Functions",
            telephone: "+94 00 000 0000",
            address: { "@type": "PostalAddress", addressCountry: "LK" },
            url: "https://your-domain.lk/other/functions",
          })}
        </script>
      </Helmet>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <SafeImg
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&auto=format&fit=crop&w=2400"
            alt="Elegant function setup"
            className="h-[52vh] w-full object-cover sm:h-[64vh]"
          />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_40%,rgba(2,6,23,.25),transparent)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/45 via-transparent to-white dark:from-slate-950/50 dark:via-slate-950/15 dark:to-slate-950" />

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-14 sm:py-16">
          <Reveal>
            <div className="mx-auto max-w-4xl rounded-3xl bg-white/55 dark:bg-black/35 backdrop-blur-md ring-1 ring-black/10 dark:ring-white/10 p-6 sm:p-8 text-center">
              <span className="inline-flex items-center justify-center rounded-full bg-fuchsia-500/15 text-fuchsia-700 dark:text-fuchsia-300 ring-1 ring-fuchsia-500/25 px-3 py-1 text-xs font-semibold">
                Weddings • Corporate • Social
              </span>
              <h1 className="mt-3 text-4xl sm:text-6xl font-extrabold tracking-tight">
                Functions & Events
              </h1>
              <p className="mx-auto mt-3 max-w-3xl text-slate-700 dark:text-white/85">
                Spaces for weddings, corporate events and intimate celebrations.
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
              Icon: Users,
              t: "Capacity",
              d: "Banquet 180 • Theatre 220 • Classroom 120",
            },
            {
              Icon: CalendarRange,
              t: "Flexible Packages",
              d: "Half/Full day • Cocktail • Buffet/Plated",
            },
            {
              Icon: Gem,
              t: "Décor & Styling",
              d: "Florals, lighting, stages, backdrops",
            },
            {
              Icon: Sparkles,
              t: "AV & Support",
              d: "LED wall, sound, mics, livestream-ready",
            },
          ].map(({ Icon, t, d }) => (
            <Reveal key={t}>
              <div className="rounded-2xl border border-slate-900/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur p-5 hover:shadow-lg transition-shadow">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-fuchsia-500/15 text-fuchsia-600 dark:text-fuchsia-300 ring-1 ring-fuchsia-500/25">
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

      {/* PACKAGES */}
      <section className="py-6">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mb-6">
            <h2 className="text-2xl font-extrabold">Popular Packages</h2>
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                name: "Elegance",
                note: "Best value",
                price: "Rs. 7,900++ / person",
                items: [
                  "Welcome drink",
                  "Starters + Mains + Dessert",
                  "Basic décor & PA system",
                ],
              },
              {
                name: "Signature",
                note: "Most popular",
                price: "Rs. 9,900++ / person",
                items: [
                  "Canapés",
                  "Premium mains",
                  "Stage décor, LED backdrop",
                ],
              },
              {
                name: "Royal",
                note: "Premium",
                price: "Rs. 12,900++ / person",
                items: [
                  "Live stations",
                  "Plated service",
                  "Full décor + Photo booth",
                ],
              },
            ].map((p) => (
              <Reveal key={p.name}>
                <div className="rounded-2xl border border-slate-900/10 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="text-lg font-bold">{p.name}</div>
                    <span className="text-xs rounded-full bg-fuchsia-500/15 text-fuchsia-700 dark:text-fuchsia-300 ring-1 ring-fuchsia-500/25 px-2 py-1">
                      {p.note}
                    </span>
                  </div>
                  <div className="mt-1 text-slate-600 dark:text-white/70">
                    {p.price}
                  </div>
                  <ul className="mt-3 space-y-1 text-sm">
                    {p.items.map((i) => (
                      <li key={i}>• {i}</li>
                    ))}
                  </ul>
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
            ariaLabel="Functions gallery"
            images={[
              "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&auto=format&fit=crop&w=2400",
              "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&auto=format&fit=crop&w=2400",
              "https://images.unsplash.com/photo-1561484930-998b6a7f97d9?q=80&auto=format&fit=crop&w=2400",
              "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?q=80&auto=format&fit=crop&w=2400",
              "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&auto=format&fit=crop&w=2400",
              "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&auto=format&fit=crop&w=2400",
            ]}
            aspectClassName="aspect-[16/10] sm:aspect-[16/9]"
            autoPlay={4500}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h3 className="text-2xl font-extrabold">Plan Your Event</h3>
          <p className="mt-2 text-slate-700 dark:text-white/80">
            Share your dates, guest count and vision—we’ll craft a proposal.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="tel:+94000000000"
              className="inline-flex items-center gap-2 rounded-xl bg-fuchsia-600 px-5 py-3 font-semibold text-white hover:bg-fuchsia-500 shadow-lg shadow-fuchsia-600/25"
            >
              <Phone className="h-5 w-5" />
              Call Our Events Team
            </a>
            <a
              href="mailto:events@galaxyresidence.lk"
              className="inline-flex items-center gap-2 rounded-xl ring-1 ring-slate-900/10 dark:ring-white/15 px-5 py-3 hover:bg-slate-900/5 dark:hover:bg-white/10"
            >
              <Mail className="h-5 w-5" />
              Email a Request
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
