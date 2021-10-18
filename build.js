require('esbuild').build({
    entryPoints: ['src/index.tsx'],
    bundle: true,
    outfile: 'build/out.js',
  }).catch(() => process.exit(1))