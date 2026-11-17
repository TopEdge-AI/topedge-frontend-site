import type { ComponentType } from 'react';
import { journeys } from './journeys';
import { campaigns } from './campaigns';
import { crm } from './crm';
import { pixel } from './pixel';
import { profit } from './profit';
import { optin } from './optin';
import { flow } from './flow';
import { intent } from './intent';
import { brain } from './brain';
import { rules } from './rules';
import { meta } from './meta';
import { home } from './home';

import type { CamKey, StudioTone } from '../lib/cine';
import { CINE } from './cine';

export type Comp = {
  w: number; h: number; duration: number; Component: ComponentType<{ t: number }>;
  /** Cinematic mode: harness draws the studio (unless tone is omitted) and runs the camera. */
  cine?: { tone?: StudioTone; seed?: number; cam: CamKey[] };
};

const ALL: Record<string, Comp> = { ...journeys, ...campaigns, ...crm, ...pixel, ...profit, ...optin, ...flow, ...intent, ...brain, ...rules, ...meta, ...home };
for (const [id, c] of Object.entries(CINE)) if (ALL[id]) ALL[id] = { ...ALL[id], cine: c(ALL[id]) };
export const COMPS = ALL;
