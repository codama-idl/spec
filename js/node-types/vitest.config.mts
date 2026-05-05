import { defineProject } from 'vitest/config';

import { getVitestConfig } from '../../vitest.config.base.mjs';

export default defineProject(getVitestConfig('node'));
