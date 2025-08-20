import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Theme Colors */}
        <meta name="theme-color" content="#0070f3" />
        <meta name="msapplication-TileColor" content="#0070f3" />
        
        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" href="/icons/apple-icon-152x152.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="CineSeek" />
        
        {/* Microsoft Tile */}
        <meta name="msapplication-TileImage" content="/icons/ms-icon-310x310.png" />
        
        {/* Favicon */}
        <link rel="icon" href="/icons/android-chrome-192x192.png" />
        
        {/* PWA Meta Tags */}
        <meta name="application-name" content="CineSeek" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Cine Seek - Movie Discovery App" />
        <meta property="og:description" content="Discover and explore movies with offline capabilities" />
        <meta property="og:site_name" content="CineSeek" />
        <meta property="og:url" content="https://your-app-url.vercel.app" />
        <meta property="og:image" content="/icons/android-chrome-192x192.png" />
        
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Cine Seek - Movie Discovery App" />
        <meta name="twitter:description" content="Discover and explore movies with offline capabilities" />
        <meta name="twitter:image" content="/icons/android-chrome-192x192.png" />
        
        {/* Preload Critical Resources */}
        <link rel="preconnect" href="https://api.themoviedb.org" />
        <link rel="preconnect" href="https://image.tmdb.org" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
