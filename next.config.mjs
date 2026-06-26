import path from 'node:path';

const isStaticExportBuild = process.env.NEXT_EXPORT === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
    ...(isStaticExportBuild ? { output: 'export' } : {}),
    // Generate canonical app routes without a trailing slash, e.g. `/terms` instead of `/terms/`
    trailingSlash: false,
    productionBrowserSourceMaps: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        unoptimized: true,
        disableStaticImages: true,
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(svg|png|jpe?g|gif|webp|avif|ico|bmp|zip)$/i,
            type: 'asset/resource',
        });

        config.resolve.alias = {
            ...config.resolve.alias,
            'react-router': path.resolve('./src/lib/router.tsx'),
            'react-router-dom': path.resolve('./src/lib/router.tsx'),
        };

        return config;
    },
};

export default nextConfig;
