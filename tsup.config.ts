import { env } from 'node:process';

import { defineConfig, Format, Options as TsupConfig } from 'tsup';

type Platform = 'browser' | 'node' | 'react-native';

type BuildOptions = {
    format: Format;
    platform: Platform;
};

const ENTRY: Record<string, string> = {
    api: './src/api/index.ts',
    index: './src/index.ts',
    v1: './src/v1/index.ts',
};

function getBuildConfig({ format, platform }: BuildOptions): TsupConfig {
    return {
        define: {
            __BROWSER__: `${platform === 'browser'}`,
            __ESM__: `${format === 'esm'}`,
            __NODEJS__: `${platform === 'node'}`,
            __REACTNATIVE__: `${platform === 'react-native'}`,
            __TEST__: 'false',
            __VERSION__: `"${env.npm_package_version}"`,
        },
        entry: ENTRY,
        esbuildOptions(opts) {
            opts.define = {
                ...opts.define,
                'process.env.NODE_ENV': 'process.env.NODE_ENV',
            };
        },
        external: ['node:fs', 'node:fs/promises', 'node:path', 'node:url'],
        format,
        name: platform,
        outExtension({ format }) {
            const ext = `.${platform}.${format === 'cjs' ? 'cjs' : 'mjs'}`;
            return { js: ext };
        },
        platform: platform === 'node' ? 'node' : 'browser',
        sourcemap: true,
        // Multi-entry ESM builds (`index` + `v1` + `api`) trigger tsup's
        // automatic code splitting by default, which lifts shared modules
        // into hashed `chunk-*.mjs` files. Those chunks are not listed in
        // `package.json#files`, so the published tarball ships entrypoints
        // that re-export from missing modules and ESM consumers fail to
        // resolve them at import time. Disable splitting so each entry
        // inlines its dependencies and the published `dist/` is
        // self-contained.
        splitting: false,
        treeshake: true,
    };
}

export default defineConfig([
    getBuildConfig({ format: 'cjs', platform: 'node' }),
    getBuildConfig({ format: 'esm', platform: 'node' }),
    getBuildConfig({ format: 'cjs', platform: 'browser' }),
    getBuildConfig({ format: 'esm', platform: 'browser' }),
    getBuildConfig({ format: 'esm', platform: 'react-native' }),
]);
