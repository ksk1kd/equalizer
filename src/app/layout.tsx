import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CurrentProjectProvider } from "@/components/current-project-provider";
import { ProjectsProvider } from "@/components/projects-provider";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Equalizer",
  robots: "noindex,nofollow",
};

export default function RootLayout({
  children,
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
              <CurrentProjectProvider>
                <div className="w-screen h-screen flex justify-center items-center">
                  {children}
                </div>
              </CurrentProjectProvider>
            </ProjectsProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
