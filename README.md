
<p align="center">
    <img width="200" src="packages\frontend\public\logo384.png" alt="Picsou logo" />
</p>

<h1 align="center">Picsou dashboard</h1>

<h6 align="center">
    <a href="https://picsou-dashboard.web.app">PREVIEW</a>
</h6>

A dashboard to see all your financial investments on one place, for mobile & desktop.

- Handle these kind of value:
  - :bank: **cash** (banks)
  - :chart_with_upwards_trend: **market** (stock actions)
  - :stars: **gold** ([Bullion Vault](https://www.bullionvault.com/))
- Show values evolution in time: **gains & losses**
- See estimation of total of your investments
- :chart: Check values histories with **charts**
- Add and edit values at any time
- :lock: **Security & confidentiality**: check below
- :iphone: **Mobile first**, but also for desktop
- **PWA compliant**, you can install this app then use it like a mobile app, or desktop one
- Preview mode with fake data, to show the concept to your best friends
- Used by Balthazar Picsou himself

:warning: **This is a read-only app.** You cannot buy/sell stock actions, gold, or manipulate your bank account: you're seeing changes, not doing them. 

<p align="center">
<span style="padding: 10px">
    <img width="300" src="gh-assets\screenshot-mobile.png" alt="Mobile screenshot" />
    </span>
<span style="padding: 10px">
    <img width="300" src="gh-assets\screenshot-mobile-chart.png" alt="Mobile screenshot for chart" />
    </span>
</p>

## :lock: Security & confidentiality

This app shows and store sensitive personal data.
To avoid any security risk some choices were made:

- **On-Premise** - Backend part is handled by Firebase (Google secure serverless solution), with strict access rules.
You have to use **your** Firebase account, so all your data stay in your hands.
You just have to be ok with Google confidentiality policy.

- **Whitelist-based** - App access rules allow only users you specified (it can be only you).

You can see database rules [here](./database.rules.json). They allow database access only on auth users that are in the whitelist.

Some external services are used to get fresh data (current stock price, gold price, etc). More infos below.

## Setup

// TODO explain:
- fork
- firebase setup
- config variables/files/secrets
- security concerns (rules, whitelist)


## :scroll: External API & services used

### Market: investing.com (unofficial API)

Data that can be send:
- ID representing stock action
- Search term (from edit dialog)

### Gold: bullionvault.com (unofficial API)

Data that can be send: none.

### Cash: linxo.com (scraping)

This one is quite specific. There is no common free API to fetch all banks data, so a bank account aggregator is used instead: Linxo. This service does not provide a free API, so its website is scraped every day to get all accounts infos.

Note that using this feature requires a Linxo account, and to put credentials in the app (in secret).

Data that can be send:
- Linxo credentials (used only for authentication)

## :penguin: I have questions

Don't be shy, [fill an issue](https://github.com/Chnapy/picsou-dashboard/issues/new/choose) !