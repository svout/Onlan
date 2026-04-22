/** Copy and structure for «Наша команда» on the About Us page */

export type AboutUsTeamPhotoKey = 'girl' | 'men';

export type AboutUsTeamMember = {
    name: string;
    role: string;
    photo: AboutUsTeamPhotoKey;
    /** LinkedIn or інший профіль для кнопки у куті картки */
    profileHref: string;
};

export const ABOUT_US_TEAM_SECTION = {
    eyebrow: 'Наша команда',
    heading: 'Ключові експерти ONLAN',
} as const;

export const ABOUT_US_TEAM: AboutUsTeamMember[] = [
    {
        name: 'Євген',
        role: 'CEO, 15+ років у логістиці',
        photo: 'men',
        profileHref: 'https://www.linkedin.com/',
    },
    {
        name: 'Марина',
        role: 'Директор з митного оформлення',
        photo: 'girl',
        profileHref: 'https://www.linkedin.com/',
    },
    {
        name: 'Олег',
        role: 'Керівник відділу',
        photo: 'men',
        profileHref: 'https://www.linkedin.com/',
    },
    {
        name: 'Юлія',
        role: 'Head of Customer Success',
        photo: 'girl',
        profileHref: 'https://www.linkedin.com/',
    },
];
