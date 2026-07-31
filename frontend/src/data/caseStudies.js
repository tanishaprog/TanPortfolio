// Real case studies. Each is keyed to a project (id) inside data/projects.js.
// Sections support several kinds - see ProjectModal.jsx for rendering.

export const MANYAVAR_SHAADI_SHOW = {
    campaignTitle: "The Manyavar Shaadi Show",
    tagline: "Building India's first wedding playbook disguised as entertainment.",
    heroImage: "/case-manyavar-shaadi-show.png",
    heroKicker: "Digital Campaign · Manyavar",
    heroLine:
        "Nobody teaches you how to get married. You discover everything while you're already planning one.",
    meta: [
        { label: "Role", value: "Lead Strategist" },
        { label: "Client", value: "Manyavar" },
        { label: "Format", value: "6-episode digital talk show" },
        { label: "Host", value: "Karan Johar" },
    ],
    kpis: [
        { label: "Short-form views", value: "25M+" },
        { label: "Organic reach", value: "16M+" },
        { label: "Amplification", value: "90L" },
        { label: "Episodes", value: "6" },
    ],
    sections: [
        {
            kind: "text",
            heading: "The brief",
            body: "Manyavar wanted to build an ownable content property around weddings. Not another celebrity interview. Not another promotional campaign. The challenge was creating something that could genuinely help people planning weddings while naturally positioning Manyavar at the center of those conversations. The content needed to survive beyond one campaign cycle and become a recurring seasonal IP.",
        },
        {
            kind: "text",
            heading: "The insight",
            body: "Nobody teaches you how to get married. You discover everything while you're already planning one. Wedding planning is full of scattered advice. There wasn't a single entertaining destination that brought expert advice together. That gap became the opportunity.",
        },
        {
            kind: "text",
            heading: "The idea",
            body: "The Manyavar Shaadi Show is India's first wedding playbook disguised as entertainment. A 6-episode digital talk show hosted by Karan Johar, designed to offer genuine help and insights to couples planning their weddings. Each episode balances stories, expert advice, games, and takeaways. Entertainment keeps people watching, education keeps them saving. Built to become a recurring seasonal IP for Manyavar.",
        },
        {
            kind: "bullets",
            heading: "Strategy pillars",
            bullets: [
                "Education before promotion: If audiences genuinely learned something, Manyavar would naturally earn trust.",
                "Think seasonally: An IP that returns every wedding season, not a one-off campaign.",
                "Entertainment keeps people watching. Education keeps people saving.",
            ],
        },
        {
            kind: "text",
            heading: "Choosing the host",
            body: "Karan Johar's films have influenced the visual language of modern Indian weddings for decades. He wasn't simply a celebrity host. He was THE cultural context.",
        },
        {
            kind: "episodes",
            heading: "Episode planning",
            episodes: [
                {
                    n: "01",
                    problem: "Event planning, logistics & coordination",
                    guests:
                        "Devika Narain (planner) · Pulkit & Kriti (couple)",
                    outcome:
                        "Stories from actual wedding days and how to plan better.",
                },
                {
                    n: "02",
                    problem: "Styling, hair, makeup",
                    guests:
                        "Komal Pandey · Kajol Paswwan · Anisha Jain",
                    outcome:
                        "When to start outfit planning, stylist booking, and MUA horror stories.",
                },
                {
                    n: "03",
                    problem: "Wedding content",
                    guests:
                        "Joseph Radhik · Vishal Punjabi · Shaadi BTS",
                    outcome:
                        "Pre-wedding shoots, videography and building an IG content plan.",
                },
                {
                    n: "04",
                    problem: "Health & fitness before the wedding",
                    guests:
                        "Neha Sahaya · Yasmin Karachiwala · Adar & Alekha Jain",
                    outcome:
                        "When to start, how to plan, the goal, and why maintenance matters.",
                },
                {
                    n: "05",
                    problem: "Sangeet",
                    guests: "Neeti, Shakti & Mukti Mohan",
                    outcome:
                        "Sangeet prep: dance, music, family coordination.",
                },
                {
                    n: "06",
                    problem: "Mental health & finances",
                    guests:
                        "Dr. Aditi Govitrikar · Kasturi Mahanta · Parthip Thyagrajan",
                    outcome:
                        "Handling meltdowns, relationship ups and downs, finances together.",
                },
            ],
        },
        {
            kind: "bullets",
            heading: "Execution",
            bullets: [
                "Creator research: 30+ guest shortlist, final casting, availability, briefing.",
                "Production with Dharma Productions: set, visual identity, colour palette, cue cards, branding.",
                "Guest management: briefs, wardrobe approvals, schedules, travel, vanity logistics, shoot coordination.",
                "Host preparation: briefing, cue cards, episode notes, live production support.",
                "Amplification: every episode designed as multiple content assets, including Full Episode, Trailer, Teasers, 4-5 Short-form Reels, Creator Posts, PR Assets and Social Amplification.",
            ],
        },
        {
            kind: "results",
            heading: "The results",
            kpis: [
                { label: "Short-form views", value: "25M+" },
                { label: "Organic reach", value: "16M+" },
                { label: "Amplification", value: "90L" },
                { label: "Wedding-first episodes", value: "6" },
            ],
        },
    ],
    cta: {
        label: "Watch the Playlist",
        href: "https://youtube.com/playlist?list=PL0M0251M1CAlp638F59bySpWqmCwrrB9K&si=HLSVrWauxG2dEgIa",
    },
};

// Registry so projects.js can attach case studies without circular imports.
export const CASE_STUDIES = {
    "digital-manyavar": MANYAVAR_SHAADI_SHOW,
};
