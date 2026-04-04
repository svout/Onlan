export const CORE_VALUES = [
    {
        title: 'Partner First',
        description: 'Your brand, your clients, your success',
    },
    {
        title: 'Transparency',
        description: 'Clear pricing, honest communication',
    },
    {
        title: 'Innovation',
        description: 'Staying ahead of the evolving market',
    },
    {
        title: 'Collaboration',
        description: 'We succeed when you succeed',
    },
    {
        title: 'Accessibility',
        description: 'Technology for all sizes, not just giants',
    },
    {
        title: 'Excellence',
        description: 'Enterprise-grade with exceptional support',
    },
];

import JacobImage from '@/assets/images/Jacob.webp';
import RossImage from '@/assets/images/Ross.webp';
import AndrewImage from '@/assets/images/Andrew.webp';

export type USStateAbbreviation =
    | 'AL'
    | 'AK'
    | 'AZ'
    | 'AR'
    | 'CA'
    | 'CO'
    | 'CT'
    | 'DE'
    | 'FL'
    | 'GA'
    | 'HI'
    | 'ID'
    | 'IL'
    | 'IN'
    | 'IA'
    | 'KS'
    | 'KY'
    | 'LA'
    | 'ME'
    | 'MD'
    | 'MA'
    | 'MI'
    | 'MN'
    | 'MS'
    | 'MO'
    | 'MT'
    | 'NE'
    | 'NV'
    | 'NH'
    | 'NJ'
    | 'NM'
    | 'NY'
    | 'NC'
    | 'ND'
    | 'OH'
    | 'OK'
    | 'OR'
    | 'PA'
    | 'RI'
    | 'SC'
    | 'SD'
    | 'TN'
    | 'TX'
    | 'UT'
    | 'VT'
    | 'VA'
    | 'WA'
    | 'WV'
    | 'WI'
    | 'WY'
    | 'DC';


export const US_STATE_ABBREVIATIONS = [
    'AL',
    'AK',
    'AZ',
    'AR',
    'CA',
    'CO',
    'CT',
    'DE',
    'FL',
    'GA',
    'HI',
    'ID',
    'IL',
    'IN',
    'IA',
    'KS',
    'KY',
    'LA',
    'ME',
    'MD',
    'MA',
    'MI',
    'MN',
    'MS',
    'MO',
    'MT',
    'NE',
    'NV',
    'NH',
    'NJ',
    'NM',
    'NY',
    'NC',
    'ND',
    'OH',
    'OK',
    'OR',
    'PA',
    'RI',
    'SC',
    'SD',
    'TN',
    'TX',
    'UT',
    'VT',
    'VA',
    'WA',
    'WV',
    'WI',
    'WY',
    'DC',
] as const;

export const USStateNames: Record<USStateAbbreviation, string> = {
    AL: 'Alabama',
    AK: 'Alaska',
    AZ: 'Arizona',
    AR: 'Arkansas',
    CA: 'California',
    CO: 'Colorado',
    CT: 'Connecticut',
    DE: 'Delaware',
    FL: 'Florida',
    GA: 'Georgia',
    HI: 'Hawaii',
    ID: 'Idaho',
    IL: 'Illinois',
    IN: 'Indiana',
    IA: 'Iowa',
    KS: 'Kansas',
    KY: 'Kentucky',
    LA: 'Louisiana',
    ME: 'Maine',
    MD: 'Maryland',
    MA: 'Massachusetts',
    MI: 'Michigan',
    MN: 'Minnesota',
    MS: 'Mississippi',
    MO: 'Missouri',
    MT: 'Montana',
    NE: 'Nebraska',
    NV: 'Nevada',
    NH: 'New Hampshire',
    NJ: 'New Jersey',
    NM: 'New Mexico',
    NY: 'New York',
    NC: 'North Carolina',
    ND: 'North Dakota',
    OH: 'Ohio',
    OK: 'Oklahoma',
    OR: 'Oregon',
    PA: 'Pennsylvania',
    RI: 'Rhode Island',
    SC: 'South Carolina',
    SD: 'South Dakota',
    TN: 'Tennessee',
    TX: 'Texas',
    UT: 'Utah',
    VT: 'Vermont',
    VA: 'Virginia',
    WA: 'Washington',
    WV: 'West Virginia',
    WI: 'Wisconsin',
    WY: 'Wyoming',
    DC: 'Washington DC',
};

