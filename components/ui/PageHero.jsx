export default function PageHero({
  eyebrow,
  title,
  description,
}) {
  return (
    <section className="relative overflow-hidden border-b border-stone-200 bg-gradient-to-b from-oat-50 via-white to-oat-50">
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-juniper-700/5 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-clay-600/5 blur-3xl" />

      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-clay-600">
          {eyebrow}
        </p>

        <h1 className="font-display text-5xl leading-tight text-ink-900 sm:text-6xl">
          {title}
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-ink-900/60">
          {description}
        </p>
      </div>
    </section>
  );
}