const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    // MDX options here (optional)
  },
});

module.exports = withMDX({
  // Append the default Next.js extensions with .mdx
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    domains: [
      "picsum.photos",
      "assets.aceternity.com",
      "forum-files-playcanvas-com.s3.dualstack.eu-west-1.amazonaws.com",
      "i0.wp.com",
      "hiddenlogics.com",
      "media.licdn.com",
      "www.binarycode.co.nz",
      "miro.medium.com",
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };

    return config;
  },
  entry: './pages/index.js',
});