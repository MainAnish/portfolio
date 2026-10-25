# Anish Kumar — 3D Portfolio (React + Vite + Three.js + GSAP)

## A. Run locally
`npm install` → `npm run dev` (open the URL printed in the terminal).
## H. Production build
`npm run build` → static site in `dist/` (preview with `npm run preview`). Deploy `dist/` to Vercel/Netlify.

## B/C. Add a project (edit only `src/data/projects.js`)
Append an object; the card, numbering, tags and case study appear automatically.
```js
{ id:'my-app', title:'My App', category:'Full-Stack Development',
  summary:'One-line pitch.', description:'Longer text (optional).',
  technologies:['React','Node.js'], features:['Feature A','Feature B'],
  details:['Optional technical note'],            // optional
  githubUrl:'https://github.com/MainAnish/my-app', // link hidden while empty/invalid
  liveUrl:'https://my-app.example.com',            // link hidden while empty/invalid
  image:'/projects/my-app.png', screenshots:[] }   // optional, files in public/projects/
```
`number` is optional (auto 01, 02…). Only `id` and `title` are required.

## D/E. Add a certificate (edit only `src/data/certificates.js`)
```js
{ id:'aws-cp', title:'AWS Cloud Practitioner', issuer:'Amazon Web Services',
  issuedDate:'2026-03', credentialId:'ABC123',
  credentialUrl:'https://…verification link…',  // "View Certificate" appears only when valid
  image:'/certs/aws-cp.png', description:'' }
```
Leave `credentialUrl` empty and no button is shown. Other content: `profile.js`, `skills.js`, `achievements.js`.

## F. Assets
Resume: `public/Anish_Kumar_Resume.pdf` (the Download button renders only if this file exists at build time — rebuild after adding it). Images: `public/projects/`, `public/certs/`.

## G. 3D and animation
- `components/Scene3D.jsx`: one Three.js canvas (fixed, `pointer-events:none`, behind content). Each section has a `data-scene` attribute; ScrollTrigger tweens the sculpture to a pose defined in the `D` (desktop) and `M` (mobile) tables at the top of the file. Edit those numbers to reposition it.
- CSS reserves a right gutter on desktop (`.sec` padding-right) where the sculpture parks; on mobile it shrinks to a corner and dims.
- GSAP: hero entrance in `Hero.jsx`, scroll reveals in `App.jsx`. All are scoped to `gsap.context` and reverted on unmount; reduced-motion disables them and renders the scene statically.
