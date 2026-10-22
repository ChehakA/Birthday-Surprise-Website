/* ════════════════════════════════════════════════════════════════════════
   ♥  THIS IS THE ONLY FILE YOU NEED TO EDIT  ♥

  Everything the recipient reads or sees comes from here: their name, photos,
   the captions, the quiz, the gifts and your letter.

   HOW TO EDIT
   • Change only the text between the "quotes".
   • Keep the quotes, commas and brackets exactly where they are.
   • To use a quote mark inside your text, write \" (or just use ’ and “ ”).

   HOW TO ADD YOUR PHOTOS
   1. Put your photos in the folder:  public/images/
   2. Easiest way: give them the same names as the placeholders
        memory-1.jpg, memory-2.jpg, memory-3.jpg, memory-4.jpg, favorite-photo.jpg
      and they will appear automatically.
   3. Or keep your own file names and change the `src` lines below,
      e.g.  src: "images/beach-day.jpg"
   Square or portrait photos look best. Any size works (they are cropped
   to a square). If a photo is missing, a soft "photo coming soon" card
   shows instead, so nothing ever looks broken.
   ════════════════════════════════════════════════════════════════════════ */

export type Photo = {
  /** Path inside the public folder, e.g. "images/memory-1.jpg" */
  src: string;
  /** Short description for screen readers */
  alt: string;
  /** Handwritten caption under the photo */
  caption: string;
};

export type Memory = Photo & {
  /** How this photo is discovered:
  *  "envelope" – slides out of an envelope as they scroll
  *  "flip"     – they tap it and it flips to show `backMessage`
  *  "mystery"  – hidden behind a mystery card until they tap it */
  reveal: "envelope" | "flip" | "mystery";
  /** Only used when reveal is "flip" */
  backMessage?: string;
};

export type QuizQuestion = {
  question: string;
  /** 3 or 4 answers. `reply` is shown after choosing an answer. */
  answers: { text: string; reply: string }[];
  /** Which answer is "right": 0 = first, 1 = second, 2 = third, 3 = fourth */
  correct: number;
};

export type Gift = {
  /** Small label on the revealed card */
  label: string;
  text: string;
  /** Optional photo shown with this gift. Delete the line for no photo. */
  photo?: Photo;
};

export const birthdayContent = {
  /* ── Recipient's name or nickname (used in the birthday title) ─────── */
  name: "birthday star",

  /* ── Opening screen ────────────────────────────────────────────────── */
  intro: {
    greeting: "Happy birthday!",
    message: "I made a little something to celebrate you. Take a look? ✨",
    button: "Open your surprise",
    /** Tiny note on the letter inside the envelope */
    letterNote: "for you",
  },

  /* ── First screen after the envelope opens ─────────────────────────── */
  hero: {
    eyebrow: "Today is yours",
    title: "Happy Birthday,",
    subtitle: "Scroll through a few birthday surprises.",
  },

  /* ── Section 1: photos ─────────────────────────────────────────────── */
  memories: {
    title: "Favorite memories",
    subtitle: "A few moments worth remembering.",
    photos: [
      {
        src: "images/memory-1.jpg",
        alt: "Placeholder for a favorite memory",
        caption: "A moment worth remembering.",
        reveal: "envelope",
      },
      {
        src: "images/memory-2.jpg",
        alt: "Placeholder for a second memory",
        caption: "A little brightness from an ordinary day.",
        reveal: "flip",
        backMessage: "A little moment to remember.",
      },
      {
        src: "images/memory-3.jpg",
        alt: "Placeholder for a third memory",
        caption: "One for the memory book.",
        reveal: "mystery",
      },
    ] as Memory[],
  },

  /* ── Section 2: quiz ───────────────────────────────────────────────── */
  quiz: {
    title: "A little birthday quiz",
    subtitle: "Three questions about the things that make you wonderful.",
    questions: [
      {
        question: "What is one thing people appreciate about you?",
        answers: [
          { text: "My sense of humor", reply: "Definitely something to smile about." },
          { text: "My kindness", reply: "A wonderful quality to have." },
          { text: "My creativity", reply: "That makes life more interesting." },
          { text: "All of the above", reply: "Exactly. There is a lot to appreciate." },
        ],
        correct: 3,
      },
      {
        question: "What is the best thing to make time for?",
        answers: [
          { text: "A new adventure", reply: "A great way to make a memory." },
          { text: "Time with good people", reply: "The best moments are shared." },
          { text: "Something that makes you happy", reply: "Always worth making time for." },
          { text: "All of these", reply: "A well-balanced answer!" },
        ],
        correct: 2,
      },
      {
        question: "What is one thing you deserve more of this year?",
        answers: [
          { text: "Time to do what you enjoy", reply: "Make room for the good stuff." },
          { text: "New experiences", reply: "Here is to trying something new." },
          { text: "Reasons to celebrate", reply: "Starting with today!" },
          { text: "All of the above", reply: "Absolutely. May the year bring plenty." },
        ],
        correct: 3,
      },
    ] as QuizQuestion[],
    /** Shown at the end. `perfect` = all right, `some` = one or two, `none` = zero. */
    results: {
      perfect: "A perfect score. Nicely done!",
      some: "Not bad at all. Thanks for playing!",
      none: "The important thing is that you had fun!",
    },
    resultNote: "You deserve to be celebrated, whatever your score.",
    continueButton: "Keep going",
  },

  /* ── Section 3: heart-catching game ────────────────────────────────── */
  game: {
    title: "Catch a little joy",
    instructions: "Tap the hearts as they appear. Catch all five.",
    startButton: "Start",
    counterLabel: "Joy collected",
    /** How many hearts the recipient needs to catch */
    goal: 5,
    completionMessage: "You caught them all! Hope they brighten your day. ✨",
    continueButton: "There’s more",
  },

  /* ── Section 4: three mystery gifts ────────────────────────────────── */
  gifts: {
    title: "There’s one more thing…",
    subtitle: "Three little presents. Open them all.",
    items: [
      {
        label: "A coupon",
        text: "Redeem for a little pick-me-up whenever you need one.",
      },
      {
        label: "A memory",
        text: "A reminder that people are cheering you on.",
        photo: {
          src: "images/memory-4.jpg",
          alt: "Placeholder for a gift photo",
          caption: "Keep this one.",
        },
      },
      {
        label: "A promise",
        text: "Make time for the things and people that matter to you.",
      },
    ] as Gift[],
    continueButton: "Read your letter",
  },

  /* ── Section 5: your letter ────────────────────────────────────────── */
  letter: {
    heading: "A birthday note for you",
    favoritePhoto: {
      src: "images/favorite-photo.jpg",
      alt: "Placeholder for a favorite birthday photo",
      caption: "A favorite memory.",
    } as Photo,
    unfoldHint: "Tap to unfold your letter",
    /** Each "..." below is one paragraph. Add or remove paragraphs freely. */
    paragraphs: [
      "[Add a birthday message here.]",
      "[Share a favorite memory or something you appreciate about them.]",
      "[Add a wish for the year ahead.]",
      "Happy birthday!",
    ],
    /** Your name or sign-off under the letter. Leave "" to hide it. */
    signature: "[Add your name or sign-off]",
    lastButton: "One last thing… ❤️",
    finalMessage: "Wishing you a wonderful year ahead!",
    restartButton: "Start again",
  },
};
