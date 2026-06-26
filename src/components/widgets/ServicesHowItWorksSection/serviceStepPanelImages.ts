/**
 * Foreground photos for the right panel in each sticky service step.
 * Uses the official per-service visuals from `src/assets/images/`.
 */
import type { HowItWorksServiceItem } from '@/types/HowItWorks.interface';

import imgAir from '@images/Avia.webp';
import imgSea from '@images/Morski.webp';
import imgRoad from '@images/MultiModals.webp';
import imgCustoms from '@images/Mytne.webp';
import imgOversized from '@images/Negabarutni.webp';
import imgRail from '@images/Zaliznuchni.webp';

export const SERVICE_STEP_PANEL_IMAGE_BY_SLUG: Record<
    HowItWorksServiceItem['slug'],
    string
> = {
    automotive: imgRoad,
    'sea-container': imgSea,
    air: imgAir,
    rail: imgRail,
    oversized: imgOversized,
    customs: imgCustoms,
    multimodal: imgRoad,
};
