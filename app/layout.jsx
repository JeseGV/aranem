import "@/styles/globals.css"
import "@/styles/util.css"

const pwaData = {
  "application-name": "Aranem",
  "apple-mobile-web-app-capable": "yes",
  "apple-mobile-web-app-status-bar-style": "default",
  "apple-mobile-web-app-title": "Aranem",
  description: "Car service en la palma de tu mano",
  "format-detection": "telephone=no",
  "mobile-web-app-capable": "yes",
  "msapplication-config": "/icons/browserconfig.xml",
  "msapplication-TileColor": "#FFFFFF00",
  "msapplication-tap-highlight": "no",
  "theme-color": "#9C47D3",
}

const linkData = {
  "apple-touch-icon": "/assets/brand/favicon-sizes/icon-918x918.png",
  "apple-touch-icon sizes": {
    "152x152": "/assets/brand/favicon-sizes/icon-152x152.png",
    "180x180": "/assets/brand/favicon-sizes/icon-180x180.png",
    "167x167": "/assets/brand/favicon-sizes/icon-167x167.png",
  },
  "icon sizes": {
    "32x32": "/assets/brand/favicon-sizes/icon-32x32.png",
    "16x16": "/assets/brand/favicon-sizes/icon-16x16.png",
  },
  manifest: "/manifest.json",
  "mask-icon": {
    href: "/icons/safari-pinned-tab.svg",
    color: "#FFFFFF00",
  },
  "shortcut icon": "/favicon.ico",
}

const twitterData = {
  twitter: {
    card: "summary",
    url: "https://aranem.vercel.app",
    title: "Aranem",
    description: "Car service en la palma de tu mano",
    image: "https://aranem.vercel.app/assets/brand/favicon-sizes/icon-512x512.png",
    creator: "@AndresPrza",
  },
}

const ogData = {
  openGraph: {
    type: "website",
    title: "Aranem",
    description: "Car service en la palma de tu mano",
    site_name: "Aranem",
    url: "https://aranem.vercel.app",
    image: "https://aranem.vercel.app/assets/brand/favicon-sizes/icon-512x512.png",
  },
}

const appleTouchStartupImageData = {
  // NO HAY
  "apple-touch-startup-image": {
    "2048x2732": "/images/apple_splash_2048.png",
    "1668x2224": "/images/apple_splash_1668.png",
    "1536x2048": "/images/apple_splash_1536.png",
    "1125x2436": "/images/apple_splash_1125.png",
    "1242x2208": "/images/apple_splash_1242.png",
    "750x1334": "/images/apple_splash_750.png",
    "640x1136": "/images/apple_splash_640.png",
  },
}

export const metadata = {
  title: "ARANEM",
  description: "Car service",
  ...pwaData,
  ...linkData,
  ...twitterData,
  ...ogData,
  // ...appleTouchStartupImageData
}
import { Providers } from "./providers"

export default function RootLayout({ children }) {
  return (
    <html lang='es'>
      <head>
        <title>{metadata.title}</title>
        <meta name='description' content={metadata.description} />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </head>
      <body className='bg-poly h-screen force-rotate text-foreground overflow-x-hidden'>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
