// import { GoogleTagManager } from '@next/third-parties/google'
import '@/styles/app.css';
import Announcement from '@/ui/Announcement';
import Footer from '@/ui/footer';
import Header from '@/ui/header';
import SkipToContent from '@/ui/SkipToContent';
import VisualEditingControls from '@/ui/VisualEditingControls';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={supplySans.className}>
      {/* <GoogleTagManager gtmId='' /> */}

      <body className="bg-canvas text-ink">
        <SkipToContent />
        <Announcement />
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />

        <Analytics />
        <SpeedInsights />
        <VisualEditingControls />
      </body>
    </html>
  );
}
