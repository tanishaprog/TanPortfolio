// All content for "About Me" folder + sticky note + business card.
// Edit only this file to change what the site says.

export const STICKY_CHECKLIST = [
    { id: "s1", text: "Call back mom", done: false },
    { id: "s2", text: "Pay cook didi", done: true },
    { id: "s3", text: "Brand consultation call", done: false },
    { id: "s4", text: "Shoot IG content", done: false },
    { id: "s5", text: "Update resume", done: false },
    { id: "s6", text: "Plan Malaysian Grand Prix trip", done: true },
    { id: "s7", text: "Order Diet Coke from Blinkit", done: false },
    { id: "s8", text: "Remember electrolytes + creatine", done: true, emphasized: true },
    { id: "s9", text: "Charge phone", done: false },
];

export const ABOUT_ME_TEXT = `hiiii, i'm tanisha.

I'm a 24-year-old senior marketing strategist, content creator and someone with way too many interests.

Curiosity has probably been the biggest advantage I've had in my career. I genuinely believe consuming great books, films, conversations and ideas makes you a better marketer because you slowly develop better taste.

Most days you'll find me experimenting with AI tools, trying every new vibe coding platform I can get my hands on, reading about emerging technology or obsessing over advertising campaigns that made me stop scrolling.

When I'm not working, I'm probably reading a book, dancing around my room, cooking something unnecessarily complicated or spending hours on Substack convincing myself it's "research."

One of my most questionable habits is crushing Hajmola into Diet Coke. Don't yuck my yum until you've tried it.

Back at work, I somehow became known as the girl who'd dramatically say "i'm just a girl 🥹" every time someone gave me another project…

…and then somehow deliver it ridiculously fast anyway.

Right now I'm building content around marketing, advertising, social media growth and AI while documenting everything I'm learning.

If you somehow made it this far, come say hi.

And thanks for spending time inside my little corner of the internet.`;

// Reading list, mixture of read + unread, order stays as user provided.
export const READING_LIST = [
    { title: "Yellowface", done: true },
    { title: "White Nights", done: false },
    { title: "It Happened One Summer", done: true },
    { title: "Pandemonium", done: true },
    { title: "Madame Bovary", done: false },
    { title: "The Girls Are Not Fine", done: true },
    { title: "Convenience Store Woman", done: true },
    { title: "Song of Achilles", done: false },
    { title: "How to Kill Your Family", done: true },
    { title: "Normal People", done: true },
    { title: "Strangers in the Night", done: false },
    { title: "Project Hail Mary", done: false },
    { title: "Daisy Jones & The Six", done: true },
    { title: "Ghosts", done: false },
    { title: "Strangers: A Memoir of Marriage", done: false },
    { title: "The Creative Act", done: true },
    { title: "The Silent Patient", done: false },
    { title: "Forest of Enchantments", done: false },
    { title: "A Little Life", done: false },
];

export const READING_META = {
    title: "currently reading",
    subtitle: "trying to finish one book every two weeks.",
};

export const SHOWS = [
    { title: "This Is Us" },
    { title: "The Office" },
    { title: "Modern Family" },
    { title: "The Good Place", note: "criminally underrated." },
    { title: "New Girl" },
    { title: "The Bold Type" },
    { title: "Black Mirror" },
    { title: "When Life Gives You Tangerines" },
];

export const MOVIES = [
    { title: "Crazy Rich Asians" },
    { title: "To All The Boys I've Loved Before" },
    { title: "Pride & Prejudice" },
    { title: "Dear Zindagi" },
    { title: "Khoobsurat" },
    { title: "Hidden Figures" },
    { title: "Thelma & Louise" },
    { title: "Legally Blonde" },
    { title: "Schindler's List" },
    { title: "Call Me By Your Name" },
];

export const WATCHLIST_META = {
    title: "things everyone should watch once.",
    footer: "this is my list.\nplease don't judge it too hard :)",
};

// Spotify song + podcast, the `open` URL is the single source of truth.
// Title, artist and album art are fetched via Spotify's oembed API at runtime
// (SpotifyCard.jsx). `gradient` is used only as a fallback while art loads.
export const SPOTIFY = {
    podcast: {
        kind: "podcast",
        gradient: ["#2b1735", "#742d5a"],
        open: "https://open.spotify.com/episode/1pebCgK75J7OpVLb5cAwqq",
    },
    song: {
        kind: "song",
        gradient: ["#1a3d2a", "#0b8b3e"],
        open: "https://open.spotify.com/track/5GbVzc6Ex5LYlLJqzRQhuy",
    },
};

// Files that scatter onto the desktop when About Me is opened.
export const ABOUT_SCATTER = [
    {
        id: "portrait",
        kind: "image",
        label: "portrait.jpg",
        src: "/portrait-about.webp",
        x: 350,
        y: 66,
        rot: -4,
    },
    {
        id: "aboutme",
        kind: "text",
        docKind: "aboutme",
        label: "About Me.txt",
        x: 560,
        y: 300,
        rot: 2,
    },
    {
        id: "reading",
        kind: "text",
        docKind: "reading",
        label: "Reading List.txt",
        x: 820,
        y: 90,
        rot: -1,
    },
    {
        id: "movies",
        kind: "text",
        docKind: "movies",
        label: "Movies & Shows.txt",
        x: 1080,
        y: 320,
        rot: 3,
    },
    {
        id: "listening",
        kind: "spotify",
        label: "Currently Listening",
        x: 1300,
        y: 100,
        rot: -3,
    },
];

// Business card (Contact Me file).
export const BUSINESS_CARD = {
    name: "Tanisha Shrivastava",
    roles: ["marketing strategist", "creator", "serial vibe-coder"],
    tagline:
        "currently building brands, content, and way too many side projects.",
    portrait: "/portrait-card.webp",
    contact: [
        {
            id: "email",
            label: "Email",
            handle: "tanishashrivastava.work@gmail.com",
            href: "mailto:tanishashrivastava.work@gmail.com",
        },
        {
            id: "instagram",
            label: "Instagram",
            handle: "@tanisha.yaps",
            href: "https://www.instagram.com/tanisha.yaps?utm_source=qr",
            external: true,
        },
        {
            id: "linkedin",
            label: "LinkedIn",
            handle: "Tanisha",
            href: "https://www.linkedin.com/in/tanisha-shrivastava-9037a91ab?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
            external: true,
        },
    ],
    availableFor: [
        "consulting",
        "brand strategy",
        "social media",
        "creator partnerships",
        "workshops",
    ],
};
