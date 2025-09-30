📊 Crypto Dashboard

An Angular-based dashboard that fetches and displays live cryptocurrency market data (top 10 coins by market cap or searched coins) from the CoinGecko API
.
It includes real-time polling, a search function, and sparkline charts for price trends.

🚀 Features

🔄 Polling every 30 seconds to keep data fresh

🔍 Search for cryptocurrencies by name (partial matches supported)

📈 Mini sparklines (powered by Chart.js) inside table cells

🎨 Responsive design with TailwindCSS

📦 Modular Angular architecture with reusable components

🏗️ Architecture

The project is structured for scalability and clarity:

DashboardComponent  :  Acts as the container for the table and search components & Handles polling logic (start/stop)

Passes data to the table

CryptoTableComponent

Displays data in a responsive table

Dynamically renders headers

Shows sparkline charts inside table cells

SearchComponent

Provides an input for searching cryptos by name (real-time search as you type)

Emits events back to DashboardComponent

Includes a Clear button

PriceChartComponent

A lightweight wrapper around Chart.js

Renders sparklines (line charts with no axes/legend)

Fully reusable in different contexts

TopcryptoService

Handles all API requests

Two main methods:

getTop10Coins() → Fetches top 10 by market cap

searchCoins(query) → Fetches coins by name (partial matches)

Includes headers with API key

📦 Libraries Used

Angular 18 – Frontend framework

RxJS – For polling with interval, switchMap

HttpClientModule – API requests

Chart.js – Sparkline rendering (with a custom wrapper component)

TailwindCSS – Styling and responsive design

⚙️ Setup & Run
1. Clone the repo
git clone https://github.com/MohammedZareefAbotaleb/crypto-dashboard.git

cd crypto-dashboard

2. Install dependencies
npm install

3. Run the app
ng serve


App runs at http://localhost:4200

📝 Notes on Decisions

Custom Chart Wrapper: Instead of ng2-charts, we use a custom wrapper around Chart.js for more control and less dependency risk.

Polling: Implemented with RxJS interval + switchMap to keep data in sync without page reload.

Search: Emits user queries to DashboardComponent so the same polling mechanism works for both top 10 and searched data.

Styling: TailwindCSS chosen for quick, responsive design and utility-first classes.

Dynamic Table Headers: Driven by a headers array, making the table easy to extend.