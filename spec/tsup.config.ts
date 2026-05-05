import { defineConfig } from 'tsup';

import { getPackageBuildConfigs } from '../tsup.config.base';

export default defineConfig(
    getPackageBuildConfigs({
        index: './src/index.ts',
        v1: './src/v1/index.ts',
    }),
);
