// src/types/Plan.ts
export interface FullPlan {
    id: string;
    name: string;
    display_name: string;

    type: string;
    level: string;
    plan_type: string;
    effective_date: string;
    expiration_date: string;
    on_market: boolean;
    off_market: boolean;

    premium: string;

    carrier: {
        id: string;
        name: string; // short name
        name_long?: string; // full name
        issuer_id: string;
        logo_url?: string | null;
    };

    identifiers: {
        type: string; // "hios_id"
        value: string; // "49046GA0700010"
    }[];

    benefits_summary_url: string | null;
    drug_formulary_url: string | null;
    network_provider_directory_url: string | null;
    predictable_benefits_plan_url: string | null;

    individual_medical_deductible: string;
    family_medical_deductible: string;
    individual_medical_moop: string;
    family_medical_moop: string;

    deductible_numerical: number;
    max_out_of_pocket_numerical: number;

    preventitive_numerical: number;
    primary_care_numerical: number;
    specelist_numerical: number;
    emergency_numerical: number;
    urgent_care_numerical: number;

    telemedicine: string | null;
    telemedicine_eligible: boolean;

    gated: boolean;
    hsa_eligible: boolean;
}
