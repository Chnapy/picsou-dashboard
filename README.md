# picsou-dashboard

Dashboard to see all personal financial investments on a single-page, with charts, basic balance sheet, progress in time.

Kind of investments handled:
- Cash (banks)
- Market (stock actions)
- Gold

// TODO picture of mobile app

## Security & confidentiality

This app shows and store sensitive personal data.
To avoid any security risk some choices were made:
- Backend part is handled by Firebase (Google secure serverless solution), with strict access rules.
- You have to fork this repo, with your own firebase backend. I will never receive any data from your app*. You keep all control.
- App access rules uses a "whitelist" where you have to specify which ones can use the app (it can be only you).

*Note that some external services are used (like investing.com unofficial API) which are used to get some fresh data (current stock price, gold price, etc). 

// TODO list these services, and data sent

You can see database rules [here](./packages/fire-functions/database.rules.json). They allow database access only on auth users that are in the whitelist.

## Setup

// TODO:
- fork
- firebase setup
- config variables/files/secrets
- security concerns (rules, whitelist)
