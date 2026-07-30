// Safari tab + project structure. Every project is a placeholder case study.
// Later, replace `summary`, `details`, `metrics`, and `heroImage` per project.

const p = (name, brand) => ({
    id: `${brand}-${name}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, ""),
    brand: name,
    title: `${name} — Case Study`,
    url: `www.tanisha.work/case/${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    snippet: `A short placeholder description of the ${name} project. Replace this with the real case study summary — key idea, the ask, and the outcome.`,
    isPlaceholder: true,
});

export const SAFARI_TABS = [
    {
        id: "influencer",
        title: "Influencer Marketing",
        favicon: "megaphone",
        projects: [
            p("Bajaj Allianz"),
            p("Sensodyne"),
            p("Manyavar"),
            p("MyFi"),
            p("Cycle Agarbatti"),
        ],
    },
    {
        id: "ad-films",
        title: "Ad Films",
        favicon: "film",
        projects: [
            p("Zeebu"),
            p("Kevinters"),
            p("Smartsters"),
            p("Olio Pizza"),
            p("Airbound"),
            p("One8"),
            p("CashKaro"),
            p("Meesho"),
        ],
    },
    {
        id: "social-media",
        title: "Social Media",
        favicon: "hash",
        projects: [
            p("MyFi"),
            p("Shopsy"),
            p("Kevinters"),
            p("13K"),
            p("Manyavar"),
            p("Thank You"),
            p("Durex"),
            p("Air India"),
            p("Ozone"),
            p("Loop"),
            p("Vasansi"),
        ],
    },
    {
        id: "digital",
        title: "Digital Campaigns",
        favicon: "globe",
        projects: [
            p("Manyavar"),
            p("One8"),
            p("PrepLadder"),
            p("HDFC"),
            p("LearnApp"),
            p("Masters' Union"),
            p("Durex"),
            p("Unacademy"),
            p("Emergent"),
            p("Lotto"),
            p("Green Soul"),
        ],
    },
    {
        id: "offline",
        title: "Offline Campaigns",
        favicon: "map-pin",
        projects: [p("Sleepyhead")],
    },
    {
        id: "newspaper",
        title: "Newspaper Campaigns",
        favicon: "newspaper",
        projects: [p("Duroflex"), p("Carl Zeiss")],
    },
];

export const SAFARI_INITIAL_TAB = "influencer";
