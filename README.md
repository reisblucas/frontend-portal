## About

Frontend project developed by Bluestorm Software to test the candidate abilities and a API doc was available in the test period. How I did it in my free time, my focus was to turn it scalable and clean.

### Prerequisites

- Login
  - Validate login field restrictions(username and password) and your respective endpoint responses(error and success)
- List medications:
  - Simple query on db
  - List should have pagination system based on limit and page number
  - Added to that, the use should be able to query some word and show the result on screen
  - \*\* Only the params was controlled by Front End
- Create medication:
  - Form field to send to the backend
  - Validate required field, show errors on form...
  - Work with errors and success on the API

## Deploy

- Vercel: https://pharmacy-portal.vercel.app/

## How to use

I used pnpm to install and update the packages, so I do recommend that you use it too. Plus to that, Lint Staged is configured to use `pnpm`:

1. Clone it using SSH method -> `git clone git@github.com:reisblucas/frontend-portal.git`
2. Install it: `pnpm i` or `npm i` or `yarn i`
3. Run it:
   1. `pnpm dev`
   2. `npm run dev`
   3. `yarn dev`
4. Open the link listed on terminal, probably, port 3000: http://localhost:3000/

## Technologies/Frameworks:

- TypeScript - Latest(@5.2.2)
- Next.js - Latest(@13.5.4)
- NextAuth - Latest(4.23.2)
- Chakra UI - Design system
- React Hook Form
  - [3rd Party Bind](https://react-hook-form.com/resources/3rd-party-bindings) between Chakra UI and React Hook Form
- Tanstack React Query - Cache, Query, Server Side query, revalidating...
- Yup - Validation Schema
- Axios

### Code Quality:

- ESLint
- Husky
- Lint Staged
- Prettier

## Roadmap

- [x] Configuration - Next.js, NextAuth, ESLint, Prettier, Husky, Lint Staged, TypeScript, Providers, Infra...
- [x] Define project scope - folder structure to be scalable and based on entity
- [x] NextAuth
  - [x] Signin persistance until JWT expire
- [x] Signin Page (Start coding in fact)
  - [x] Service
  - [x] Controller(hooks)
  - [x] View
  - [x] Refactor and do the Componentization
  - [x] Contracts
  - [x] Add Signin form
  - [x] Validate form - React Hook Form + Yup
- [x] Medications List
  - [x] MVCS...
  - [x] Route fetching without queryParams on `route`
  - [x] Route fetching with queryParams - Limit, Search and/or Page
  - [x] Pagination helper function
    - [ ] Refactor and move to the right place
  - [x] Add Filter
  - [x] Componentization
  - [x] Add Contracts
- [x] Create Medication
  - [x] MVCS...
  - [x] Update Contract
  - [x] Add Form
  - [x] Validate form
  - [x] Add handler to control `min date` on `expired_on` input based on `issued_on` field
- [x] App Head metatag
- [x] Design
  - [x] Layout
    - [x] Header
    - [x] DrawerNavigation
      - [x] Buttons as NavLinks
      - [x] Sign out
    - [x] Footer
  - [x] Minor changes to CSS be presentable
  - [x] Add business image on Home
  - [x] Add pill image on `Sign in page`
- [x] Fix Head metate receiving more than 1 children on Title - Error is only locally
