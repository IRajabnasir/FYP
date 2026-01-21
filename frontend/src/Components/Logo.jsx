export default function Logo() {
  return (
    <div className="flex items-center gap-6">

      {/* LOGO IMAGE */}
      <img
        src="/logo.png"
        alt="VLPR-TVD Logo"
        className="h-24 w-24 object-contain
        drop-shadow-[0_0_22px_rgba(255,200,0,0.9)]
        transition-transform duration-300 hover:scale-105"
      />

      {/* TEXT BLOCK */}
      <div className="flex flex-col justify-center space-y-1">
        <h1 className="text-[28px] font-extrabold tracking-wide text-white leading-tight">
          VLPR<span className="text-yellow-400">-TVD</span>
        </h1>

        <p className="text-[14px] text-slate-300 leading-snug">
          Traffic Intelligence System
        </p>

        <p className="text-[13px] text-yellow-400 font-medium">
          Powered by HAR Technology
        </p>
      </div>

    </div>
  );
}
