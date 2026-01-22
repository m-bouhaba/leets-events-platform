import { FiChevronDown } from "react-icons/fi";

export default function Home() {
  const scrollToEvents = () => {
    const section = document.getElementById("events");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  const events = [
    {
      title: "Coding Bootcamp",
      description: "Learn to code with experts in one weekend.",
      price: "150MAD",
      img: "/coding.jpg",
    },
    {
      title: "English Café Karaoke Party",
      description: "Speaking session only in English. Fun, vibes & connection.",
      price: "Free",
      img: "/kara.jpg",
    },
    {
      title: "Yoga & Wellness Session",
      description: "Relax, stretch and connect with like-minded people.",
      price: "50MAD",
      img: "/yoga.jpg",
    }
    
  ];

  return (
    <div className="bg-black text-white">

      {/* ================= HERO ================= */}
      <section className="relative w-full h-[90vh] overflow-hidden">
        <video
          src="/video1.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/30" />

        {/* Swipe Down */}
        <button
          onClick={scrollToEvents}
          aria-label="Scroll to events"
          className="
            absolute bottom-6 left-1/2 -translate-x-1/2 z-20
            w-12 h-12 rounded-full
            bg-yellow-400 text-black
            flex items-center justify-center
            hover:bg-yellow-300
            transition
            animate-bounce
            shadow-lg
            cursor-pointer
          "
        >
          <FiChevronDown size={28} />
        </button>
      </section>

      {/* ================= EVENTS ================= */}
      <section
        id="events"
        className="py-24 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-yellow-400 mb-12">
            Upcoming Events
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {events.slice(0, 3).map((event, i) => (
              <div
                key={i}
                className="bg-white/5 rounded-xl overflow-hidden hover:scale-[1.02] transition"
              >
                <img
                  src={event.img}
                  alt={event.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-5 space-y-2">
                  <h3 className="font-semibold">{event.title}</h3>
                  <p className="text-sm text-white/70">{event.description}</p>
                  <span className="text-yellow-400 font-bold">{event.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="bg-yellow-400 text-black py-24 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">
              More than events.  
              It’s a community.
            </h2>

            <p className="leading-relaxed">
              Leets Events was born from a simple idea: creating real human
              connections through meaningful events.
              <br /><br />
              No pressure. No judgment. Just moments that matter.
            </p>
          </div>

          <img
            src="/community.jpeg"
            alt="community"
            className="rounded-xl shadow-xl"
          />
        </div>
      </section>

      {/* ================= GALLERY ================= */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-yellow-400 mb-12">
            Memories
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           
              <img
                src={"memo.jpeg"}
                alt="memory"
                className="
                  h-48 w-full object-cover rounded-lg
                  hover:scale-105 transition
                "
              />
               <img
            src="/memo1.jpeg"
            alt="community"
            className="
                  h-48 w-full object-cover rounded-lg
                  hover:scale-105 transition
                "
          />
           <img
                src={"memo.jpeg"}
                alt="memory"
                className="
                  h-48 w-full object-cover rounded-lg
                  hover:scale-105 transition
                "
              />
              <img
            src="/memo1.jpeg"
            alt="community"
            className="
                  h-48 w-full object-cover rounded-lg
                  hover:scale-105 transition
                "
          />
           
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-yellow-400 text-black py-24 text-center px-6">
        <h2 className="text-3xl font-bold mb-6">
          Ready to join the next experience?
        </h2>

        <a
          href="/events"
          className="
            inline-block bg-black text-yellow-400
            px-8 py-4 rounded-full
            font-semibold hover:bg-gray-900 transition
          "
        >
          Explore Events
        </a>
      </section>

    </div>
  );
}
