import { HOW_IT_WORKS_SERVICES } from '@/components/widgets/HowItWork/howItWorksData';
import { HowItWork } from '@/components/widgets/HowItWork/HowItWork';

/**
 * Sticky stack: each service is `sticky top-0 min-h-dvh` with rising z-index so the next
 * panel slides over the previous while scrolling (same interaction as stacked “cards”).
 */
export function ServicesHowItWorksSection() {
    const total = HOW_IT_WORKS_SERVICES.length;

    return (
        <div className="relative w-full">
            {HOW_IT_WORKS_SERVICES.map((item, index) => (
                <HowItWork key={item.number} {...item} index={index} total={total} />
            ))}
        </div>
    );
}
