# DMRC MetroFinder


[![GitHub Actions](https://img.shields.io/badge/Data%20Sync-Automated-blue.svg)](https://github.com/your-username/your-repo/actions)
![PNPM](https://img.shields.io/badge/PNPM-Package%20Manager-orange)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-Cron%20Enabled-blue)
![Auto Update](https://img.shields.io/badge/Data%20Update-Daily-green)
![CI/CD](https://img.shields.io/badge/CI%2FCD-Enabled-brightgreen)
![Civic Tech](https://img.shields.io/badge/Domain-Civic%20Tech-purple)
![Delhi Metro](https://img.shields.io/badge/System-Delhi%20Metro-red)
![Mobile Friendly](https://img.shields.io/badge/Mobile-Friendly-blue)

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
