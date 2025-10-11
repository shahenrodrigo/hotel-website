// src/widgets/GalleryGrid.tsx
import { useEffect, useRef, useState } from "react";

/* =========================
   HEIGHT CONTROLS (edit me)
   ========================= */
const TILE_HEIGHT_CLASS =
   "aspectShort"
  // "aspectMedium"
  // "aspectTall"
  // "fixedShort"
 // "fixedMedium";
// "fixedTall"

const CAP_SECTION = false; // true to cap section height with internal scroll
const SECTION_MAX_VH = 80;

const TILE_HEIGHT_CLASSES: Record<string, string> = {
  aspectShort: "aspect-[21/9] sm:aspect-[16/9] lg:aspect-[16/9]",
  aspectMedium: "aspect-[3/2] sm:aspect-[3/2] lg:aspect-[16/10]",
  aspectTall: "aspect-[4/3] sm:aspect-[4/3] lg:aspect-[4/3]",
  fixedShort: "h-44 sm:h-52 md:h-60 lg:h-64 xl:h-72",
  fixedMedium: "h-56 sm:h-64 md:h-72 lg:h-80 xl:h-96",
  fixedTall: "h-64 sm:h-72 md:h-80 lg:h-[22rem] xl:h-[24rem]",
};

/** fallback to avoid broken images */
const FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='1600' height='900'>
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

type Album = {
  title: string;
  cover: string; // grid thumbnail
  images: string[]; // lightbox images for this title
};

const ALBUMS: Album[] = [
  {
    title: "Hotel",
    cover:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&auto=format&fit=crop&w=2000",
    images: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&auto=format&fit=crop&w=2000",
      "https://images.unsplash.com/photo-1528697203043-733bfdcaea1a?q=80&auto=format&fit=crop&w=2000",
      "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&auto=format&fit=crop&w=2000",
      "https://images.unsplash.com/photo-1551776235-dde6d4829808?q=80&auto=format&fit=crop&w=2000",
    ],
  },
  {
    title: "Pool",
    cover:
      "https://images.unsplash.com/photo-1505577058444-a3dab90d4253?q=80&auto=format&fit=crop&w=2000",
    images: [
      "https://images.unsplash.com/photo-1505577058444-a3dab90d4253?q=80&auto=format&fit=crop&w=2000",
      "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&auto=format&fit=crop&w=2000",
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&auto=format&fit=crop&w=2000",
      "https://images.unsplash.com/photo-1496318447583-f524534e9ce1?q=80&auto=format&fit=crop&w=2000",
    ],
  },
  {
    title: "Rooms",
    cover:
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&auto=format&fit=crop&w=2000",
    images: [
      "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?q=80&auto=format&fit=crop&w=2000",
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&auto=format&fit=crop&w=2000",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&auto=format&fit=crop&w=2000",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&auto=format&fit=crop&w=2000",
    ],
  },
  {
    title: "Restaurant",
    cover:
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&auto=format&fit=crop&w=2000",
    images: [
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&auto=format&fit=crop&w=2000",
      "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?q=80&auto=format&fit=crop&w=2000",
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&auto=format&fit=crop&w=2000",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&auto=format&fit=crop&w=2000",
    ],
  },
  {
    title: "Functions",
    cover:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&auto=format&fit=crop&w=2000",
    images: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&auto=format&fit=crop&w=2000",
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&auto=format&fit=crop&w=2000",
      "https://images.unsplash.com/photo-1561484930-998b6a7f97d9?q=80&auto=format&fit=crop&w=2000",
      "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?q=80&auto=format&fit=crop&w=2000",
    ],
  },
  {
    title: "Café",
    cover:
      "https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&auto=format&fit=crop&w=2000",
    images: [
      "https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&auto=format&fit=crop&w=2000",
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&auto=format&fit=crop&w=2000",
      "https://images.unsplash.com/photo-1481391319762-47dff72954d9?q=80&auto=format&fit=crop&w=2000",
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&auto=format&fit=crop&w=2000",
    ],
  },
];

