import React, { useState, useEffect, useMemo, useRef, type ReactNode } from 'react';
import { RangeInputs } from '../RangeInputs';
import { SquareCheckBoxToggle } from '../SquareCheckBoxToggle';
import Tooltip from '@/components/elements/Tooltip/Tooltip';
import FilterIcon from '@/assets/icons/Filter.svg';
import { Elements } from '@/components/elements';
import type { PlanWithAgePremiums } from '@/types/Plan';
import Image from 'next/image';

const formatNumber = (num: number): string => {
    return Math.round(num).toLocaleString('en-US');
};

export interface FiltersPanelProps {
    beforeChild?: ReactNode;
    plans?: PlanWithAgePremiums[];
    currentFilters?: {
        metal: string[];
        planMarket: string[];
        enrollment: string[];
        carriers: string[];
        features: string[];
        premiumMin?: number;
        premiumMax?: number;
        deductibleMin?: number;
        deductibleMax?: number;
        maxOutOfPocketMin?: number;
        maxOutOfPocketMax?: number;
    };
    onFiltersChange?: (filters: {
        metal: string[];
        planMarket: string[];
        enrollment: string[];
        carriers: string[];
        features: string[];
        premiumMin?: number;
        premiumMax?: number;
        deductibleMin?: number;
        deductibleMax?: number;
        maxOutOfPocketMin?: number;
        maxOutOfPocketMax?: number;
    }) => void;
    isModal?: boolean;
}

