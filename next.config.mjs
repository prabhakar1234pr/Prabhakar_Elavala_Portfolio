import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Explicitly set the monorepo/root directory so Next.js
  // doesn't have to guess when multiple lockfiles exist.
  outputFileTracingRoot: path.join(__dirname, '..'),
};

export default nextConfig;

