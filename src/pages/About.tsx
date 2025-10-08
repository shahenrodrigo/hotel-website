import { Helmet } from "react-helmet-async";
import Reveal from "../components/Reveal";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About – Galaxy Airport Residence</title>
        <meta
          name="description"
          content="About Galaxy – Airport Residence. Story, facilities, services, awards and stats."
        />
      </Helmet>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-10 items-start">
          <Reveal>
            <h1 className="text-4xl sm:text-5xl font-extrabold">
              Galaxy – Airport Residence
            </h1>
            <p className="mt-3 text-xl text-slate-700 dark:text-white/80">
              From convenience to comfort.
            </p>
            <div className="mt-6 space-y-4 text-slate-700 dark:text-white/80 leading-relaxed">
              <p>
                Located minutes from the international airport, Galaxy offers a
                calm, modern stay designed for effortless arrivals and early
                departures. Personalize this area with your authentic story and
                hospitality values.
              </p>
              <p>
                Choose from a variety of rooms and suites designed for business
                travelers and holiday seekers. Add your unique highlights,
                services, and guest experience here.
              </p>
            </div>
          </Reveal>
          <Reveal className="relative">
            <img
              className="rounded-2xl shadow-xl ring-1 ring-slate-900/10 dark:ring-white/10 w-full object-cover"
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1600&auto=format&fit=crop"
              alt="Resort pool"
            />
            <img
              className="hidden sm:block absolute right-0 top-10 translate-x-6 rounded-2xl shadow-xl ring-1 ring-slate-900/10 dark:ring-white/10 w-2/3 object-cover"
              src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1400&auto=format&fit=crop"
              alt="Boardwalk"
            />
          </Reveal>
        </div>
      </section>

      <section className="pb-6">
        <div className="mx-auto max-w-7xl px-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            ["8", "ROOMS"],
            ["1", "RESTAURANTS"],
            ["20", "STAFF"],
            ["1", "caffe"],
          ].map(([num, label]) => (
            <Reveal
              key={label}
              className="glass rounded-2xl ring-1 ring-slate-900/10 dark:ring-white/10 p-6 text-center"
            >
              <div className="text-4xl font-extrabold">{num}</div>
              <div className="mt-1 text-sm tracking-wider">{label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <h2 className="text-3xl font-extrabold">SERVICES</h2>
          </Reveal>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {["Pool", "Ballroom", "Cuisine", "Spa"].map((label, i) => (
              <Reveal key={label}>
                <img
                  className="rounded-xl ring-1 ring-slate-900/10 dark:ring-white/10 object-cover aspect-[16/10]"
                  src={
                    [
                      "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1600&auto=format&fit=crop",
                      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
                      "https://images.unsplash.com/photo-1541542684-4a1b3d2b4f83?q=80&w=1600&auto=format&fit=crop",
                      "https://images.unsplash.com/photo-1559599078-6c1d6d3d5143?q=80&w=1600&auto=format&fit=crop",
                    ][i]
                  }
                  alt={label}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
