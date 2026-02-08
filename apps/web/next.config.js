/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        NEXT_BACKEND_URL:process.env.NEXT_BACKEND_URL
    }
};

export default nextConfig;