export default function GalleryGrid() {
  const [open, setOpen] = useState(false);
  const [albumIdx, setAlbumIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const openAlbum = (i: number) => {
    setAlbumIdx(i);
    setPhotoIdx(0);
    setOpen(true);
  };

  const prev = () =>
    setPhotoIdx(
      (p) =>
        (p - 1 + ALBUMS[albumIdx].images.length) %
        ALBUMS[albumIdx].images.length
    );
  const next = () =>
    setPhotoIdx((p) => (p + 1) % ALBUMS[albumIdx].images.length);

  // prevent page scroll when lightbox open
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prevOverflow || "";
    };
  }, [open]);

  // keyboard controls for lightbox
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const wrapperCapClass = CAP_SECTION
    ? `max-h-[${SECTION_MAX_VH}vh] overflow-y-auto pr-1`
    : "";

  return (
    <>
      {/* Optional section cap (internal scroll) */}
      <div className={wrapperCapClass}>
        {/* GRID */}
        <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ALBUMS.map((a, i) => (
            <div
              key={a.title + i}
              className="group relative overflow-hidden rounded-2xl ring-1 ring-slate-900/10 dark:ring-white/10"
            >
              <button
                type="button"
                aria-label={`Open ${a.title} album`}
                className="block w-full"
                onClick={() => openAlbum(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") openAlbum(i);
                }}
              >
                <img
                  src={a.cover}
                  alt={a.title}
                  onError={(e) => (e.currentTarget.src = FALLBACK)}
                  className={[
                    "w-full object-cover",
                    TILE_HEIGHT_CLASSES[TILE_HEIGHT_CLASS],
                    "transition-transform duration-500 group-hover:scale-[1.03]",
                  ].join(" ")}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  referrerPolicy="no-referrer"
                  draggable={false}
                />

                {/* darken slightly on hover for contrast */}
                <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/25" />

                {/* CENTERED WHITE PILL ON HOVER — now for ALL albums */}
                <span
                  className="
                    pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                    rounded-full bg-white px-4 py-1.5 text-lg font-semibold text-slate-900
                    ring-1 ring-black/5 shadow
                    opacity-0 translate-y-1 transition-all duration-200
                    group-hover:opacity-100 group-hover:translate-y-0
                    group-focus-within:opacity-100 group-focus-within:translate-y-0
                  "
                >
                  {a.title}
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX (album with multiple images) */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${ALBUMS[albumIdx].title} gallery`}
          className="fixed inset-0 z-[100] bg-black/90"
          onClick={() => setOpen(false)}
          onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchStartX.current == null) return;
            const dx = e.changedTouches[0].clientX - touchStartX.current;
            const T = 50;
            if (dx > T) prev();
            else if (dx < -T) next();
            touchStartX.current = null;
          }}
        >
          <div
            className="absolute inset-0 flex flex-col items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* main image */}
            <img
              src={ALBUMS[albumIdx].images[photoIdx]}
              alt={`${ALBUMS[albumIdx].title} ${photoIdx + 1}`}
              onError={(e) => (e.currentTarget.src = FALLBACK)}
              className="max-h-[80vh] max-w-[95vw] object-contain"
              draggable={false}
            />

            {/* title + counter */}
            <div className="mt-3 text-white/90 text-sm">
              {ALBUMS[albumIdx].title} • {photoIdx + 1} /{" "}
              {ALBUMS[albumIdx].images.length}
            </div>

            {/* thumbnails row */}
            <div className="mt-4 flex w-full max-w-4xl items-center justify-center gap-2 overflow-x-auto">
              {ALBUMS[albumIdx].images.map((src, i) => (
                <button
                  key={src + i}
                  aria-label={`Go to ${ALBUMS[albumIdx].title} photo ${i + 1}`}
                  onClick={() => setPhotoIdx(i)}
                  className={`h-16 w-24 shrink-0 overflow-hidden rounded-md ring-2 ${
                    i === photoIdx
                      ? "ring-white"
                      : "ring-white/20 hover:ring-white/40"
                  }`}
                >
                  <img
                    src={src}
                    alt=""
                    onError={(e) => (e.currentTarget.src = FALLBACK)}
                    className="h-full w-full object-cover"
                    draggable={false}
                  />
                </button>
              ))}
            </div>

            {/* controls */}
            <button
              aria-label="Close viewer"
              className="absolute right-4 top-4 h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white/20"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
            {ALBUMS[albumIdx].images.length > 1 && (
              <>
                <button
                  aria-label="Previous"
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 text-white text-2xl hover:bg-white/20"
                  onClick={prev}
                >
                  ‹
                </button>
                <button
                  aria-label="Next"
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 text-white text-2xl hover:bg-white/20"
                  onClick={next}
                >
                  ›
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
