import { defineConfig } from 'tsup';

import { getPackageBuildConfigs } from '../tsup.config.base';

export default defineConfig(
    getPackageBuildConfigs({
        api: './src/api/index.ts',
        index: './src/index.ts',
        v1: './src/v1/index.ts',
    }),
);
