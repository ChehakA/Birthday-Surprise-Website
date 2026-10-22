<div align="center">

# 💌 Birthday Surprise

**A two-minute website that does the "I love you" part for you.**<br>
(You still have to write the letter. Sorry. Claude and I tried.)

![Six screens of the birthday site: an envelope, a photo popping out of an envelope, a quiz, a heart-catching game, three gift boxes and a final letter](docs/preview.png)

</div>

---

## So what is this?

It's a birthday card that grew up and learned React.

You send your person a link. They open it on their phone and get:

| | |
|---|---|
| 💌 **An envelope** | They tap it, it opens, hearts float out. Very dramatic. |
| 📸 **Your photos** | One slides out of an envelope, one flips over to show a secret note, one hides behind a mystery card. |
| 🧠 **A quiz** | "Do you know what I love about you?" Three questions. Wrong answers get roasted, gently. |
| 💗 **A tiny game** | Catch five hearts in about ten seconds. Nobody can lose. We made sure. |
| 🎁 **Three gifts** | Tap to open. Coupons, memories, promises. Zero shipping costs. |
| 📜 **A love letter** | It unfolds slowly, paragraph by paragraph. Have tissues nearby. |
| ✨ **One last thing…** | A final line. We won't spoil it. |

No accounts. No backend. No database. No subscription. Just vibes and a little JavaScript.

## Make your own in four steps

### 1. Grab the template

Click the green **Use this template** button at the top of this page, then **Create a new repository**.

> 🔒 **Make your copy private.** It's about to contain your photos and your feelings, and the internet does not need either.

### 2. Run it on your computer

You need [Node.js](https://nodejs.org) (version 18 or newer). Then:

```bash
npm install
npm run dev
```

Open the address it prints (usually http://localhost:5173). Want to see it on your phone while you edit? Run `npm run dev -- --host` and open the "Network" address.

### 3. Make it yours

**Everything you need to edit is in one file:**

```
src/data/birthdayContent.ts
```

It's full of comments telling you exactly what to change. Only edit the text between the "quotes"; leave the commas and brackets alone and nobody gets hurt.

| What | Where in the file |
|---|---|
| Their name or nickname | `name` |
| The opening message | `intro` |
| Photos and captions | `memories.photos` |
| Quiz questions, answers, replies | `quiz.questions` |
| The heart game message | `game` |
| The three gifts | `gifts.items` |
| Your letter and the very last line | `letter` |

#### 📸 Adding your photos

Drop your photos into `public/images/` using these exact names, replacing the placeholders:

| File | Where it shows up |
|---|---|
| `memory-1.jpg` | Slides out of the envelope |
| `memory-2.jpg` | Flips over when tapped |
| `memory-3.jpg` | Hides behind the mystery card |
| `memory-4.jpg` | Inside the second gift |
| `favorite-photo.jpg` | Next to your letter. Choose wisely. |

Different names or `.png` files? Change the matching `src:` line in `birthdayContent.ts`, like `src: "images/beach-day.png"`.

Photos are cropped to squares, so keep faces near the middle. Phone photos are huge; shrinking them to about 1200px wide keeps things fast. If a photo is missing, a polite "Photo coming soon" card appears instead of a broken image.

#### 🧠 Editing the quiz

Each question has the `question`, a list of `answers` (each with the `reply` they see after tapping it) and `correct`, which says which answer is right, counting from **0**. So `correct: 2` means the third answer. Programmers, am I right?

You can have 3 or 4 answers per question, and add or remove whole questions.

### 4. Publish it and send the link

**Option A: Netlify Drop (fastest, about a minute)**

1. Run `npm run build`. This makes a `dist` folder.
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop) and drag the `dist` folder onto the page.
3. You get a link straight away. Rename it in *Site settings* to something cute.

**Option B: GitHub Pages (free, from your repo)**

1. In your repo, go to **Settings → Pages** and set *Source* to **GitHub Actions**.
2. Push any change to `main`. The included workflow builds and publishes the site.
3. It appears at `https://YOUR-USERNAME.github.io/YOUR-REPO/`.

> ⚠️ A Pages site can be opened by anyone with the link, even if your repo is private. Don't post the link anywhere you wouldn't post your photos.

**Option C: Vercel**

Import your repo at [vercel.com/new](https://vercel.com/new) and press **Deploy**. It figures out the rest.

**Before you send it:** open the link on your own phone and go through it once. Check that every photo shows up. Then send it, and try to act casual.

## Good to know

- 📱 **Built for phones.** It works on a laptop too, as a centered phone-width column.
- 🐢 **Respects "reduce motion".** If someone's phone is set to reduce motion, the animations calm down and everything still works.
- 🔇 **No sound.** Nothing will blast music in a quiet office.
- 🔁 **"Start again" button** at the end, for people who want to cry twice.
- 🎨 **Want different colors or fonts?** They're all variables at the top of `src/styles.css`.

## What's inside

```
public/images/              ← your photos go here
src/
  data/birthdayContent.ts   ← ✏️ all the words, photos, quiz, gifts and letter
  App.tsx                   the order of the chapters
  styles.css                colors, fonts and every animation
  components/               one file per section (envelope, quiz, game, gifts, letter…)
```

Built with React, TypeScript, Vite, [Motion](https://motion.dev) and [Lucide](https://lucide.dev) icons.

## License

[MIT](LICENSE). Use it, remix it, make someone smile. If it works out, we'd love to hear about it. If it doesn't, the template did its best. 💌
