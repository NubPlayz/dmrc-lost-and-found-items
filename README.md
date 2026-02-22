# DMRC MetroFinder

[![readme style](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg)](https://github.com/richardschneider/common-readme)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/your-username/your-repo/graphs/commit-activity)
[![GitHub Actions](https://img.shields.io/badge/Data%20Sync-Automated-blue.svg)](https://github.com/your-username/your-repo/actions)

A high-performance search engine for the Delhi Metro Rail Corporation (DMRC) database. This tool enables multi-parameter filtering across the entire station network, updated daily via automated pipelines.

https://metro-finder-lost-items.vercel.app

## Live Demo



https://github.com/user-attachments/assets/842ba00a-bcb2-499c-96de-13671b3252a0


## Key Features
* **Dynamic Filtering:** Query the database by Station Name, Line Color, or Data Attributes in any combination.
* **Cron-Job Updates:** Powered by GitHub Actions to fetch the latest data from the official DMRC API every 24 hours.
* **Lightweight:** Built for speed and low-bandwidth environments.

## Tech Stack
* **Frontend:** [React / Next.js]
* **Backend:** [Nextjs / Nodejs]
* **Automation:** GitHub Actions (Cron)
* **Data Source:** Official DMRC API
* **Package Manager:** PNPM 

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/NubPlayz/MetroFinder-Lost-Items
   pnpm install
   pnpm run dev
