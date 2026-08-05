export default function InfoCard({
  title,
  children,
}) {
  return (
    <div className="rounded-[30px] border border-stone-200/70 bg-white p-8 shadow-[0_10px_35px_rgba(0,0,0,.05)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_55px_rgba(0,0,0,.08)]">
      <h3 className="mb-4 font-display text-2xl text-ink-900">
        {title}
      </h3>

      <div className="space-y-4 leading-8 text-ink-900/60">
        {children}
      </div>
    </div>
  );
}