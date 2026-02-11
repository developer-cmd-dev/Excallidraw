/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:false,
    env:{
        NEXT_BACKEND_URL:process.env.NEXT_BACKEND_URL,
        NEXT_GOOGLE_CLIENT_ID:process.env.NEXT_GOOGLE_CLIENT_ID
    }
};

export default nextConfig;
