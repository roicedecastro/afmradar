import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
 title: { default:"AFM Signal — From surveillance to understanding", template:"%s | AFM Signal" },
 description:"AFM surveillance and research intelligence with source traceability and calibrated scientific uncertainty.",
};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }
