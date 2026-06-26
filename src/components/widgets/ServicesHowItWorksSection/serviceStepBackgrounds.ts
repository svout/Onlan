/**
 * Full-bleed backgrounds for each service step in the sticky “How it works” stack.
 * Assets live under `src/assets/images/` (same visuals as the provided PNG set).
 *
 * `multimodal` reuses the road / intermodal image — add a dedicated asset later if needed.
 */
import type { HowItWorksServiceItem } from '@/types/HowItWorks.interface';

import imgAir from '@images/Avia.webp';
import imgSea from '@images/Morski.webp';
import imgRoad from '@images/MultiModals.webp';
import imgCustoms from '@images/Mytne.webp';
import imgOversized from '@images/Negabarutni.webp';
import imgRail from '@images/Zaliznuchni.webp';

export const SERVICE_STEP_BACKGROUND_BY_SLUG: Record<HowItWorksServiceItem['slug'], string> = {
    automotive: imgRoad,
    'sea-container': imgSea,
    air: imgAir,
    rail: imgRail,
    oversized: imgOversized,
    customs: imgCustoms,
    multimodal: imgRoad,
};
