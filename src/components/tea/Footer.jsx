export default function Footer() {
  return (
    <footer className="border-t border-ink/5 mt-8 pb-28">
      <div className="max-w-2xl mx-auto px-5 py-8 text-center">
        <h3 className="font-serif text-lg font-bold text-ink tracking-tight">
          Pyi Htaung Hsu Tea Shop
        </h3>
        <p className="text-ink/30 text-xs font-mono mt-2 leading-relaxed">
          Traditional Tea House · Serving since 2018
        </p>

        <div className="flex justify-center gap-6 mt-5">
          <a
            href="#"
            className="text-ink/30 hover:text-ink/60 transition-colors text-xs font-mono uppercase tracking-wider"
          >
            Facebook
          </a>
          <a
            href="#"
            className="text-ink/30 hover:text-ink/60 transition-colors text-xs font-mono uppercase tracking-wider"
          >
            Instagram
          </a>
          <a
            href="#"
            className="text-ink/30 hover:text-ink/60 transition-colors text-xs font-mono uppercase tracking-wider"
          >
            Grab Food
          </a>
        </div>

        <div className="mt-6 pt-5 border-t border-ink/5">
          <p className="text-ink/20 text-[10px] font-mono tracking-wider">
            © 2018 – {new Date().getFullYear()} PYI HTAUNG HSU. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}