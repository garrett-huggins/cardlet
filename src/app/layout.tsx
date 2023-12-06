import Header from "@/components/header";
import Footer from "@/components/footer";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/themeProvider";
import type { Metadata } from "next";
import { GeistSans, GeistMono } from "geist/font";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cardlet",
  description:
    "Master your subjects with customizable flashcards and collaborative learning on Cardlet.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${GeistSans.variable} ${GeistMono.variable} font-sans`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="relative min-h-[100vh] pb-[80px]">
              <div className="w-full bg-white dark:bg-black shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mb-4">
                <Header />
              </div>
              <main className="max-w-screen-xl mx-auto p-4">{children}</main>
              {/* footer at bottom of page */}
              <Footer />
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
