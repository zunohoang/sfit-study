import type { NextConfig } from "next";
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/
});

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
};

export default withMDX(nextConfig);
