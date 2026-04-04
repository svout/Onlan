import { USStateNames } from '@/utils/constants';

export interface StateSummaryData {
    carriers: number;
    onExchangePlans: number;
    offExchangePlans: number;
}

let preloadPromise: Promise<void> | null = null;
let dataByStateName: Record<string, StateSummaryData> = {};

export function getStateSummary(stateName: string): StateSummaryData | undefined {
    return dataByStateName[stateName];
}

export function preloadStateSummary(): Promise<void> {
    if (preloadPromise) return preloadPromise;

    preloadPromise = (async () => {
        const response = await fetch('https://rates-public.predictablebenefits.com/public/plans/summary');
        if (!response.ok) {
            throw new Error('Failed to fetch state summary data');
        }
        const data = await response.json();

        const next: Record<string, StateSummaryData> = {};

        // API is keyed by state abbreviation; map to full state names (used by geojson).
        for (const [abbr, stateName] of Object.entries(USStateNames)) {
            const entry = data?.[abbr];
            if (!entry) continue;
            next[stateName] = {
                carriers: entry.carrier_count || 0,
                onExchangePlans: entry.on_exchange_plans || 0,
                offExchangePlans: entry.off_exchange_plans || 0,
            };
        }

        dataByStateName = next;
    })().catch((err) => {
        // Allow retry if preload fails
        preloadPromise = null;
        throw err;
    });

    return preloadPromise;
}

