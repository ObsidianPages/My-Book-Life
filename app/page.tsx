export default function LandingPage() {
  return (
    <div className="text-center space-y-10 py-20 px-4"
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/main.jpg')" }}>
      <h1 className="text-5xl sm:text-6xl font-serif">My Book Life</h1>
      <p className="text-lg sm:text-xl text-stone-600 max-w-xl mx-auto">
        An aesthetic reading tracker for book lovers. Track books, save quotes,
        build moodboards, and romanticize your reading life.
      </p>

      <div className="flex justify-center gap-4">
        <a
          href="/auth/signup"
          className="px-6 py-3 bg-stone-900 text-white rounded-lg text-lg"
        >
          Get Started
        </a>
        <a
          href="/auth/login"
          className="px-6 py-3 border border-stone-300 rounded-lg text-lg"
        >
          Login
        </a>
      </div>

      <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
        <Feature title="Track Books" desc="Organize your TBR, current reads, and finished books." />
        <Feature title="Save Quotes" desc="Collect the lines that break your heart (in a good way)." />
        <Feature title="Aesthetic Moodboards" desc="Capture the vibe of every story you love." />
      </div>
    </div>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-6 border border-stone-200 rounded-xl bg-white shadow-sm">
      <h3 className="text-xl font-serif mb-2">{title}</h3>
      <p className="text-stone-600 text-sm">{desc}</p>
    </div>
  );
}
