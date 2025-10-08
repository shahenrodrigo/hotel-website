export default function Footer() {
  return (
    <footer className="border-t border-slate-900/10 dark:border-white/10 py-10">
      <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-sm text-slate-600 dark:text-white/60">
          © {new Date().getFullYear()} Galaxy – Airport Residence. All rights
          reserved.
        </p>
        <div className="flex items-center gap-4 text-sm text-slate-700 dark:text-white/70">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}
