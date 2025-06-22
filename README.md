# 🍃 Vaayu – Your Environmental Health Companion

**Vaayu** is a decentralized, AI-powered mobile and web application that empowers individuals—especially those with chronic health conditions—to monitor their environmental exposure and receive actionable health guidance based on real-time air quality data.

---

## 🚨 The Problem It Solves

India is facing a growing **public health crisis** due to **air pollution**. In 2024–25, cities like Delhi recorded AQI in the *“severe”* category for weeks at a time, resulting in:

- ❌ School closures and public health emergencies  
- ⚠️ Over 2.3 million pollution-related premature deaths *(The Lancet, 2025)*  
- 🚫 Lack of tools offering personalized, real-time environmental health guidance  

Most existing solutions are either:
- Static AQI display apps
- Generic wellness trackers  
They **fail to connect** real-world environmental conditions with **individualized health needs**.

---

## 💡 What You Can Use Vaayu For

### 📍 Live AQI Alerts & Safe Zone Mapping
- Real-time **AQI alerts** based on your **GPS location**
- Map view of surroundings by AQI category (green, yellow, red)
- Distance calculation to nearest unsafe zone

### 🧠 Personalized Health Recommendations (AI + Blockchain)
- Login securely using **Civic Auth**
- Input profile details: age, gender, sleep cycle, walking habits
- Data stored on **Aptos blockchain** for **ownership & privacy**
- **AI-powered suggestions** based on habits + AQI data  
  > “You usually walk to the mosque at 5 PM, but AQI is severe then. Try 6 AM instead.”

### ✅ Daily Health Challenges & Rewards
- Tasks like:
  - 💧 Drink 3 liters of water  
  - 🚶 Walk 3000 steps daily  
- Earn **Green Tokens** 🪙 for completing them

### 🛍️ Green Token Redemption 
- Redeem tokens for:
  - Eco-friendly products
  - Partner brand discounts
  - Sponsored health services

### 📊 Lifestyle Analytics & Health Score
- Tracks:
  - Task completion  
  - Daily consistency
- Generates dynamic **health score**
- Visualizes long-term patterns between **health habits & pollution exposure**

---

## 🔐 Why Vaayu is Unique

| Feature | Description |
|--------|-------------|
| 🌐 **Civic Auth** | Decentralized digital identity for secure, passwordless login |
| 🔗 **Aptos Blockchain** | User health data stored on-chain, owned by the user |
| 🤖 **AI-Generated Advice** | Personalized suggestions using Gemini-powered ML |
| 📍 **GPS + AQI Mapping** | Dynamic heatmaps and location-based alerts |
| 🪙 **Green Tokens** | Gamified system to reward healthy behaviors |
| 📱 **Cross-Platform** | Built for both **Web (Next.js)** and **Mobile (React Native)** |

---

## 🧠 Architecture Overview

- 🧾 **Frontend**  
  - `React Native` (mobile)
  - `Next.js` (web + backend handling)
  - `Tailwind CSS` + `shadcn-ui`

- 🔐 **Authentication**  
  - Civic SDK for identity verification
  - JWT tokens to maintain secure sessions

- 🔗 **Blockchain Integration**  
  - Health profile stored as smart contract resource on **Aptos**
  - Blockchain interactions handled via a **Next.js backend**

- 🌍 **Live AQI Integration**  
  - AQICN API for real-time air quality data
  - GPS used to match user location with nearby pollution zones

- 🧠 **AI Engine**  
  - Gemini for behavior-aware, contextual advice

---

## 🛠️ How to Run Locally

### 🔧 Prerequisites
- Node.js v18+
- pnpm
- Civic Wallet app (for login)
- AQICN API key

### 📥 Installation

```bash
git clone https://github.com/your-username/vaayu.git
cd vaayu
pnpm install

Sure! Here's a **single complete `README.md` section** written in clean **Markdown** for the parts you asked:

---

````markdown
## 🌱 Setup `.env.local`

To fetch real-time AQI data, create a `.env.local` file in the root directory and add your AQICN API token:

```env
NEXT_PUBLIC_AQICN_TOKEN=your_api_token_here
````

---

## ▶️ Run the Dev Server

Start the development server using the following command:

```bash
pnpm dev
```

Then open your browser and visit:

```
http://localhost:3000
```

---

## 🗂️ Project Structure

```bash
/app                 → Next.js app routes (dashboard, login, onboarding)
/api                 → API handlers (e.g. Civic authentication)
/components          → Shared UI components
/ui                  → shadcn-ui based design system
/lib
  ├─ aptos.ts        → Blockchain functions (wallet, transactions)
  └─ civic.ts        → Civic auth utilities
/sources
  └─ onboarding.move → Move smart contract for storing health profiles
```

---

## 🧩 Technologies Used

* **Frontend**: React Native, Next.js
* **Styling**: Tailwind CSS, shadcn-ui
* **Authentication**: Civic
* **Blockchain**: Aptos + Move smart contracts
* **Data Fetching**: Fetch API, SWR
* **AI**: Gemini for ML-powered health recommendations
* **Location**: GPS + AQICN API (for real-time AQI data)

---

## ⚠️ Technical Challenges & Solutions

### 1. Civic Auth in React Native

**Issue**: Civic SDK lacks official support for React Native
✅ **Solution**: Reverse-engineered web SDK, implemented custom JWT parsing and secure redirects manually.

### 2. Aptos Integration on Mobile

**Issue**: No React Native-compatible libraries for Aptos blockchain
✅ **Solution**: Offloaded blockchain operations to a Next.js backend and communicated via secure REST APIs.

### 3. Real-Time AQI Mapping

**Issue**: Frequent GPS updates caused API lags and performance issues
✅ **Solution**: Optimized with throttled API polling, clustering, and heatmap-based visualization.

---

## 🤝 Contributing

We welcome contributions!

* Open an issue
* Submit a pull request
* Suggest new features or integrations

---

## 📄 License

This project is licensed under the **MIT License**.
See the `LICENSE` file for details.

---

## 🌍 Made with ❤️ for cleaner air and healthier lives by Code Crusaders.



