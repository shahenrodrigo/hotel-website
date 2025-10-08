import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import DeluxeSingle from "./pages/rooms/DeluxeSingle";
import { useEffect } from "react";
import Lenis from "lenis";
import Restaurant from "./pages/other/Restaurant";
import Functions from "./pages/other/Functions";
import Cafe from "./pages/other/Cafe";

export default function App() {
  // Smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    const raf = (t: number) => {
      lenis.raf(t);
      requestAnimationFrame(raf);
    };
    const id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-white text-slate-900 dark:bg-slate-950 dark:text-white font-sans min-h-screen">
      <Navbar />
      <main className="pt-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/rooms/deluxe-single" element={<DeluxeSingle />} />

          {/* Other Services */}
          <Route path="/other/restaurant" element={<Restaurant />} />
          <Route path="/other/functions" element={<Functions />} />
          <Route path="/other/cafe" element={<Cafe />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
