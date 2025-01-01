/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
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
      {
        hostname: "images.unsplash.com"
      },
    ]
  },
};

export default nextConfig;
