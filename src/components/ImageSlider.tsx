import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

/** Enhanced fallback with gradient and icon */
const FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='1600' height='900'>
      <defs>
        <radialGradient id='fallback-gradient' cx='0.5' cy='0.5' r='0.8'>
          <stop offset='0%' stop-color='#f8fafc'/>
          <stop offset='100%' stop-color='#e2e8f0'/>
        </radialGradient>
        <filter id='shadow'>
          <feDropShadow dx='2' dy='2' stdDeviation='3' flood-opacity='0.3'/>
        </filter>
      </defs>
      <rect width='100%' height='100%' fill='url(#fallback-gradient)'/>
      <circle cx='800' cy='350' r='60' fill='#cbd5e1' opacity='0.7'/>
      <path d='M780 330 L820 330 L820 370 L780 370 Z M790 340 L810 340 L810 360 L790 360 Z' fill='white' filter='url(#shadow)'/>
      <text x='50%' y='65%' text-anchor='middle' font-family='system-ui,sans-serif' 
            font-size='24' font-weight='500' fill='#64748b'>
        Image unavailable
      </text>
    </svg>`
  );

type Props = {
  images: string[];
  aspectClassName?: string;
  className?: string;
  autoPlay?: number;
  ariaLabel?: string;
  lightbox?: boolean;
  showThumbnails?: boolean;
  enableZoom?: boolean;
};

export default function ImageSlider({
  images,
  aspectClassName = "aspect-[16/10] sm:aspect-[16/9]",
  className = "",
  autoPlay = 4500,
  ariaLabel = "image gallery",
  lightbox = true,
  showThumbnails = true,
  enableZoom = true,
}: Props) {
  const [idx, setIdx] = useState(0);
  const [hover, setHover] = useState(false);
  const [loading, setLoading] = useState<Set<number>>(new Set());
  const timer = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  // Lightbox state
  const [open, setOpen] = useState(false);
  const [lightIdx, setLightIdx] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const lightTouchX = useRef<number | null>(null);

  const next = () => setIdx((i) => (i + 1) % images.length);
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);

  // Enhanced autoplay with better timing
  useEffect(() => {
    if (!autoPlay || hover || open || images.length <= 1) return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = window.setTimeout(next, autoPlay);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [idx, hover, autoPlay, open, images.length]);

  // Keyboard navigation with additional keys
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (open) return;
      switch (e.key) {
        case "ArrowRight":
        case " ":
          e.preventDefault();
          next();
          break;
        case "ArrowLeft":
          e.preventDefault();
          prev();
          break;
        case "Home":
          e.preventDefault();
          setIdx(0);
          break;
        case "End":
          e.preventDefault();
          setIdx(images.length - 1);
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, images.length]);

  // Enhanced touch handling
  const onTouchStart: React.TouchEventHandler = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd: React.TouchEventHandler = (e) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const THRESHOLD = 50;
    if (Math.abs(dx) > THRESHOLD) {
      if (dx > 0) prev();
      else next();
    }
    touchStartX.current = null;
  };

  // Enhanced lightbox opening
  const openLightbox = (startIndex: number) => {
    if (!lightbox) return;
    setLightIdx(startIndex);
    setOpen(true);
    setZoomed(false);
  };

  // Image loading state
  const handleImageLoad = (imageIdx: number) => {
    setLoading((prev) => {
      const newSet = new Set(prev);
      newSet.delete(imageIdx);
      return newSet;
    });
  };

  const handleImageLoadStart = (imageIdx: number) => {
    setLoading((prev) => new Set(prev).add(imageIdx));
  };

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow || "";
    };
  }, [open]);

  // Lightbox keyboard controls
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          setOpen(false);
          setZoomed(false);
          break;
        case "ArrowRight":
        case " ":
          e.preventDefault();
          setLightIdx((i) => (i + 1) % images.length);
          setZoomed(false);
          break;
        case "ArrowLeft":
          e.preventDefault();
          setLightIdx((i) => (i - 1 + images.length) % images.length);
          setZoomed(false);
          break;
        case "z":
        case "Z":
          if (enableZoom) setZoomed((prev) => !prev);
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, images.length, enableZoom]);

  // Lightbox swipe handling
  const onLightTouchStart: React.TouchEventHandler = (e) => {
    lightTouchX.current = e.touches[0].clientX;
  };

  const onLightTouchEnd: React.TouchEventHandler = (e) => {
    if (lightTouchX.current == null) return;
    const dx = e.changedTouches[0].clientX - lightTouchX.current;
    const THRESHOLD = 50;
    if (Math.abs(dx) > THRESHOLD) {
      if (dx > THRESHOLD) {
        setLightIdx((i) => (i - 1 + images.length) % images.length);
      } else {
        setLightIdx((i) => (i + 1) % images.length);
      }
      setZoomed(false);
    }
    lightTouchX.current = null;
  };

  if (!images.length) {
    return (
      <div className="flex items-center justify-center min-h-[200px] bg-slate-100 dark:bg-slate-800 rounded-2xl">
        <p className="text-slate-500 dark:text-slate-400">
          No images to display
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Main Slider */}
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
        className={[
          "relative overflow-hidden rounded-2xl",
          "bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800",
          "ring-1 ring-slate-900/10 dark:ring-white/10",
          "shadow-lg hover:shadow-xl transition-shadow duration-300",
          "select-none group",
          className,
        ].join(" ")}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className={`flex transition-all duration-700 ease-out ${aspectClassName}`}
          style={{
            transform: `translateX(-${idx * 100}%)`,
            filter: hover ? "brightness(1.05)" : "brightness(1)",
          }}
        >
          {images.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              className="w-full shrink-0 relative focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              onClick={() => openLightbox(i)}
              onLoadStart={() => handleImageLoadStart(i)}
            >
              {/* Loading skeleton */}
              {loading.has(i) && (
                <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 animate-pulse" />
              )}

              <img
                src={src}
                alt={`Gallery image ${i + 1}`}
                onError={(e) => (e.currentTarget.src = FALLBACK)}
                onLoad={() => handleImageLoad(i)}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                referrerPolicy="no-referrer"
                draggable={false}
              />

              {/* Lightbox hint */}
              {lightbox && (
                <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                  <div className="bg-white/90 dark:bg-black/90 p-2 rounded-full backdrop-blur-sm">
                    <ZoomIn className="h-5 w-5 text-slate-700 dark:text-white" />
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Enhanced Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className={[
                "absolute left-3 top-1/2 -translate-y-1/2",
                "h-10 w-10 rounded-full",
                "bg-white/80 dark:bg-black/80 backdrop-blur-md",
                "text-slate-700 dark:text-white",
                "border border-white/20 dark:border-black/20",
                "shadow-lg hover:shadow-xl",
                "hover:bg-white dark:hover:bg-black",
                "transform transition-all duration-200",
                "hover:scale-110 active:scale-95",
                "opacity-0 group-hover:opacity-100",
                "focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
              ].join(" ")}
            >
              <ChevronLeft className="h-5 w-5 mx-auto" />
            </button>

            <button
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className={[
                "absolute right-3 top-1/2 -translate-y-1/2",
                "h-10 w-10 rounded-full",
                "bg-white/80 dark:bg-black/80 backdrop-blur-md",
                "text-slate-700 dark:text-white",
                "border border-white/20 dark:border-black/20",
                "shadow-lg hover:shadow-xl",
                "hover:bg-white dark:hover:bg-black",
                "transform transition-all duration-200",
                "hover:scale-110 active:scale-95",
                "opacity-0 group-hover:opacity-100",
                "focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
              ].join(" ")}
            >
              <ChevronRight className="h-5 w-5 mx-auto" />
            </button>
          </>
        )}

        {/* Enhanced Pagination Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2">
            <div className="bg-black/20 dark:bg-white/20 backdrop-blur-md rounded-full px-3 py-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIdx(i);
                  }}
                  className={[
                    "inline-block h-2 w-2 mx-1 rounded-full transition-all duration-300",
                    i === idx
                      ? "bg-white dark:bg-white scale-125 shadow-md"
                      : "bg-white/60 dark:bg-white/60 hover:bg-white/80 dark:hover:bg-white/80 hover:scale-110",
                  ].join(" ")}
                />
              ))}
            </div>
          </div>
        )}

        {/* Image Counter */}
        <div className="absolute top-4 right-4 bg-black/20 dark:bg-white/20 backdrop-blur-md rounded-full px-3 py-1">
          <span className="text-white dark:text-white text-sm font-medium">
            {idx + 1} / {images.length}
          </span>
        </div>
      </div>

      {/* Enhanced Lightbox */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Full screen image viewer"
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm"
          onClick={() => {
            setOpen(false);
            setZoomed(false);
          }}
          onTouchStart={onLightTouchStart}
          onTouchEnd={onLightTouchEnd}
        >
          <div
            className="absolute inset-0 flex flex-col items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Main Image */}
            <div className="relative max-h-[85vh] max-w-[95vw]">
              <img
                src={images[lightIdx]}
                alt={`Gallery image ${lightIdx + 1}`}
                onError={(e) => (e.currentTarget.src = FALLBACK)}
                className={[
                  "max-h-full max-w-full object-contain transition-transform duration-300",
                  zoomed ? "scale-150 cursor-zoom-out" : "cursor-zoom-in",
                ].join(" ")}
                onClick={() => enableZoom && setZoomed((prev) => !prev)}
                draggable={false}
              />
            </div>

            {/* Enhanced Controls */}
            <div className="absolute top-4 right-4 flex gap-2">
              {enableZoom && (
                <button
                  aria-label={zoomed ? "Zoom out" : "Zoom in"}
                  className="h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20"
                  onClick={() => setZoomed((prev) => !prev)}
                >
                  <ZoomIn
                    className={`h-5 w-5 mx-auto transition-transform ${
                      zoomed ? "scale-125" : ""
                    }`}
                  />
                </button>
              )}

              <button
                aria-label="Close viewer"
                className="h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20"
                onClick={() => {
                  setOpen(false);
                  setZoomed(false);
                }}
              >
                <X className="h-5 w-5 mx-auto" />
              </button>
            </div>

            {/* Enhanced Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <div className="bg-black/40 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <span className="text-white/90 text-sm font-medium">
                  {lightIdx + 1} of {images.length}
                </span>
              </div>
            </div>

            {/* Enhanced Navigation */}
            {images.length > 1 && (
              <>
                <button
                  aria-label="Previous image"
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all backdrop-blur-sm border border-white/20 hover:scale-110"
                  onClick={() => {
                    setLightIdx((i) => (i - 1 + images.length) % images.length);
                    setZoomed(false);
                  }}
                >
                  <ChevronLeft className="h-6 w-6 mx-auto" />
                </button>

                <button
                  aria-label="Next image"
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all backdrop-blur-sm border border-white/20 hover:scale-110"
                  onClick={() => {
                    setLightIdx((i) => (i + 1) % images.length);
                    setZoomed(false);
                  }}
                >
                  <ChevronRight className="h-6 w-6 mx-auto" />
                </button>
              </>
            )}

            {/* Thumbnail Navigation */}
            {showThumbnails && images.length > 1 && (
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 max-w-[90vw] overflow-x-auto">
                <div className="flex gap-2 p-2 bg-black/20 backdrop-blur-md rounded-lg border border-white/10">
                  {images.map((src, i) => (
                    <button
                      key={`thumb-${i}`}
                      aria-label={`Go to image ${i + 1}`}
                      onClick={() => {
                        setLightIdx(i);
                        setZoomed(false);
                      }}
                      className={[
                        "h-12 w-16 shrink-0 overflow-hidden rounded-md transition-all",
                        i === lightIdx
                          ? "ring-2 ring-white scale-110"
                          : "ring-1 ring-white/20 hover:ring-white/60 hover:scale-105",
                      ].join(" ")}
                    >
                      <img
                        src={src}
                        alt={`Thumbnail ${i + 1}`}
                        onError={(e) => (e.currentTarget.src = FALLBACK)}
                        className="h-full w-full object-cover"
                        draggable={false}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Help Text */}
            <div className="absolute top-4 left-4">
              <div className="bg-black/40 backdrop-blur-md rounded-lg px-3 py-2 border border-white/20">
                <p className="text-white/80 text-xs">
                  Press ESC to close • Arrow keys to navigate
                  {enableZoom && " • Click image or Z to zoom"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
