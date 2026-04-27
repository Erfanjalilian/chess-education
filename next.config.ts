import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol:"https",
        hostname:"randomuser.me",
        port:"",
        pathname:"/**"
      },
      {
        protocol:"https",
        hostname:"zarebin.ir",
         port:"",
        pathname:"/**"
      },
      {
        protocol:"https",
        hostname:"boom-zrbn.mohtava.cloud",
         port:"",
        pathname:"/**"
      }
    ],
  },
};

export default nextConfig;