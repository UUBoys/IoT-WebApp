/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: "/api/auth/:path*", // this will ensure that /api/auth/* paths remain unchanged
      },
      {
        source: "/api/uploadthing/:path*",
        destination: "/api/uploadthing/:path*", // other /api/* paths get rewritten
      },
      {
        source: "/api/:path*",
        destination: process.env.API_URL, // other /api/* paths get rewritten
      },
    ];
  },
  images: {
    domains: [
      "katalog.svkul.cz",
      "obalkyknih.cz",
      "nazornavyuka.cz",
      "g.denik.cz",
      "ftp.nazornavyuka.cz",
      "uuapp.plus4u.net",
      "s3.amazonaws.com",
      "fastly.picsum.photos",
      "img.youtube.com",
      "this-person-does-not-exist.com",
      "picsum.photos",
      "cdn.pixabay.com",
      "www.port-teplice.cz",
      "i.redd.it",
      "utfs.io",
    ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  output: "standalone",
  env: {
    SKIP_TYPESCRIPT_CHECK: "true",
    PROD_URL: process.env.PROD_URL,
  },
};

module.exports = nextConfig;
