// Safari tabs + projects. Every project has a stable id (tabId-brand) so
// case studies in `caseStudies.js` can attach to specific project instances
// (e.g. Manyavar exists in multiple tabs and can carry different case studies).

import { CASE_STUDIES } from "./caseStudies";

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const project = (tabId, brand, extra = {}) => {
    const id = `${tabId}-${slug(brand)}`;
    const caseStudy = CASE_STUDIES[id] ?? null;
    return {
        id,
        brand,
        tabId,
        title: caseStudy?.campaignTitle
            ? `${brand}, ${caseStudy.campaignTitle}: Case Study`
            : `${brand}: Case Study`,
        url: `www.tanisha.work/case/${id}`,
        snippet:
            caseStudy?.tagline ||
            extra.snippet ||
            `A short placeholder description of the ${brand} project. Replace this with the real case study summary, the key idea, the ask, and the outcome.`,
        isPlaceholder: !caseStudy,
        caseStudy,
    };
};

export const SAFARI_TABS = [
    {
        id: "influencer",
        title: "Influencer Marketing",
        favicon: "megaphone",
        projects: [
            project("influencer", "Bajaj Allianz"),
            project("influencer", "Sensodyne"),
            project("influencer", "Manyavar"),
            project("influencer", "MyFi"),
            project("influencer", "Cycle Agarbatti"),
        ],
    },
    {
        id: "ad-films",
        title: "Ad Films",
        favicon: "film",
        projects: [
            project("ad-films", "Zeebu"),
            project("ad-films", "Kevinters"),
            project("ad-films", "Smartsters"),
            project("ad-films", "Olio Pizza"),
            project("ad-films", "Airbound"),
            project("ad-films", "One8"),
            project("ad-films", "CashKaro"),
            project("ad-films", "Meesho"),
        ],
    },
    {
        id: "social-media",
        title: "Social Media",
        favicon: "hash",
        projects: [
            project("social-media", "MyFi"),
            project("social-media", "Shopsy"),
            project("social-media", "Kevinters"),
            project("social-media", "13K"),
            project("social-media", "Manyavar"),
            project("social-media", "Thank You"),
            project("social-media", "Durex"),
            project("social-media", "Air India"),
            project("social-media", "Ozone"),
            project("social-media", "Loop"),
            project("social-media", "Vasansi"),
        ],
    },
    {
        id: "digital",
        title: "Digital Campaigns",
        favicon: "globe",
        projects: [
            project("digital", "Manyavar"),
            project("digital", "One8"),
            project("digital", "PrepLadder"),
            project("digital", "HDFC"),
            project("digital", "LearnApp"),
            project("digital", "Masters' Union"),
            project("digital", "Durex"),
            project("digital", "Unacademy"),
            project("digital", "Emergent"),
            project("digital", "Lotto"),
            project("digital", "Green Soul"),
        ],
    },
    {
        id: "offline",
        title: "Offline Campaigns",
        favicon: "map-pin",
        projects: [project("offline", "Sleepyhead")],
    },
    {
        id: "newspaper",
        title: "Newspaper Campaigns",
        favicon: "newspaper",
        projects: [
            project("newspaper", "Duroflex"),
            project("newspaper", "Carl Zeiss"),
        ],
    },
];

export const SAFARI_INITIAL_TAB = "influencer";
