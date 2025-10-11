import * as React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const IMAGES = [
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1505691723518-36a5ac3b2d95?q=80&w=2000&auto=format&fit=crop",
];

export default function DeluxeSingle() {
  const [active, setActive] = React.useState(0);
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const total = IMAGES.length;

  const prev = React.useCallback(
    () => setActive((i) => (i - 1 + total) % total),
    [total]
  );
  const next = React.useCallback(
    () => setActive((i) => (i + 1) % total),
    [total]
  );

  // Keyboard shortcuts (←/→ navigate, Esc closes lightbox)
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape" && lightboxOpen) setLightboxOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, prev, next]);

  // Lock scroll when lightbox is open
  React.useEffect(() => {
    if (lightboxOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [lightboxOpen]);

  // Simple swipe for lightbox
  const touchStartX = React.useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartX.current;
    if (start == null) return;
    const delta = e.changedTouches[0].clientX - start;
    if (Math.abs(delta) > 40) delta > 0 ? prev() : next();
    touchStartX.current = null;
  };

  return (
    <>
      <Helmet>
        <title>Deluxe Single Room – Galaxy</title>
        <meta
          name="description"
          content="Deluxe Single Room gallery, amenities and services."
        />
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-10 pb-12 overflow-x-hidden">
        {/* Breadcrumb */}
        <nav
          className="text-sm text-slate-600 dark:text-white/60 mb-6"
          aria-label="Breadcrumb"
        >
          <Link className="hover:underline" to="/">
            Home
          </Link>
          <span className="px-2">›</span>
          <span className="text-slate-900 dark:text-white">
            Deluxe Single Room
          </span>
        </nav>

        {/* Layout: mobile flex → lg grid */}
        <div className="flex flex-col gap-6 sm:gap-8 lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16 items-start">
          {/* Gallery */}
          <section className="min-w-0 lg:col-span-8">
            {/* Main image */}
            <div className="relative w-full overflow-hidden rounded-xl ring-1 ring-slate-900/10 dark:ring-white/10 bg-black/5 dark:bg-black/20">
              <img
                src={IMAGES[active]}
                alt={`Deluxe Single Room – photo ${active + 1}`}
                className="w-full h-auto sm:h-[60vh] md:h-[65vh] lg:h-[70vh] object-contain sm:object-cover cursor-zoom-in select-none"
                onClick={() => setLightboxOpen(true)}
                loading="eager"
                decoding="async"
                draggable={false}
              />

              {/* Prev/Next (desktop/tablet) */}
              <button
                aria-label="Previous image"
                onClick={prev}
                className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 items-center justify-center w-10 h-10 rounded-full bg-black/30 text-white text-xl font-bold backdrop-blur-sm hover:bg-black/50 transition-all"
              >
                ‹
              </button>
              <button
                aria-label="Next image"
                onClick={next}
                className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 items-center justify-center w-10 h-10 rounded-full bg-black/30 text-white text-xl font-bold backdrop-blur-sm hover:bg-black/50 transition-all"
              >
                ›
              </button>
            </div>

            {/* Thumbnails — scrollable row */}
            <div className="mt-4">
              <div className="flex items-center gap-2 overflow-x-auto py-1">
                {IMAGES.map((src, i) => {
                  const isActive = i === active;
                  return (
                    <button
                      key={src}
                      onClick={() => setActive(i)}
                      className={`relative shrink-0 rounded-lg ring-1 ring-slate-900/10 dark:ring-white/10 overflow-hidden focus:outline-none ${
                        isActive
                          ? "ring-2 ring-blue-500"
                          : "hover:ring-2 hover:ring-slate-900/20 dark:hover:ring-white/20"
                      }`}
                      aria-label={`Go to image ${i + 1}`}
                      title={`Image ${i + 1}`}
                    >
                      <img
                        src={src}
                        alt={`Thumbnail ${i + 1}`}
                        className="w-20 h-14 sm:w-24 sm:h-16 md:w-28 md:h-20 object-cover select-none"
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Sidebar */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-5 lg:space-y-6">
            <header>
              <h1 className="text-2xl sm:text-3xl lg:text-2xl xl:text-3xl font-extrabold leading-tight">
                Deluxe Single Room
              </h1>
              <p className="mt-3 text-base text-slate-700 dark:text-white/80 leading-relaxed">
                Calm, modern comfort with balcony access and partial sea/lagoon
                views.
              </p>
            </header>

            {/* Key facts */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-2 gap-3">
              {[
                ["Max. Guests", "1 Adult / 1 Child"],
                ["Bed Type", "Single Bed"],
                ["Area", "51.34 m²"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-xl ring-1 ring-slate-900/10 dark:ring-white/10 p-4 text-center hover:ring-2 hover:ring-slate-900/15 dark:hover:ring-white/15 transition-all"
                >
                  <div className="text-xs uppercase tracking-wider text-slate-600 dark:text-white/60 font-medium">
                    {label}
                  </div>
                  <div className="mt-1 text-base font-bold text-slate-900 dark:text-white">
                    {value}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-base text-slate-700 dark:text-white/80 leading-relaxed">
              The 12 Deluxe Single Rooms offer private outdoor space and modern
              amenities suited to short stays or business travel.
            </p>

            {/* Amenities */}
            <section aria-labelledby="amenities">
              <h2
                id="amenities"
                className="text-xl sm:text-2xl lg:text-xl xl:text-2xl font-extrabold"
              >
                Room Amenities
              </h2>
              <div className="mt-4 grid gap-3 grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
                {[
                  "Partial sea/lagoon view",
                  "Balcony or Terrace",
                  "Central AC",
                  "Wi-Fi",
                  "Television",
                  "Telephone",
                  "Fan",
                  "Mini Bar",
                  "Safe Box",
                  "Shower Cubicle",
                  "Hot & Cold Water",
                  "Tea/Coffee",
                ].map((amenity) => (
                  <div
                    key={amenity}
                    className="rounded-xl ring-1 ring-slate-900/10 dark:ring-white/10 p-3 text-sm hover:ring-2 hover:ring-slate-900/15 dark:hover:ring-white/15 transition-all hover:bg-slate-50 dark:hover:bg-white/5"
                  >
                    <span className="font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Add-ons */}
            <section aria-labelledby="addons">
              <h2
                id="addons"
                className="text-xl sm:text-2xl lg:text-xl xl:text-2xl font-extrabold"
              >
                Additional Services
              </h2>
              <div className="mt-4 grid gap-3 grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {["Airport Pick Up", "Taxi", "SPA"].map((service) => (
                  <div
                    key={service}
                    className="rounded-xl ring-1 ring-slate-900/10 dark:ring-white/10 p-3 text-sm hover:ring-2 hover:ring-slate-900/15 dark:hover:ring-white/15 transition-all hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer"
                  >
                    <span className="font-medium">{service}</span>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={() => setLightboxOpen(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Close */}
          <button
            aria-label="Close"
            onClick={() => setLightboxOpen(false)}
            className="absolute top-3 right-3 sm:top-5 sm:right-5 w-10 h-10 rounded-full bg-white/15 text-white text-2xl leading-none flex items-center justify-center hover:bg-white/25 transition"
          >
            ×
          </button>

          {/* Prev / Next (desktop) */}
          <button
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/15 text-white text-2xl justify-center items-center hover:bg-white/25 transition"
          >
            ‹
          </button>
          <button
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/15 text-white text-2xl justify-center items-center hover:bg-white/25 transition"
          >
            ›
          </button>

          {/* Image (click inside doesn't close) */}
          <div
            className="max-w-[96vw] max-h-[92vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={IMAGES[active]}
              alt={`Deluxe Single Room – photo ${active + 1}`}
              className="max-w-full max-h-[92vh] w-auto h-auto object-contain select-none"
              draggable={false}
            />
          </div>

          {/* Counter */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white/80 text-sm">
            {active + 1} / {total}
          </div>
        </div>
      )}
    </>
  );
}
