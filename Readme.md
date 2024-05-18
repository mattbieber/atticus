# Atticus

This is *very* rudimentary start to the Atticus coding assessment.  

For a live instance (Vercel) visit

> Please contact me with any questions or comments.  Thanks!

## Overview

General rundown of my approach:

- Built with Next.js / Typescript

- [Prisma](https://www.prisma.io/nextjs) for ORM with a [Vercel hosted Postgres](https://vercel.com/docs/storage/vercel-postgres) instance

- [Tailwind](https://tailwindcss.com/) and [Shadcn](https://ui.shadcn.com/) for UI



## Callouts

Some considerations to mention... 

First time working with the latest versions of some of these frameworks (we were on Next 12 at Lark for example) so I'm not 100% that I'm using some of the latest bits (eg [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)) idiomatically. 

The Clerk auth part is awkward.  Gave that a shot as a way to implement persistence between sessions.  Going forward I'd find a different solution.  

> **I've noticed some quirks with it's implicit redirects, so if you have issues with sign-up/sign-in let me know and I can push a session-based solution (strip out the auth)**

First real project with Tailwind.  It makes styling more excessible at the expense of littering your code with class-soup.  Not sure I'd go that route again.

Some other omissions for the sake of time:

- Typescript hardening 

- Would address layout-shift across component mounting

- Better error handling / Db transactions

- Event throttling/debouncing - it's straight waterfall as it stands

  

## Running locally

Install dependencies and run the dev server:

```shell
yarn | npm run | pnpm install
yarn | npm run | pnpm dev
```

Open http://localhost:3000 with your browser to see the result.