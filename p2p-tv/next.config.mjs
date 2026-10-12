/** @type {import('next').NextConfig} */
const nextConfig = {
  // cacheComponents is OFF on purpose: every page here depends on who is
  // logged in (cookies), so pages must render per request.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
