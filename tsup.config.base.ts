import { env } from 'node:process';

import { Format, Options as TsupConfig } from 'tsup';

type Platform = 'browser' | 'node' | 'react-native';

type BuildOptions = {
    format: Format;
    platform: Platform;
    /**
     * Entry-point map: keys become the output filenames (before the platform
     * and format suffixes), values are the source paths. Defaults to a single
     * `index` entry pointing at `./src/index.ts`.
     */
    entry?: Record<string, string>;
};

const DEFAULT_ENTRY: Record<string, string> = { index: './src/index.ts' };

export function getBuildConfig(options: BuildOptions): TsupConfig {
    const { format, platform, entry = DEFAULT_ENTRY } = options;
    return {
        define: {
            __BROWSER__: `${platform === 'browser'}`,
            __ESM__: `${format === 'esm'}`,
            __NODEJS__: `${platform === 'node'}`,
            __REACTNATIVE__: `${platform === 'react-native'}`,
            __TEST__: 'false',
            __VERSION__: `"${env.npm_package_version}"`,
        },
        entry,
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
        treeshake: true,
    };
}

export function getPackageBuildConfigs(entry?: Record<string, string>): TsupConfig[] {
    return [
        getBuildConfig({ format: 'cjs', platform: 'node', entry }),
        getBuildConfig({ format: 'esm', platform: 'node', entry }),
        getBuildConfig({ format: 'cjs', platform: 'browser', entry }),
        getBuildConfig({ format: 'esm', platform: 'browser', entry }),
        getBuildConfig({ format: 'esm', platform: 'react-native', entry }),
    ];
}
