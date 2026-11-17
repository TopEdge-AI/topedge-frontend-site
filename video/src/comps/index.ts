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
import { launch } from './launch';
import { launch2 } from './launch2';

import type { CamKey, StudioTone } from '../lib/cine';
import { CINE } from './cine';

export type Comp = {
  w: number; h: number; duration: number; Component: ComponentType<{ t: number }>;
  /** Cinematic mode: harness draws the studio (unless tone is omitted) and runs the camera. */
  cine?: { tone?: StudioTone; seed?: number; cam: CamKey[] };
};

const ALL: Record<string, Comp> = { ...journeys, ...campaigns, ...crm, ...pixel, ...profit, ...optin, ...flow, ...intent, ...brain, ...rules, ...meta, ...home, ...launch, ...launch2 };
for (const [id, c] of Object.entries(CINE)) if (ALL[id]) ALL[id] = { ...ALL[id], cine: c(ALL[id]) };
// Launch films also render on a 4:5 phone canvas (`-m`) and a 4:3 hero phone canvas (`-h43`).
for (const [id, c] of Object.entries({ ...launch, ...launch2 })) {
  ALL[`${id}-m`] = { ...c, w: 1080, h: 1350 };
  ALL[`${id}-h43`] = { ...c, w: 1440, h: 1080 };
}
export const COMPS = ALL;
