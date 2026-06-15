/**
 * Foreground photos for the right panel in each sticky service step.
 * Uses the official per-service visuals from `src/assets/images/`.
 */
import type { HowItWorksServiceItem } from '@/types/HowItWorks.interface';

import imgAir from '@images/Avia.jpg';
import imgSea from '@images/Morski.jpg';
import imgRoad from '@images/MultiModals.jpg';
import imgCustoms from '@images/Mytne.jpg';
import imgOversized from '@images/Negabarutni.jpg';
import imgRail from '@images/Zaliznuchni.jpg';
import imgContainer from '@images/cargo/container.jpg';

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
    multimodal: imgContainer,
};
