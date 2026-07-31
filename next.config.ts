import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  experimental: {
    useTypeScriptCli: true,
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "b.zmtcdn.com" },
      { protocol: "https", hostname: "assets.architecturaldigest.in" }
    ]
  }
};

export default nextConfig;
