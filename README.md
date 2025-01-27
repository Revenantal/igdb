# IGDB Database
IGDB Database is learning project used to explore the vast data stored within [IGDB](https://www.igdb.com/). This project is an early attempt at gaining further experince with the Next.Js, and React ecosystem.

## Demo
This project can be viewed at https://igdb-nu.vercel.app/.

## Set Up
To get this project running locally a Vercel Account will be required with a Edge Config Store. Setup can be achieved with the following steps.

1. Duplicate `.env.example` to `.env.development.local`
2. Review `.env.development.local` and place the relevant config values in here.
    - `EDGE_CONFIG` - [Read More Here](https://vercel.com/docs/storage/edge-config)
    - `EDGE_CONFIG_ID` - [Read More Here](https://vercel.com/docs/storage/edge-config)
    - `VERCEL_TOKEN` - [Read More Here](https://vercel.com/guides/how-do-i-use-a-vercel-api-access-token)
    - `TWITCH_CLIENT_ID` - [Read More Here](https://api-docs.igdb.com/#account-creation)
    - `TWITCH_CLIENT_SECRET` - [Read More Here](https://api-docs.igdb.com/#account-creation)
3. Run `npm install`
4. Run `npm run dev`
5. Go to https://localhost:3000

## Objectives
Primarily this project is being used to gain refine my abilities in the modern development world with a focus of using the latest and greatest technology (at this current time) and deploying them in a practical and usable application.

The nightly branch has been left in place for your entertainment and to follow my learning.