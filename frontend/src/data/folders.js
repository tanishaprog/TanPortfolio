// Desktop folders and their placeholder contents. Content will be filled in later.

export const FOLDERS = [
    {
        id: "about",
        name: "About Me",
        icon: "folder",
        color: "#f6c86b",
        placeholder: true,
        body: {
            kind: "about",
            summary:
                "This is where a short, honest biography of Tanisha will live — how she thinks, what she cares about, and what she is currently making.",
            sections: [
                "Biography",
                "Current Interests",
                "Favourite Things",
                "Reading",
                "Watching",
                "Listening",
                "Current Projects",
            ],
        },
    },
    {
        id: "resume",
        name: "Resume",
        icon: "folder",
        color: "#f6c86b",
        placeholder: true,
        body: {
            kind: "files",
            files: [
                { name: "Final Resume.pdf", type: "pdf", openable: true },
                { name: "Resume Backup.pdf", type: "pdf", openable: false },
                { name: "Resume Backup Backup.pdf", type: "pdf", openable: false },
                { name: "Cover Letter.docx", type: "doc", openable: false },
            ],
        },
    },
    {
        id: "contact",
        name: "Contact",
        icon: "folder",
        color: "#f6c86b",
        placeholder: true,
        body: {
            kind: "contact",
            fields: [
                { label: "Email", value: null },
                { label: "LinkedIn", value: null },
                { label: "Instagram", value: null },
                { label: "Website", value: null },
                { label: "Phone", value: null, optional: true },
            ],
        },
    },
    {
        id: "cat-pics",
        name: "Cat Pics",
        icon: "folder",
        color: "#f6c86b",
        placeholder: true,
        body: {
            kind: "gallery",
            images: [],
            emptyState:
                "The cats are asleep. Tanisha will upload their portraits soon.",
        },
    },
    {
        id: "do-not-open",
        name: "Do Not Open",
        icon: "folder",
        color: "#f6c86b",
        placeholder: true,
        body: {
            kind: "files",
            files: [
                { name: "definitely_not_a_diary.txt", type: "txt", openable: false },
                { name: "old_layouts_i_swore_id_delete.psd", type: "img", openable: false },
                { name: "3am_thoughts.rtf", type: "txt", openable: false },
                { name: "screenshots_of_texts.png", type: "img", openable: false },
                { name: "voice_memos_of_me_singing.m4a", type: "audio", openable: false },
                { name: "the_document.docx", type: "doc", openable: false },
                { name: "goals_2019.docx", type: "doc", openable: false },
                { name: "please_dont_click.zip", type: "zip", openable: false },
            ],
        },
    },
    {
        id: "trash",
        name: "Trash",
        icon: "trash",
        color: "#c9c9cf",
        placeholder: true,
        body: {
            kind: "files",
            files: [
                { name: "bad_idea.sketch", type: "img", openable: false },
                { name: "first_draft.docx", type: "doc", openable: false },
                { name: "screenshot 2023-08-14 at 2.14 a.m..png", type: "img", openable: false },
            ],
        },
    },
];
