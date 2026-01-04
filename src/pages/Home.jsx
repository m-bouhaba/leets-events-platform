import { FiChevronDown } from "react-icons/fi";

export default function Hero() {
  const scrollToEvents = () => {
    const section = document.getElementById("events");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
  <video
    src="/hero.mp4"
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover object-[30%_30%]"
  />

      {/* DARK OVERLAY (optional mais recommandé) */}
      <div className="absolute inset-0 bg-black/30" />

      {/* SWIPE DOWN */}
      <button
        onClick={scrollToEvents}
        aria-label="Scroll to events"
        className="
          absolute bottom-8 left-1/2 -translate-x-1/2 z-20
          flex flex-col items-center
          text-yellow-400
          hover:text-yellow-300
          transition
          animate-bounce
        "
      >
        <FiChevronDown size={38} />
      </button>
    </section>
  );
}
