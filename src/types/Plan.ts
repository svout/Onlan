export type CTA =
    | { kind: 'sign-in'; secondary?: boolean; label?: string; showDetails?: boolean }
    | { kind: 'choose'; label?: string; showDetails?: boolean; action?: (a: any) => void }
    | { kind: 'none'; showDetails?: boolean };

/**
 * Medical plan row for compare cards, filters, and modals (rates API shape).
 * Kept loose so UI code can read dynamic fields without coupling to a removed widget module.
 */
export type PlanWithAgePremiums = Record<string, any> & { id: string };
