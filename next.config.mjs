/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: "drive.google.com"
      },
      {
        hostname: "lh3.googleusercontent.com"
      },
      {
        hostname: "avatars.githubusercontent.com"
      },
    ]
  },
};

export default nextConfig;
