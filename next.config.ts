import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    rules: {
      '*.{glsl,vs,fs,vert,frag}': {
        loaders: ['raw-loader'],
        as: '*.js',
      },
    },
  },

  images: {
    remotePatterns: [new URL('https://placehold.co/**')],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
