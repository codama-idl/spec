import { env } from 'node:process';

import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
    define: {
        __BROWSER__: 'false',
        __ESM__: 'true',
        __NODEJS__: 'true',
        __REACTNATIVE__: 'false',
        __TEST__: 'true',
        __VERSION__: `"${env.npm_package_version}"`,
    },
    test: {
        environment: 'node',
        exclude: [...configDefaults.exclude, '**/e2e/**'],
        name: 'node',
    },
});
