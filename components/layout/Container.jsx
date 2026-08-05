export default function Container({ children, className = '' }) {
  return (
    <div
      className={`mx-auto w-full max-w-[1440px] px-4 sm:px-5 lg:px-6 xl:px-8 ${className}`}
    >
      {children}
    </div>
  );
}