import type { ComponentType } from 'react';
import { journeys } from './journeys';

export type Comp = { w: number; h: number; duration: number; Component: ComponentType<{ t: number }> };

export const COMPS: Record<string, Comp> = { ...journeys };
