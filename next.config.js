/**
 * @type {import('next').NextConfig} 
 */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['your-supabase-bucket.s3.amazonaws.com'], // Add your Supabase bucket domain
  },
  env: {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  },
};

module.exports = nextConfig;