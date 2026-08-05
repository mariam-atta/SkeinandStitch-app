export default function SectionCard({
  number,
  title,
  description,
  children,
}) {
  return (
    <section className="group rounded-[32px] border border-stone-200/70 bg-white/80 p-7 sm:p-10 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,.05)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_60px_rgba(0,0,0,.08)]">
      <div className="mb-8 flex items-start gap-5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-juniper-700 text-sm font-semibold text-white">
          {number}
        </div>

        <div>
          <p className="mb-2 text-[11px] uppercase tracking-[0.3em] text-clay-600">
            Step {number}
          </p>

          <h2 className="font-display text-3xl text-ink-900">
            {title}
          </h2>

          {description && (
            <p className="mt-3 max-w-xl text-sm leading-7 text-ink-900/60">
              {description}
            </p>
          )}
        </div>
      </div>

      {children}
    </section>
  );
}