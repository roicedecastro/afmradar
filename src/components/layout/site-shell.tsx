import Link from "next/link";
import type { ReactNode } from "react";

const nav = [["Overview","/"],["AFM Now","/afm-now"],["Research Radar","/research"],["Research Map","/map"],["Mechanism","/mechanism"],["Methodology","/methodology"]];
export function SiteHeader() {
  return <header className="border-b rule bg-[#f7f6f1]/95 sticky top-0 z-30 backdrop-blur">
    <div className="container flex h-16 items-center justify-between gap-4">
      <Link href="/" className="focus-ring flex items-center gap-2 font-bold tracking-[-.06em]"><span className="grid h-7 w-7 place-items-center rounded-sm bg-[#173a32] text-xs text-white">A</span><span>AFM SIGNAL</span></Link>
      <nav aria-label="Main navigation" className="hidden items-center gap-5 text-sm text-[#43564f] lg:flex">{nav.map(([label,href]) => <Link key={href} className="focus-ring hover:text-[#173a32]" href={href}>{label}</Link>)}</nav>
      <Link href="/research" className="focus-ring border border-[#173a32] px-3 py-2 text-xs font-bold uppercase tracking-wider hover:bg-[#173a32] hover:text-white">Explore data</Link>
    </div>
  </header>;
}
export function SiteFooter() {
 return <footer className="mt-20 border-t rule py-10 text-sm text-[#586660]"><div className="container grid gap-8 md:grid-cols-[1fr_auto]"><div><p className="font-bold text-[#173a32]">AFM SIGNAL</p><p className="mt-2 max-w-xl">Informational scientific intelligence. Not medical advice, diagnosis, or a substitute for clinical care.</p></div><div className="flex gap-5"><Link href="/methodology">Methodology</Link><a href="https://www.cdc.gov/acute-flaccid-myelitis/" target="_blank">CDC AFM</a><Link href="/corrections">Report a correction</Link></div></div></footer>;
}
export function PageShell({children}:{children:ReactNode}) { return <><SiteHeader/><main>{children}</main><SiteFooter/></>; }
