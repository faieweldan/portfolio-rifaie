import type { Metadata } from "next";
import { Source_Serif_4, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Rail } from "@/components/rail";
import "./globals.css";

const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Rifaie Wildani — Portfolio",
  description: "Computer Engineering graduate & developer focused on cloud, security, and full-stack engineering.",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Applies the saved theme before first paint, so there's no flash
            and nothing to correct once React takes over. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t==="light")document.documentElement.classList.remove("dark")}catch(e){}`,
          }}
        />
      </head>
      <body className={`${serif.variable} ${mono.variable} antialiased`}>
        <ThemeProvider>
          {/* min-h-screen keeps the sidebar filling the window even when a
              page is shorter than the viewport. */}
          <div className="grid min-h-screen grid-cols-1 sm:grid-cols-[clamp(168px,23%,250px)_1fr]">
            <Rail />
            <main>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
