// import { GoogleTagManager } from '@next/third-parties/google'
import type { Metadata } from 'next';
import SkipToContent from '@/ui/SkipToContent';
import Announcement from '@/ui/Announcement';
import Header from '@/ui/header';
import Footer from '@/ui/footer';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import VisualEditingControls from '@/ui/VisualEditingControls';
import '@/styles/app.css';
import localFont from 'next/font/local';

const supplySans = localFont({
  src: [
    {
      path: '../fonts/PPSupplySans-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/PPSupplySans-Ultralight.woff2',
      weight: '200',
      style: 'normal',
    },
  ],
});

export const metadata: Metadata = {
  title: 'NVLV Studio - Creative Agency',
  description:
    "Portfolio and marketing website of NVLV Studio. We're more than just a creative agency - we're visionaries at the intersection of digital innovation and tangible reality. Our interdisciplinary approach is dedicated to crafting bold and interactive experiences that blur the boundaries between the digital and physical realms.",
  keywords: [
    'creative agency',
    'digital innovation',
    'portfolio',
    'marketing',
    'visionaries',
    'interdisciplinary',
    'bold',
    'interactive experiences',
    'digital',
    'physical',
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={supplySans.className}>
      {/* <GoogleTagManager gtmId='' /> */}

      <body className="bg-canvas text-ink">
        {/* <SkipToContent /> */}
        {/* <Announcement /> */}
        {/* <Header /> */}
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        {/* <Footer /> */}

        <Analytics />
        <SpeedInsights />
        <VisualEditingControls />
      </body>
    </html>
  );
}
