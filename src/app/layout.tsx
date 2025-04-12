import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ProjectsProvider } from "@/components/projects-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Island } from "@/components/ui/island";
import { ModeToggle } from "@/components/ui/mode-toggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  island,
}: Readonly<{
  children: React.ReactNode;
  island: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ProjectsProvider>
              <div className="w-screen h-screen p-2 ">
                <div className="relative w-full h-full">
                  <div className="absolute right-0">
                    <ModeToggle />
                  </div>
                  <main className="w-full h-full flex justify-center items-center">
                    {children}
                  </main>
                  <div className="absolute bottom-5 w-full flex items-center justify-center">
                    <Island>{island}</Island>
                  </div>
                </div>
              </div>
            </ProjectsProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
