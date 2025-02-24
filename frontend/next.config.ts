/** @type {import('next').NextConfig} */
const nextConfig = {
  output: `standalone`,
  images: {
    domains: ['api.pgxn.org'],
  },
  // The build output includes only the minimal required files and dependencies, making it easier to deploy.
}

module.exports = nextConfig
