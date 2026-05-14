import type { HowItWorksServiceItem } from '@/types/HowItWorks.interface';
import { SERVICES, getServiceBySlug as getServiceContentBySlug } from '@/content/services';

/** Subset of fields used by the home-page sticky stack and existing widgets. */
export const HOW_IT_WORKS_SERVICES: HowItWorksServiceItem[] = SERVICES.map(
    ({ number, slug, tagLabel, title, description, iconId }) => ({
        number,
        slug,
        tagLabel,
        title,
        description,
        iconId,
    }),
);

export function getServiceBySlug(slug: string): HowItWorksServiceItem | undefined {
    const content = getServiceContentBySlug(slug);
    if (!content) {
        return undefined;
    }
    const { number, tagLabel, title, description, iconId } = content;
    return { number, slug: content.slug, tagLabel, title, description, iconId };
}

export function getAllServiceSlugParams(): { slug: string }[] {
    return SERVICES.map((service) => ({ slug: service.slug }));
}
