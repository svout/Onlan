import type { ITab, TabPosition, TabSize, TabVariant } from '@elements/Tab/index.ts';

interface TabsProps {
    className?: string;
    tabsClassName?: string;
    tabs: ITab[];
    active?: ITab['value'];
    position?: TabPosition;
    variant?: TabVariant;
    size?: TabSize;
    onChange: (value: ITab['value']) => void;
}

export default function Tabs({
    className = '',
    tabs,
    active,
    onChange,
}: TabsProps) {
    // Find the active tab based on the active prop
    const activeTabValue = active || tabs[0]?.value;
    const activeTab = tabs.find((tab: ITab) => tab.value === activeTabValue) || tabs[0];

    return (
        <div className={`w-full min-w-0 ${className}`}>
            <div role="tablist" className="flex gap-1 mb-0 overflow-x-auto">
                {tabs.map((tab, idx) => (
                    <button
                        key={idx}
                        role="tab"
                        type="button"
                        className={`px-2 py-2 text-sm font-medium rounded-t-lg transition-colors cursor-pointer ${
                            tab.value === active
                                ? 'bg-onlan-white text-onlan-blue border border-onlan-lavender border-b-white relative z-10 shadow-sm'
                                : 'bg-onlan-lime text-onlan-white'
                        }`}
                        onClick={() => {
                            onChange(tab.value);
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            {activeTab?.content && (
                <div className="w-full rounded-b-[18px] rounded-tr-[18px] bg-onlan-white p-3 sm:p-6 border border-onlan-lavender border-t-0 -mt-px relative z-0 overflow-visible min-w-0">
                    {activeTab.content}
                </div>
            )}
        </div>
    );
}
