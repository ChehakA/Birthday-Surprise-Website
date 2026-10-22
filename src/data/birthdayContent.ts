/* ════════════════════════════════════════════════════════════════════════
   ♥  THIS IS THE ONLY FILE YOU NEED TO EDIT  ♥

   Everything he reads or sees comes from here: his name, the photos,
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
   *  "envelope" – slides out of an envelope as he scrolls
   *  "flip"     – he taps it and it flips to show `backMessage`
   *  "mystery"  – hidden behind a mystery card until he taps it */
  reveal: "envelope" | "flip" | "mystery";
  /** Only used when reveal is "flip" */
  backMessage?: string;
};

export type QuizQuestion = {
  question: string;
  /** 3 or 4 answers. `reply` is what he sees after choosing that answer. */
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
  /* ── His name or nickname (used in the big birthday title) ─────────── */
  name: "my love",

  /* ── Opening screen ────────────────────────────────────────────────── */
  intro: {
    greeting: "Hey, birthday boy…",
    message: "I made a little something just for you. Take two minutes for me? ❤️",
    button: "Open your surprise",
    /** Tiny note on the letter inside the envelope */
    letterNote: "for you",
  },

  /* ── First screen after the envelope opens ─────────────────────────── */
  hero: {
    eyebrow: "Today is yours",
    title: "Happy Birthday,",
    subtitle: "Scroll slowly. I hid a few things in here for you.",
  },

  /* ── Section 1: photos ─────────────────────────────────────────────── */
  memories: {
    title: "Our little memories",
    subtitle: "A few moments I keep coming back to.",
    photos: [
      {
        src: "images/memory-1.jpg",
        alt: "Placeholder for our first photo",
        caption: "One of my favorite memories with you.",
        reveal: "envelope",
      },
      {
        src: "images/memory-2.jpg",
        alt: "Placeholder for our second photo",
        caption: "You make ordinary days feel special.",
        reveal: "flip",
        backMessage: "A little moment I wish I could relive.",
      },
      {
        src: "images/memory-3.jpg",
        alt: "Placeholder for our third photo",
        caption: "My favorite person, always.",
        reveal: "mystery",
      },
    ] as Memory[],
  },

  /* ── Section 2: quiz ───────────────────────────────────────────────── */
  quiz: {
    title: "Okay birthday boy… do you know what I love about you?",
    subtitle: "Three questions. No pressure. (Some pressure.)",
    questions: [
      {
        question: "What is my favorite thing about you?",
        answers: [
          { text: "My smile", reply: "Awww, that’s actually so cute." },
          { text: "My heart", reply: "Okayyy, I’ll give you that one." },
          { text: "How safe I make you feel", reply: "You know us better than you think." },
          { text: "Everything. You can’t pick", reply: "Correct. I really can’t pick." },
        ],
        correct: 3,
      },
      {
        question: "When do I think you look your best?",
        answers: [
          { text: "All dressed up", reply: "Very handsome. Still not my answer." },
          { text: "Just woken up, hair a mess", reply: "HAHA, you should know this by now 😭❤️" },
          { text: "When I’m laughing", reply: "Yes. That one, every single time." },
          { text: "Every time, it’s annoying", reply: "Okayyy, I’ll give you that one." },
        ],
        correct: 2,
      },
      {
        question: "What is one thing about you that always makes me smile?",
        answers: [
          { text: "My laugh", reply: "Awww, that’s actually so cute." },
          { text: "My terrible jokes", reply: "They are terrible. I smile anyway." },
          { text: "The way I look at you", reply: "You know us better than you think." },
          { text: "All of the above", reply: "Obviously. Every single one." },
        ],
        correct: 3,
      },
    ] as QuizQuestion[],
    /** Shown at the end. `perfect` = all right, `some` = one or two, `none` = zero. */
    results: {
      perfect: "A perfect score. You know us by heart.",
      some: "Not bad at all. You were paying attention.",
      none: "Zero?! Lucky for you, I like you anyway.",
    },
    resultNote: "Either way, you were always my right answer.",
    continueButton: "Keep going",
  },

  /* ── Section 3: heart-catching game ────────────────────────────────── */
  game: {
    title: "Catch a little love",
    instructions: "Tap the hearts as they appear. Catch all five.",
    startButton: "Start",
    counterLabel: "Love collected",
    /** How many hearts he needs to catch */
    goal: 5,
    completionMessage: "You collected all the hearts… but somehow you still have mine. ❤️",
    continueButton: "There’s more",
  },

  /* ── Section 4: three mystery gifts ────────────────────────────────── */
  gifts: {
    title: "There’s one more thing…",
    subtitle: "Three little presents. Open them all.",
    items: [
      {
        label: "A coupon",
        text: "One free hug, redeemable whenever you need one.",
      },
      {
        label: "A memory",
        text: "A reminder that I’m always cheering for you.",
        photo: {
          src: "images/memory-4.jpg",
          alt: "Placeholder for a gift photo",
          caption: "Keep this one.",
        },
      },
      {
        label: "A promise",
        text: "I will always choose you, no matter what the situation is.",
      },
    ] as Gift[],
    continueButton: "Read your letter",
  },

  /* ── Section 5: your letter ────────────────────────────────────────── */
  letter: {
    heading: "Happy birthday, my love. ❤️",
    favoritePhoto: {
      src: "images/favorite-photo.jpg",
      alt: "Placeholder for my favorite photo of us",
      caption: "My favorite one.",
    } as Photo,
    unfoldHint: "Tap to unfold your letter",
    /** Each "..." below is one paragraph. Add or remove paragraphs freely. */
    paragraphs: [
      "Today is all about you, and I hope you know how special you are to me. I wish I could put into words how much happiness you bring into my life. You deserve so many beautiful things, so much love, and every little reason to smile.",
      "I hope this new year of your life brings you closer to everything you’ve been dreaming of. I’ll always be cheering for you, celebrating you, and reminding you how amazing you are.",
      "Thank you for being you. And if I could give you one thing today, it would be the chance to see yourself through my eyes.",
      "Happy birthday, baby. I love you. ❤️",
    ],
    /** Your name or sign-off under the letter. Leave "" to hide it. */
    signature: "Yours, always",
    lastButton: "One last thing… ❤️",
    finalMessage: "Out of all the people in this world, I’m so glad it’s you.",
    restartButton: "Start again",
  },
};