export interface IUSState {
    name: string;
    abbreviation: USStateAbbreviation;
}
export const usStates: IUSState[] = [
    { name: 'ALABAMA', abbreviation: 'AL' },
    { name: 'ALASKA', abbreviation: 'AK' },
    { name: 'ARIZONA', abbreviation: 'AZ' },
    { name: 'ARKANSAS', abbreviation: 'AR' },
    { name: 'CALIFORNIA', abbreviation: 'CA' },
    { name: 'COLORADO', abbreviation: 'CO' },
    { name: 'CONNECTICUT', abbreviation: 'CT' },
    { name: 'DELAWARE', abbreviation: 'DE' },
    { name: 'Washington DC', abbreviation: 'DC' },
    { name: 'FLORIDA', abbreviation: 'FL' },
    { name: 'GEORGIA', abbreviation: 'GA' },
    { name: 'HAWAII', abbreviation: 'HI' },
    { name: 'IDAHO', abbreviation: 'ID' },
    { name: 'ILLINOIS', abbreviation: 'IL' },
    { name: 'INDIANA', abbreviation: 'IN' },
    { name: 'IOWA', abbreviation: 'IA' },
    { name: 'KANSAS', abbreviation: 'KS' },
    { name: 'KENTUCKY', abbreviation: 'KY' },
    { name: 'LOUISIANA', abbreviation: 'LA' },
    { name: 'MAINE', abbreviation: 'ME' },
    { name: 'MARYLAND', abbreviation: 'MD' },
    { name: 'MASSACHUSETTS', abbreviation: 'MA' },
    { name: 'MICHIGAN', abbreviation: 'MI' },
    { name: 'MINNESOTA', abbreviation: 'MN' },
    { name: 'MISSISSIPPI', abbreviation: 'MS' },
    { name: 'MISSOURI', abbreviation: 'MO' },
    { name: 'MONTANA', abbreviation: 'MT' },
    { name: 'NEBRASKA', abbreviation: 'NE' },
    { name: 'NEVADA', abbreviation: 'NV' },
    { name: 'NEW HAMPSHIRE', abbreviation: 'NH' },
    { name: 'NEW JERSEY', abbreviation: 'NJ' },
    { name: 'NEW MEXICO', abbreviation: 'NM' },
    { name: 'NEW YORK', abbreviation: 'NY' },
    { name: 'NORTH CAROLINA', abbreviation: 'NC' },
    { name: 'NORTH DAKOTA', abbreviation: 'ND' },
    { name: 'OHIO', abbreviation: 'OH' },
    { name: 'OKLAHOMA', abbreviation: 'OK' },
    { name: 'OREGON', abbreviation: 'OR' },
    { name: 'PENNSYLVANIA', abbreviation: 'PA' },
    { name: 'RHODE ISLAND', abbreviation: 'RI' },
    { name: 'SOUTH CAROLINA', abbreviation: 'SC' },
    { name: 'SOUTH DAKOTA', abbreviation: 'SD' },
    { name: 'TENNESSEE', abbreviation: 'TN' },
    { name: 'TEXAS', abbreviation: 'TX' },
    { name: 'UTAH', abbreviation: 'UT' },
    { name: 'VERMONT', abbreviation: 'VT' },
    { name: 'VIRGINIA', abbreviation: 'VA' },
    { name: 'WASHINGTON', abbreviation: 'WA' },
    { name: 'WEST VIRGINIA', abbreviation: 'WV' },
    { name: 'WISCONSIN', abbreviation: 'WI' },
    { name: 'WYOMING', abbreviation: 'WY' },
];

export const FOUNDING_TEAM = [
    {
        name: 'Jacob Sheridan',
        title: 'CEO & Co-Founder',
        description:
            '15 years in healthcare and software; previously Founder & CEO of TPA Stream, a SaaS platform for TPAs to integrate billing, claims, and enrollment to drive revenue growth.',
        image: JacobImage,
        linkedin: 'https://www.linkedin.com/in/jacobsheridan/',
       
    },
    {
        name: 'Ross Honig',
        title: 'COO & Co-Founder',
        description:
            '20 years in benefits, owner of 2 TPAs (east and west coast), early adopter of ICHRA (2021), active industry leader in NABIP and NAPBA. ',
        image: RossImage,
        linkedin: 'https://www.linkedin.com/in/rosshonig/',
       
    },
    {
        name: 'Andrew Spott',
        title: 'CTO, CMO & Co-Founder',
        description:
            '20 years leading design, development, strategy, marketing and revenue; previously Founder & CEO of VividFront, a 4x Inc 5000 Fastest Growing Company & 7x Top 99 Employer.',
        image: AndrewImage,
        linkedin: 'https://www.linkedin.com/in/andrewspott/',
    },
];