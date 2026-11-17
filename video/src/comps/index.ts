import type { ComponentType } from 'react';
import { journeys } from './journeys';
import { campaigns } from './campaigns';
import { crm } from './crm';

export type Comp = { w: number; h: number; duration: number; Component: ComponentType<{ t: number }> };

export const COMPS: Record<string, Comp> = { ...journeys, ...campaigns, ...crm };