export const FiltersPanel = ({ beforeChild, plans = [], currentFilters, onFiltersChange, isModal = false }: FiltersPanelProps) => {
    const metal = ['Catastrophic', 'Bronze', 'Silver', 'Gold', 'Platinum'] as const;

    const [selectedMetal, setSelectedMetal] = useState<string[]>(currentFilters?.metal || ['Catastrophic', 'Bronze', 'Silver', 'Gold', 'Platinum']);
    const [planMarket, setPlanMarket] = useState<string[]>(currentFilters?.planMarket || ['On-Exchange', 'Off-Exchange']);
    const [enrollment, setEnrollment] = useState<string[]>(currentFilters?.enrollment || []);
    const [selectedCarriers, setSelectedCarriers] = useState<string[]>(currentFilters?.carriers || []);
    const [features, setFeatures] = useState<string[]>(currentFilters?.features || []);
    const [premiumMin, setPremiumMin] = useState<number | undefined>(currentFilters?.premiumMin);
    const [premiumMax, setPremiumMax] = useState<number | undefined>(currentFilters?.premiumMax);
    const [deductibleMin, setDeductibleMin] = useState<number | undefined>(currentFilters?.deductibleMin);
    const [deductibleMax, setDeductibleMax] = useState<number | undefined>(currentFilters?.deductibleMax);
    const [maxOutOfPocketMin, setMaxOutOfPocketMin] = useState<number | undefined>(currentFilters?.maxOutOfPocketMin);
    const [maxOutOfPocketMax, setMaxOutOfPocketMax] = useState<number | undefined>(currentFilters?.maxOutOfPocketMax);
    const prevFiltersRef = useRef<string>('');
    const userClearedAllCarriersRef = useRef<boolean>(false);
    const prevFiltersStateRef = useRef<string>('');
    const isUpdatingFromSyncRef = useRef(false);
    const hasMountedRef = useRef(false);
    const [hoveredCarrier, setHoveredCarrier] = useState<string | null>(null);
    const [hoveredMetal, setHoveredMetal] = useState<string | null>(null);
    const [hoveredPlanMarket, setHoveredPlanMarket] = useState<string | null>(null);

    const getFilteredPlansForCarriers = useMemo(() => {
        return () => {
            return plans.filter((plan) => {

                if (selectedMetal.length > 0 && selectedMetal.length < 5) {
                    const planLevel = plan.level.toLowerCase();
                    const matchesMetal = selectedMetal.some((metal) => planLevel.includes(metal.toLowerCase()));
                    if (!matchesMetal) return false;
                }


                if (planMarket.length > 0 && planMarket.length < 2) {
                    const isOnExchange = plan.on_market === true;
                    const isOffExchange = plan.off_market === true;
                    const matchesMarket = planMarket.some((market) => {
                        if (market === 'On-Exchange') return isOnExchange;
                        if (market === 'Off-Exchange') return isOffExchange;
                        return false;
                    });
                    if (!matchesMarket) return false;
                }


                if (features.length > 0) {
                    if (features.includes('HSA Eligible') && !plan.hsa_eligible) return false;
                    if (features.includes('Specialist Without Referral') && plan.gated === true) return false;
                }


                if (premiumMin !== undefined || premiumMax !== undefined) {
                    if (!plan.premium) return false;
                    const premiumStr = String(plan.premium).trim();
                    const cleanedPremium = premiumStr.replace(/[^0-9.]/g, '');
                    const planPremium = parseFloat(cleanedPremium);
                    if (isNaN(planPremium)) return false;
                    if (premiumMin !== undefined && planPremium < premiumMin) return false;
                    if (premiumMax !== undefined && planPremium > premiumMax) return false;
                }


                if (maxOutOfPocketMin !== undefined || maxOutOfPocketMax !== undefined) {
                    const planMaxOutOfPocket = plan.max_out_of_pocket_numerical;
                    if (planMaxOutOfPocket === undefined || planMaxOutOfPocket === null || isNaN(planMaxOutOfPocket)) return false;
                    if (maxOutOfPocketMin !== undefined && planMaxOutOfPocket < maxOutOfPocketMin) return false;
                    if (maxOutOfPocketMax !== undefined && planMaxOutOfPocket > maxOutOfPocketMax) return false;
                }

                return true;
            });
        };
    }, [plans, selectedMetal, planMarket, features, premiumMin, premiumMax, maxOutOfPocketMin, maxOutOfPocketMax]);


    const carriers = useMemo(() => {
        const filteredPlans = getFilteredPlansForCarriers();
        const uniqueCarriers = new Set<string>();
        filteredPlans.forEach((plan) => {
            if (plan.carrier?.name) {
                uniqueCarriers.add(plan.carrier.name);
            }
        });
        return Array.from(uniqueCarriers).sort();
    }, [getFilteredPlansForCarriers]);

    const carrierLongNames = useMemo(() => {
        const filteredPlans = getFilteredPlansForCarriers();
        const map = new Map<string, string>();
        filteredPlans.forEach((plan) => {
            if (plan.carrier?.name) {
                const shortName = plan.carrier.name;
                const longName = plan.carrier.name_long || plan.carrier.name;
                if (!map.has(shortName)) {
                    map.set(shortName, longName);
                }
            }
        });
        return map;
    }, [getFilteredPlansForCarriers]);

    const getMetalTagStyles = (name: string): string => {
        const base = 'inline-flex items-center justify-center rounded-lg px-1 py-1 min-w-[20px] text-base font-medium';
        switch (name) {
            case 'Catastrophic':
                return `${base} bg-[#CC6076] text-onlan-white`;
            case 'Bronze':
                return `${base} bg-[#E59A42] text-onlan-white`;
            case 'Silver':
                return `${base} bg-[#A8AFB7] text-onlan-white`;
            case 'Gold':
                return `${base} bg-[#FAE97A] text-[#94832C]`;
            case 'Platinum':
                return `${base} bg-[#8FADCF] text-onlan-white`;
            default:
                return `${base} bg-onlan-lavender text-onlan-blue`;
        }
    };


    // Note: we intentionally do NOT auto-select "all carriers" here.
    // The parent (URL-driven) state decides defaults and passes `currentFilters.carriers`.

    const getFilteredPlansExcluding = useMemo(() => {
        return (excludeMetal?: boolean, excludeMarket?: boolean) => {
            return plans.filter((plan) => {

                if (!excludeMetal && selectedMetal.length > 0 && selectedMetal.length < 5) {
                    const planLevel = plan.level.toLowerCase();
                    const matchesMetal = selectedMetal.some((metal) => planLevel.includes(metal.toLowerCase()));
                    if (!matchesMetal) return false;
                }

                if (!excludeMarket && planMarket.length > 0 && planMarket.length < 2) {
                    const isOnExchange = plan.on_market === true;
                    const isOffExchange = plan.off_market === true;
                    const matchesMarket = planMarket.some((market) => {
                        if (market === 'On-Exchange') return isOnExchange;
                        if (market === 'Off-Exchange') return isOffExchange;
                        return false;
                    });
                    if (!matchesMarket) return false;
                }

                if (selectedCarriers.length > 0 && selectedCarriers.length < carriers.length) {
                    const planCarrierName = plan.carrier.name.trim();
                    const matchesCarrier = selectedCarriers.some((carrier) => {
                        const filterCarrierName = carrier.trim();
                        return planCarrierName.toLowerCase() === filterCarrierName.toLowerCase();
                    });
                    if (!matchesCarrier) return false;
                }

                // Features filter
                if (features.length > 0) {
                    if (features.includes('HSA Eligible') && !plan.hsa_eligible) return false;
                    // If "Specialist Without Referral" filter is selected, only show plans with gated === false (with checkmark)
                    // If filter is not selected, show all plans
                    if (features.includes('Specialist Without Referral') && plan.gated === true) return false;
                }

                // Premium range filter
                if (premiumMin !== undefined || premiumMax !== undefined) {
                    if (!plan.premium) return false;

                    const premiumStr = String(plan.premium).trim();
                    const cleanedPremium = premiumStr.replace(/[^0-9.]/g, '');
                    const planPremium = parseFloat(cleanedPremium);

                    if (isNaN(planPremium)) return false;

                    if (premiumMin !== undefined && planPremium < premiumMin) return false;
                    if (premiumMax !== undefined && planPremium > premiumMax) return false;
                }

                // Deductible range filter
                if (deductibleMin !== undefined || deductibleMax !== undefined) {
                    const planDeductible = plan.deductible_numerical;

                    if (planDeductible === undefined || planDeductible === null || isNaN(planDeductible)) return false;

                    if (deductibleMin !== undefined && planDeductible < deductibleMin) return false;
                    if (deductibleMax !== undefined && planDeductible > deductibleMax) return false;
                }

                // Max out of pocket range filter
                if (maxOutOfPocketMin !== undefined || maxOutOfPocketMax !== undefined) {
                    const planMaxOutOfPocket = plan.max_out_of_pocket_numerical;

                    if (planMaxOutOfPocket === undefined || planMaxOutOfPocket === null || isNaN(planMaxOutOfPocket)) return false;

                    if (maxOutOfPocketMin !== undefined && planMaxOutOfPocket < maxOutOfPocketMin) return false;
                    if (maxOutOfPocketMax !== undefined && planMaxOutOfPocket > maxOutOfPocketMax) return false;
                }

                return true;
            });
        };
    }, [plans, selectedMetal, planMarket, selectedCarriers, features, premiumMin, premiumMax, deductibleMin, deductibleMax, maxOutOfPocketMin, maxOutOfPocketMax, carriers.length]);

    const plansByMetalLevel = useMemo(() => {
        const counts = {
            Bronze: 0,
            Silver: 0,
            Gold: 0,
            Platinum: 0,
            Catastrophic: 0,
        };

        const filteredPlans = getFilteredPlansExcluding(true, false);

        filteredPlans.forEach((plan) => {
            const level = plan.level.toLowerCase();
            if (level.includes('bronze')) counts.Bronze++;
            else if (level.includes('silver')) counts.Silver++;
            else if (level.includes('gold')) counts.Gold++;
            else if (level.includes('platinum')) counts.Platinum++;
            else if (level.includes('catastrophic')) counts.Catastrophic++;
        });

        return counts;
    }, [getFilteredPlansExcluding]);

    const plansForRangeCalculation = useMemo(() => {
        return plans.filter((plan) => {
            if (selectedMetal.length > 0 && selectedMetal.length < 5) {
                const planLevel = plan.level.toLowerCase();
                const matchesMetal = selectedMetal.some((metal) => planLevel.includes(metal.toLowerCase()));
                if (!matchesMetal) return false;
            }

            if (planMarket.length > 0 && planMarket.length < 2) {
                const isOnExchange = plan.on_market === true;
                const isOffExchange = plan.off_market === true;
                const matchesMarket = planMarket.some((market) => {
                    if (market === 'On-Exchange') return isOnExchange;
                    if (market === 'Off-Exchange') return isOffExchange;
                    return false;
                });
                if (!matchesMarket) return false;
            }

            if (selectedCarriers.length > 0 && selectedCarriers.length < carriers.length) {
                const planCarrierName = plan.carrier.name.trim();
                const matchesCarrier = selectedCarriers.some((carrier) => {
                    const filterCarrierName = carrier.trim();
                    return planCarrierName.toLowerCase() === filterCarrierName.toLowerCase();
                });
                if (!matchesCarrier) return false;
            }
                if (features.length > 0) {
                    if (features.includes('HSA Eligible') && !plan.hsa_eligible) return false;

                    if (features.includes('Specialist Without Referral') && plan.gated) return false;
                }

            return true;
        });
    }, [plans, selectedMetal, planMarket, selectedCarriers, features, carriers.length]);

    // Calculate min/max values for placeholders
    const rangeValues = useMemo(() => {
        const parsePremium = (premium: string | undefined): number | null => {
            if (!premium) return null;
            const premiumStr = String(premium).trim();
            const cleanedPremium = premiumStr.replace(/[^0-9.]/g, '');
            const planPremium = parseFloat(cleanedPremium);
            return isNaN(planPremium) ? null : planPremium;
        };

        const premiums = plansForRangeCalculation
            .map((p) => parsePremium(p.premium))
            .filter((p): p is number => p !== null);

        const deductibles = plansForRangeCalculation
            .map((p) => p.deductible_numerical)
            .filter((d): d is number => d !== undefined && d !== null && !isNaN(d));

        const maxOutOfPockets = plansForRangeCalculation
            .map((p) => p.max_out_of_pocket_numerical)
            .filter((m): m is number => m !== undefined && m !== null && !isNaN(m));

        return {
            premiumMin: premiums.length > 0 ? Math.min(...premiums) : 0,
            premiumMax: premiums.length > 0 ? Math.max(...premiums) : 0,
            deductibleMin: deductibles.length > 0 ? Math.min(...deductibles) : 0,
            deductibleMax: deductibles.length > 0 ? Math.max(...deductibles) : 0,
            maxOutOfPocketMin: maxOutOfPockets.length > 0 ? Math.min(...maxOutOfPockets) : 0,
            maxOutOfPocketMax: maxOutOfPockets.length > 0 ? Math.max(...maxOutOfPockets) : 0,
        };
    }, [plansForRangeCalculation]);

    const toggle = (list: string[], v: string, setter: (v: string[]) => void) => {
        const newList = list.includes(v) ? list.filter((x) => x !== v) : [...list, v];
        // Prevent "empty selection" for carriers: treat clearing all as "reset to default (all available)".
        if (list === selectedCarriers && newList.length === 0) {
            const fallback = carriers.length > 0 ? [...carriers] : [];
            setter(fallback);
            userClearedAllCarriersRef.current = false;
            return;
        }

        setter(newList);
        // Track if user explicitly cleared all carriers
        if (list === selectedCarriers) {
            if (newList.length === 0) {
                userClearedAllCarriersRef.current = true;
            } else if (newList.length > 0) {
                userClearedAllCarriersRef.current = false;
            }
        }
    };

    const handleCarrierToggle = (carrier: string) => {
        const scrollY = window.scrollY;
        const scrollX = window.scrollX;
        toggle(selectedCarriers, carrier, setSelectedCarriers);

        const restoreScroll = () => {
            window.scrollTo(scrollX, scrollY);
        };


        requestAnimationFrame(() => {
            restoreScroll();
            requestAnimationFrame(() => {
                restoreScroll();
                setTimeout(() => {
                    restoreScroll();
                }, 0);
            });
        });
    };

    const normalizeFilters = (f: {
        metal: string[];
        planMarket: string[];
        enrollment: string[];
        carriers: string[];
        features: string[];
        premiumMin?: number;
        premiumMax?: number;
        deductibleMin?: number;
        deductibleMax?: number;
        maxOutOfPocketMin?: number;
        maxOutOfPocketMax?: number;
    }) => {
        return JSON.stringify({
            metal: [...f.metal].sort(),
            planMarket: [...f.planMarket].sort(),
            enrollment: [...f.enrollment].sort(),
            carriers: [...f.carriers].sort(),
            features: [...f.features].sort(),
            premiumMin: f.premiumMin ?? null,
            premiumMax: f.premiumMax ?? null,
            deductibleMin: f.deductibleMin ?? null,
            deductibleMax: f.deductibleMax ?? null,
            maxOutOfPocketMin: f.maxOutOfPocketMin ?? null,
            maxOutOfPocketMax: f.maxOutOfPocketMax ?? null,
        });
    };


    useEffect(() => {
        if (currentFilters) {
            const currentFiltersStr = normalizeFilters(currentFilters);
            if (prevFiltersRef.current !== currentFiltersStr) {
                prevFiltersRef.current = currentFiltersStr;
                isUpdatingFromSyncRef.current = true;

                // Always sync all filters from currentFilters to ensure consistency
                setSelectedMetal([...currentFilters.metal]);
                setPlanMarket([...currentFilters.planMarket]);
                setEnrollment([...currentFilters.enrollment]);

                // For carriers, respect user's choice if they cleared all
                setSelectedCarriers(prev => {
                    // If user cleared all carriers, don't force them back from URL
                    if (prev.length === 0 && currentFilters.carriers.length > 0 && userClearedAllCarriersRef.current) {
                        return prev; // Keep user's choice
                    }
                    return [...currentFilters.carriers];
                });

                setFeatures([...currentFilters.features]);
                setPremiumMin(currentFilters.premiumMin);
                setPremiumMax(currentFilters.premiumMax);
                setDeductibleMin(currentFilters.deductibleMin);
                setDeductibleMax(currentFilters.deductibleMax);
                setMaxOutOfPocketMin(currentFilters.maxOutOfPocketMin);
                setMaxOutOfPocketMax(currentFilters.maxOutOfPocketMax);
            }
        }
    }, [currentFilters]);

    // Update filters when state changes (only when changed internally)
    useEffect(() => {
        const currentFiltersState = normalizeFilters({
            metal: selectedMetal,
            planMarket,
            enrollment,
            carriers: selectedCarriers,
            features,
            premiumMin,
            premiumMax,
            deductibleMin,
            deductibleMax,
            maxOutOfPocketMin,
            maxOutOfPocketMax,
        });

        // Skip if we're updating from sync to avoid loops
        if (isUpdatingFromSyncRef.current) {
            isUpdatingFromSyncRef.current = false;
            // Update prevFiltersStateRef to match what we just synced to prevent desync
            prevFiltersStateRef.current = currentFiltersState;
            return;
        }

        // Skip the first run: initial state hydration should not be treated as a user action.
        if (!hasMountedRef.current) {
            hasMountedRef.current = true;
            prevFiltersStateRef.current = currentFiltersState;
            return;
        }
        
        // Only call onFiltersChange if filters actually changed
        if (prevFiltersStateRef.current !== currentFiltersState) {
            prevFiltersStateRef.current = currentFiltersState;
        onFiltersChange?.({
                metal: [...selectedMetal],
                planMarket: [...planMarket],
                enrollment: [...enrollment],
                carriers: [...selectedCarriers],
                features: [...features],
            premiumMin,
            premiumMax,
            deductibleMin,
            deductibleMax,
            maxOutOfPocketMin,
            maxOutOfPocketMax,
        });
        }
    }, [selectedMetal, planMarket, enrollment, selectedCarriers, features, premiumMin, premiumMax, deductibleMin, deductibleMax, maxOutOfPocketMin, maxOutOfPocketMax, onFiltersChange]);



    return (
        <aside className={`${isModal ? 'w-full' : 'sticky top-25 flex w-full flex-col md:max-w-[254px] md:min-w-[254px] lg:max-w-[443px] lg:min-w-[300px]'}`}>
            {beforeChild}
            <div className={`mt-0 ${isModal ? 'bg-onlan-white px-4 py-2' : 'rounded-2xl bg-onlan-white ring-1 ring-onlan-lavender sm:px-6 sm:py-4'}`}>
                {!isModal && (
                    <div className="mb-3 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <Image src={FilterIcon} alt="Filters" width={20} height={20} />
                            <h3 className="text-lg font-semibold text-onlan-black">Filters</h3>
                        </div>
                        <Elements.Button
                            type="button"
                            variant="default"
                            size="sm"
                            onClick={() => {
                                // Reset all filters to default values
                                setSelectedMetal(['Catastrophic', 'Bronze', 'Silver', 'Gold', 'Platinum']);
                                setPlanMarket(['On-Exchange', 'Off-Exchange']);
                                // Reset carriers to default (all selected) - set to all available carriers
                                const allCarriers = carriers.length > 0 ? [...carriers] : [];
                                setSelectedCarriers(allCarriers);
                                setFeatures([]);
                                setPremiumMin(undefined);
                                setPremiumMax(undefined);
                                setDeductibleMin(undefined);
                                setDeductibleMax(undefined);
                                setMaxOutOfPocketMin(undefined);
                                setMaxOutOfPocketMax(undefined);
                                // Reset flags
                                userClearedAllCarriersRef.current = false;
                            }}
                            className="flex items-center gap-2 max-w-[100px] w-full bg-transparent border border-onlan-lavender text-[#8D939A] shrink-0 hover:bg-onlan-white"
                            aria-label="Reset Filters"
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.00052 8.93337L4.73385 12.2C4.61163 12.3223 4.45608 12.3834 4.26719 12.3834C4.0783 12.3834 3.92274 12.3223 3.80052 12.2C3.6783 12.0778 3.61719 11.9223 3.61719 11.7334C3.61719 11.5445 3.6783 11.3889 3.80052 11.2667L7.06719 8.00003L3.80052 4.73337C3.6783 4.61114 3.61719 4.45559 3.61719 4.2667C3.61719 4.07781 3.6783 3.92225 3.80052 3.80003C3.92274 3.67781 4.0783 3.6167 4.26719 3.6167C4.45608 3.6167 4.61163 3.67781 4.73385 3.80003L8.00052 7.0667L11.2672 3.80003C11.3894 3.67781 11.545 3.6167 11.7339 3.6167C11.9227 3.6167 12.0783 3.67781 12.2005 3.80003C12.3227 3.92225 12.3839 4.07781 12.3839 4.2667C12.3839 4.45559 12.3227 4.61114 12.2005 4.73337L8.93385 8.00003L12.2005 11.2667C12.3227 11.3889 12.3839 11.5445 12.3839 11.7334C12.3839 11.9223 12.3227 12.0778 12.2005 12.2C12.0783 12.3223 11.9227 12.3834 11.7339 12.3834C11.545 12.3834 11.3894 12.3223 11.2672 12.2L8.00052 8.93337Z" fill="#8D939A"/>
                            </svg>
                            <span>Reset</span>
                        </Elements.Button>
                    </div>
                )}

                {/* Desktop View */}
                <div className="flex flex-col gap-4">
                    {/* Metal level */}
                    <section className="bg-onlan-white rounded-2xl">
                        <div className="flex w-full items-center justify-between">
                            <h4 className="mb-3 text-lg font-semibold text-onlan-black">
                            <span className="inline-flex items-center gap-1">
                                    Metal Level{' '}
                                <Tooltip variant="secondary" position="top">
                                    Indicates how costs are shared between you and the insurance plan. Bronze plans have
                                    lower monthly premiums but higher out-of-pocket costs; Gold and Platinum have higher
                                    premiums but lower costs when you receive care.
                                </Tooltip>
                            </span>
                            </h4>
                        </div>
                        <div className="pt-1 flex flex-col gap-1 md:gap-1">
                            {metal.map((m) => {
                                const isHovered = hoveredMetal === m;
                                const allMetal = ['Catastrophic', 'Bronze', 'Silver', 'Gold', 'Platinum'];
                                
                                const handleOnlyClick = (e: React.MouseEvent) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    // If only this metal is selected, reset to default (all metal)
                                    if (selectedMetal.length === 1 && selectedMetal.includes(m)) {
                                        setSelectedMetal(allMetal);
                                    } else {
                                        // Select only this metal, uncheck all others
                                        setSelectedMetal([m]);
                                    }
                                };
                                
                                const handleRowClick = () => {
                                    // If only this metal is selected, reset to default (all metal)
                                    if (selectedMetal.length === 1 && selectedMetal.includes(m)) {
                                        setSelectedMetal(allMetal);
                                    } else {
                                        // Select only this metal, uncheck all others
                                        setSelectedMetal([m]);
                                    }
                                };
                                
                                return (
                                    <div
                                        key={m}
                                        className="w-full relative group"
                                        onMouseEnter={() => setHoveredMetal(m)}
                                        onMouseLeave={() => setHoveredMetal(null)}
                                    >
                                        <div 
                                            className="flex items-center cursor-pointer min-h-[30px] gap-5"
                                            onClick={(e) => {
                                                // Only handle row click if not clicking on checkbox or button
                                                const target = e.target as HTMLElement;
                                                if (!target.closest('button') && !target.closest('input[type="checkbox"]')) {
                                                    handleRowClick();
                                                }
                                            }}
                                        >
                                            <div className="flex items-center gap-2.5">
                                            <SquareCheckBoxToggle
                                    label={m}
                                    selected={selectedMetal.includes(m)}
                                                    onToggle={(e) => {
                                                        e?.preventDefault();
                                                        e?.stopPropagation();
                                                        toggle(selectedMetal, m, setSelectedMetal);
                                                    }}
                                    variant="blue"
                                            />
                                            <span className={getMetalTagStyles(m)}>
                                                {plansByMetalLevel[m as keyof typeof plansByMetalLevel]}
                                            </span>
                                            </div>
                                            {isHovered && (
                                                <button
                                                    type="button"
                                                    onClick={handleOnlyClick}
                                                    className="flex items-center justify-center px-3 py-1 text-sm font-medium rounded-full bg-onlan-white text-onlan-blue hover:bg-onlan-blue hover:text-onlan-white transition-colors shrink-0"
                                                    style={{ fontSize: '14px', borderRadius: '24px' }}
                                                >
                                                    Only
                                                </button>
                                            )}
                                        </div>
                            </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* Plan Market */}
                    <section className="bg-onlan-white rounded-2xl">
                        <div className="flex w-full items-center justify-between">
                            <h4 className="mb-3 text-lg font-semibold text-onlan-black">Plan Market</h4>
                        </div>
                        <div className="pt-1 flex flex-col gap-1 md:gap-1 items-start">
                            {['On-Exchange', 'Off-Exchange'].map((t) => {
                                const isHovered = hoveredPlanMarket === t;
                                const allPlanMarkets = ['On-Exchange', 'Off-Exchange'];
                                
                                const handleOnlyClick = (e: React.MouseEvent) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    // If only this plan market is selected, reset to default (all plan markets)
                                    if (planMarket.length === 1 && planMarket.includes(t)) {
                                        setPlanMarket(allPlanMarkets);
                                    } else {
                                        // Select only this plan market, uncheck all others
                                        setPlanMarket([t]);
                                    }
                                };
                                
                                const handleRowClick = () => {
                                    // If only this plan market is selected, reset to default (all plan markets)
                                    if (planMarket.length === 1 && planMarket.includes(t)) {
                                        setPlanMarket(allPlanMarkets);
                                    } else {
                                        // Select only this plan market, uncheck all others
                                        setPlanMarket([t]);
                                    }
                                };
                                
                                return (
                                    <div
                                        key={t}
                                        className="w-full relative group"
                                        onMouseEnter={() => setHoveredPlanMarket(t)}
                                        onMouseLeave={() => setHoveredPlanMarket(null)}
                                    >
                                        <div 
                                            className="flex items-center cursor-pointer min-h-[30px] gap-5"
                                            onClick={(e) => {
                                                // Only handle row click if not clicking on checkbox or button
                                                const target = e.target as HTMLElement;
                                                if (!target.closest('button') && !target.closest('input[type="checkbox"]')) {
                                                    handleRowClick();
                                                }
                                            }}
                                        >
                                <SquareCheckBoxToggle
                                    label={t}
                                    selected={planMarket.includes(t)}
                                                onToggle={(e) => {
                                                    e?.preventDefault();
                                                    e?.stopPropagation();
                                                    toggle(planMarket, t, setPlanMarket);
                                                }}
                                    variant="blue"
                                />
                                            {isHovered && (
                                                <button
                                                    type="button"
                                                    onClick={handleOnlyClick}
                                                    className="flex items-center justify-center px-3 py-1 text-sm font-medium rounded-full bg-onlan-white text-onlan-blue hover:bg-onlan-blue hover:text-onlan-white transition-colors shrink-0"
                                                    style={{ fontSize: '14px', borderRadius: '24px' }}
                                                >
                                                    Only
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* Carriers */}
                    <section className="bg-onlan-white rounded-2xl">
                        <div className="flex w-full items-center justify-between">
                            <h4 className="mb-3 text-lg font-semibold text-onlan-black">Carriers</h4>
                        </div>
                        <div className="pt-1 flex flex-col gap-1 md:gap-1 items-start">
                            {carriers.map((c) => {
                                const longName = carrierLongNames.get(c) || c;
                                const isHovered = hoveredCarrier === c;
                                
                                const handleOnlyClick = (e: React.MouseEvent) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    // If only this carrier is selected, reset to default (all carriers)
                                    if (selectedCarriers.length === 1 && selectedCarriers.includes(c)) {
                                        setSelectedCarriers(carriers);
                                        userClearedAllCarriersRef.current = false;
                                    } else {
                                        // Select only this carrier, uncheck all others
                                        setSelectedCarriers([c]);
                                        userClearedAllCarriersRef.current = false;
                                    }
                                };
                                
                                const handleRowClick = () => {
                                    // If only this carrier is selected, reset to default (all carriers)
                                    if (selectedCarriers.length === 1 && selectedCarriers.includes(c)) {
                                        setSelectedCarriers(carriers);
                                        userClearedAllCarriersRef.current = false;
                                    } else {
                                        // Select only this carrier, uncheck all others
                                        setSelectedCarriers([c]);
                                        userClearedAllCarriersRef.current = false;
                                    }
                                };
                                
                                return (
                                    <div
                                        key={c}
                                        className="w-full relative group"
                                        onMouseEnter={() => setHoveredCarrier(c)}
                                        onMouseLeave={() => setHoveredCarrier(null)}
                                    >
                                        <div 
                                            className="flex items-center cursor-pointer min-h-[30px] gap-5"
                                            onClick={(e) => {
                                                // Only handle row click if not clicking on checkbox or button
                                                const target = e.target as HTMLElement;
                                                if (!target.closest('button') && !target.closest('input[type="checkbox"]')) {
                                                    handleRowClick();
                                                }
                                            }}
                                        >
                                <SquareCheckBoxToggle
                                    label={c}
                                        title={longName !== c ? longName : undefined}
                                    selected={selectedCarriers.includes(c)}
                                                onToggle={(e) => {
                                                    e?.preventDefault();
                                                    e?.stopPropagation();
                                                    handleCarrierToggle(c);
                                                }}
                                    variant="blue"
                                />
                                            {isHovered && (
                                                <button
                                                    type="button"
                                                    onClick={handleOnlyClick}
                                                    className="flex items-center justify-center px-3 py-1 text-sm font-medium rounded-full bg-onlan-white text-onlan-blue hover:bg-onlan-blue hover:text-onlan-white transition-colors shrink-0"
                                                    style={{ fontSize: '14px', borderRadius: '24px' }}
                                                >
                                                    Only
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* Features */}
                    <section className="bg-onlan-white rounded-2xl">
                        <div className="flex w-full items-center justify-between">
                            <h4 className="mb-3 text-lg font-semibold text-onlan-black">Features</h4>
                        </div>
                        <div className="pt-1 flex flex-col gap-3 items-start">
                            {['HSA Eligible', 'Specialist Without Referral'].map((f) => {
                                // Disable "HSA Eligible" when only Platinum is selected
                                const isHSAEligible = f === 'HSA Eligible';
                                const isOnlyPlatinum = selectedMetal.length === 1 && selectedMetal.includes('Platinum');
                                const isDisabled = isHSAEligible && isOnlyPlatinum;
                                
                                return (
                                    <SquareCheckBoxToggle
                                        key={f}
                                        label={f}
                                        selected={features.includes(f)}
                                        onToggle={() => toggle(features, f, setFeatures)}
                                        variant="blue"
                                        disabled={isDisabled}
                                    />
                                );
                            })}
                        </div>
                    </section>

                    {/* Monthly Premium */}
                    <section className="bg-onlan-white rounded-2xl">
                        <div className="flex w-full items-center justify-between">
                            <h4 className="mb-3 text-lg font-semibold text-onlan-black">
                                <span className="inline-flex items-center gap-1">
                                    Monthly Premium{' '}
                                    <Tooltip variant="secondary" position="top">
                                        Filters plans by your estimated monthly premium
                                    </Tooltip>
                                </span>
                            </h4>
                        </div>
                        <div className="pt-1">
                            <RangeInputs
                                prefix="$"
                                showLabels={true}
                                labelMin="min"
                                labelMax="max"
                                min={premiumMin ?? 0}
                                max={premiumMax ?? 0}
                                placeholderMin={rangeValues.premiumMin > 0 ? formatNumber(rangeValues.premiumMin) : "0"}
                                placeholderMax={rangeValues.premiumMax > 0 ? formatNumber(rangeValues.premiumMax) : "0"}
                                onRangeChange={(min, max) => {
                                    setPremiumMin(min && min > 0 ? min : undefined);
                                    setPremiumMax(max && max > 0 ? max : undefined);
                                }}
                                className="w-full"
                            />
                        </div>
                    </section>
                    

                    {/* Deductible */}
                    <section className="bg-onlan-white rounded-2xl">
                        <div className="flex w-full items-center justify-between">
                            <h4 className="mb-3 text-lg font-semibold text-onlan-black">
                            <span className="inline-flex items-center gap-1">
                                Deductible{' '}
                                <Tooltip variant="secondary" position="top">
                                    The amount you pay out of pocket for covered services before the plan starts paying
                                    its share.
                                </Tooltip>
                            </span>
                            </h4>
                        </div>
                        <div className="pt-1">
                        <RangeInputs
                            showLabels={true}
                            labelMin="min"
                            labelMax="max"
                            min={deductibleMin ?? 0}
                            max={deductibleMax ?? 0}
                                placeholderMin={rangeValues.deductibleMin > 0 ? formatNumber(rangeValues.deductibleMin) : "0"}
                                placeholderMax={rangeValues.deductibleMax > 0 ? formatNumber(rangeValues.deductibleMax) : "0"}
                            prefix="$"
                            className="w-full"
                            onRangeChange={(min, max) => {
                                setDeductibleMin(min && min > 0 ? min : undefined);
                                setDeductibleMax(max && max > 0 ? max : undefined);
                            }}
                        />
                        </div>
                    </section>

                    

                    {/* Max-out-of-pocket */}
                    <section className="bg-onlan-white rounded-2xl">
                        <div className="flex w-full items-center justify-between">
                            <h4 className="mb-3 text-lg font-semibold text-onlan-black">
                                <span className="inline-flex items-center gap-1">
                                    Max Out-Of-Pocket{' '}
                                    <Tooltip variant="secondary" position="top">
                                        The maximum amount you pay out of pocket for covered services in a plan year.
                                    </Tooltip>
                                </span>
                            </h4>
                        </div>
                        <div className="pt-1">
                            <RangeInputs
                                showLabels={true}
                                labelMin="min"
                                labelMax="max"
                                min={maxOutOfPocketMin ?? 0}
                                max={maxOutOfPocketMax ?? 0}
                                placeholderMin={rangeValues.maxOutOfPocketMin > 0 ? formatNumber(rangeValues.maxOutOfPocketMin) : "0"}
                                placeholderMax={rangeValues.maxOutOfPocketMax > 0 ? formatNumber(rangeValues.maxOutOfPocketMax) : "0"}
                                prefix="$"
                                className="w-full"
                                onRangeChange={(min, max) => {
                                    setMaxOutOfPocketMin(min && min > 0 ? min : undefined);
                                    setMaxOutOfPocketMax(max && max > 0 ? max : undefined);
                                }}
                            />
                        </div>
                    </section>

                </div>
            </div>
        </aside>
    );
};
