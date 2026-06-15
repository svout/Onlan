import { HOW_IT_WORKS_SERVICES } from '@/components/widgets/HowItWork/howItWorksData';
import { HowItWork } from '@/components/widgets/HowItWork/HowItWork';
import { SERVICE_STEP_BACKGROUND_BY_SLUG } from '@/components/widgets/ServicesHowItWorksSection/serviceStepBackgrounds';
import { SERVICE_STEP_PANEL_IMAGE_BY_SLUG } from '@/components/widgets/ServicesHowItWorksSection/serviceStepPanelImages';

export function ServicesHowItWorksSection() {
    const total = HOW_IT_WORKS_SERVICES.length;

    return (
        <div className="relative w-full">
            {HOW_IT_WORKS_SERVICES.map((item, index) => (
                <HowItWork
                    key={item.number}
                    {...item}
                    index={index}
                    total={total}
                    backgroundImageSrc={SERVICE_STEP_BACKGROUND_BY_SLUG[item.slug]}
                    panelImageSrc={SERVICE_STEP_PANEL_IMAGE_BY_SLUG[item.slug]}
                />
            ))}
        </div>
    );
}
