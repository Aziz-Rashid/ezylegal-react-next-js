# ezyLegal — Legal Services Platform (Frontend)

Next.js and TypeScript frontend for a platform that connects clients with lawyers: browse legal services by category, book and pay for consultations, read the blog, and join the lawyer network.

## Features

- **Service catalogue** — dynamic category pages (`/category/[categorySlug]`)
- **Checkout** — online payments with Razorpay and Paytm, plus a purchase summary page
- **Dashboard** — user dashboard after booking
- **Lawyer onboarding** — "Join our network" flow with validated multi-field forms
- **Forms** — React Hook Form with Yup validation, OTP input, file uploads (react-dropzone), date picker
- **Content** — blog and static pages, with data pulled from WordPress at build time
- **Support** — Zendesk chat widget
- **State** — Redux with redux-thunk and redux-persist

## Tech stack

Next.js 10 · TypeScript · React · Redux · React Hook Form · Yup · styled-components · React Bootstrap · Razorpay · Paytm · Zendesk

## Getting started

```bash
npm install
npm run fetch-data   # pull static data from WordPress
npm run dev
```

Then open http://localhost:3000.

### Environment variables

Create a `.env.local` file (never commit it):

```env
APP_NAME=ezyLegal
RAZORPAY_KEY_ID=your_razorpay_test_key_id
RAZORPAY_SECRET=your_razorpay_test_secret
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run fetch-data` | Fetch static data from WordPress into `json-data/` |
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm start` | Run the production build |

## Project structure

```
api/          API helpers
components/   UI components
constants/    Shared constants
dtos/         TypeScript data types
json-data/    Data fetched from WordPress
pages/        Routes: home, category, blogs, checkout, dashboard, join-our-network
redux/        Store, actions and reducers
styled/ theme/ styles/   Styling
utils/        Utilities
```
