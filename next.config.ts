import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      /**
       * //add external image url, etc
       * {
       *   protocol: "https",
       *   hostname: "ik.imagekit.io",
       *   port: "",
       * }
       */
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb", // Set desired value here
    },
  },
};

export default nextConfig;
