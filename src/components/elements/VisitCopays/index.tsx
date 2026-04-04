import type { FullPlan } from '@/types/FullPlan';

const formatTelemedicine = (telemedicine: string | null): string => {
    if (!telemedicine) return '—';
    const value = telemedicine.replace('$', '').toLowerCase();
    if (value === 'true') return 'Yes';
    if (value === 'false') return 'No';
    return telemedicine;
};

export const VisitCopays = ({ plan }: { plan: FullPlan }) => {
    return (
        <div className="mb-[7px] w-full">
            <div className="grid grid-cols-3 md:grid-cols-3 lg:flex lg:items-stretch gap-0 md:gap-0 lg:gap-0 w-full">
                <div className="flex flex-col p-1 md:p-0 md:border-b md:border-blue-100 md:pr-4 md:pb-4 md:relative lg:border-0 lg:pr-4 lg:flex-1 lg:py-0">
                    <div className="hidden md:block absolute right-0 top-0 bottom-4 w-px bg-blue-100 lg:hidden"></div>
                    <div className="text-sm md:text-base font-normal text-onlan-blue">Preventative</div>
                    <div className="text-base lg:text-base font-medium text-onlan-black">
                        {plan.preventitive_numerical ? `$${plan.preventitive_numerical}` : '—'}
                    </div>
                </div>
                <div className="flex flex-col p-1 md:p-0 md:border-b md:border-blue-100 md:pr-4 md:pb-4 md:pl-4 md:pt-0 md:relative lg:border-0 lg:border-l lg:border-blue-100 lg:pr-4 lg:flex-1 lg:py-0 lg:pl-4">
                    <div className="hidden md:block absolute right-0 top-0 bottom-4 w-px bg-blue-100 lg:hidden"></div>
                    <div className="text-sm md:text-base font-normal text-onlan-blue">Primary Care</div>
                    <div className="text-base lg:text-base font-medium text-onlan-black">
                        {plan.primary_care_numerical ? `$${plan.primary_care_numerical}` : '—'}
                    </div>
                </div>
                <div className="flex flex-col p-1 md:p-0 md:border-b md:border-blue-100 md:pb-4 md:pl-4 md:pt-0 lg:border-0 lg:border-l lg:border-blue-100 lg:pr-4 lg:flex-1 lg:py-0 lg:pl-4">
                    <div className="text-sm md:text-base font-normal text-onlan-blue">Urgent Care</div>
                    <div className="text-base lg:text-base font-medium text-onlan-black">
                        {plan.urgent_care_numerical ? `$${plan.urgent_care_numerical}` : '—'}
                    </div>
                </div>
                {/* Second row - 3 elements */}
                <div className="flex flex-col p-1 md:p-0 md:border-r md:border-blue-100 md:pr-4 md:pt-4 lg:border-0 lg:border-l lg:border-blue-100 lg:pr-4 lg:flex-1 lg:py-0 lg:pl-4">
                    <div className="text-sm md:text-base font-normal text-onlan-blue">Emergency</div>
                    <div className="text-base lg:text-base font-medium text-onlan-black">
                        {plan.emergency_numerical ? `$${plan.emergency_numerical}` : '—'}
                    </div>
                </div>
                <div className="flex flex-col p-1 md:p-0 md:border-r md:border-blue-100 md:pr-4 md:pt-4 md:pl-4 lg:border-0 lg:border-l lg:border-blue-100 lg:pr-4 lg:flex-1 lg:py-0 lg:pl-4">
                    <div className="text-sm md:text-base font-normal text-onlan-blue">Specialist</div>
                    <div className="text-base lg:text-base font-medium text-onlan-black">
                        {plan.specelist_numerical ? `$${plan.specelist_numerical}` : '—'}
                    </div>
                </div>
                <div className="flex flex-col p-1 md:p-0 md:border-blue-100 md:pt-4 md:pl-4 lg:border-0 lg:border-l lg:border-blue-100 lg:flex-1 lg:py-0 lg:pl-4">
                    <div className="text-sm md:text-base font-normal text-onlan-blue">Telemedicine</div>
                    <div className="text-base lg:text-base font-medium text-onlan-black">
                        {formatTelemedicine(plan.telemedicine)}
                    </div>
                </div>
            </div>
        </div>
    );
};
