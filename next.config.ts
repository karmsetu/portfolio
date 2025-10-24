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
    remotePatterns: [
      new URL('https://placehold.co/**'),
      new URL('https://ufs.sh/**'),
    ],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
