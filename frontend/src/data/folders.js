// Desktop folders and their placeholder contents.
// Contact folder was replaced by a standalone "Contact Me" business-card file
// on the desktop (see BUSINESS_CARD in data/aboutMe.js).

export const FOLDERS = [
    {
        id: "about",
        name: "About Me",
        icon: "folder",
        color: "#f6c86b",
        placeholder: true,
        // About Me does NOT open a Finder window. Instead the folder icon
        // triggers a "scatter" of personal files onto the desktop —
        // handled in Desktop.jsx via ABOUT_SCATTER data.
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
        id: "cat-pics",
        name: "Pixxxx💅",
        icon: "folder",
        color: "#f6c86b",
        placeholder: false,
        body: {
            kind: "gallery",
            images: [
                { name: "pix1.jpeg", src: "/pix1.jpeg" },
                { name: "pix2.jpeg", src: "/pix2.jpeg" },
                { name: "pix3.jpeg", src: "/pix3.jpeg" },
                { name: "pix4.jpeg", src: "/pix4.jpeg" },
                { name: "pix5.jpeg", src: "/pix5.jpeg" },
                { name: "pix6.jpeg", src: "/pix6.jpeg" },
                { name: "pix7.jpeg", src: "/pix7.jpeg" },
                { name: "pix8.jpeg", src: "/pix8.jpeg" },
                { name: "pix9.jpeg", src: "/pix9.jpeg" },
                { name: "pix10.jpeg", src: "/pix10.jpeg" },
            ],
            emptyState: "nothing here yet.",
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
