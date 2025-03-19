<h1 align="center">StatOracle</h1>
<p align="center">
  <strong>AI-Powered Sports Analytics for Youth Teams</strong><br>
  Unlock elite-level insights with cutting-edge <b>YOLOv8-powered computer vision</b> and <b>data-driven intelligence</b>—all tailored for youth sports teams and organizations.<br>
  <a href="https://statoracle.org">Visit Website</a>
</p>

---

## 🚀 **Overview**

StatOracle is revolutionizing **youth sports analytics** through **AI-driven, computer vision-powered insights** that **transform raw video and numerical data into actionable performance metrics**.

Using **YOLOv8 + OpenCV**, we provide **real-time tracking, AI-powered player analysis, and advanced decision-making insights** to help **athletes and coaches optimize performance**.

💡 **Our mission**: Make **elite-level sports analytics accessible** to youth teams, offering powerful insights that were previously **only available to professionals**.

---

### 🎯 **What Makes StatOracle Unique?**
- ✅ **AI-Powered Video Analysis** – Detect and track **players, ball movement, and game patterns** with **YOLOv8 & OpenCV**.
- ✅ **Custom Performance Metrics** – Get insights like **fatigue impact, shot effectiveness, reaction times, and strategic decision-making**.
- ✅ **Coach & Athlete-Friendly Reports** – Clear, actionable data that enhances **training, tactics, and game strategy**.
- ✅ **Affordable & Accessible** – Advanced sports analytics at **a fraction of the cost** of professional-grade tools.
- ✅ **Multi-Sport Ready** – Starting with **tennis**, with planned expansions into **soccer, basketball, and more**.

---

## 🏆 **Features & Capabilities**

### 🎥 **YOLOv8-Powered Real-Time Tracking**
✅ **Object detection & tracking** for **players, ball, and key movements**.
✅ **Automated game breakdown** with **precision movement tracking**.
✅ **Predictive play analysis** using **historical movement trends**.

<p align="center">
  <img src="https://github.com/user-attachments/assets/yolo-tracking.gif" alt="YOLOv8 Tracking in Sports" width="600">
</p>

---

### 📊 **AI-Driven Player Performance Insights**
✅ **Shot Accuracy & Effectiveness** – Analyze **placement, power, and success rates** in different **game scenarios**.
✅ **Movement Heatmaps** – Track player positioning and **optimize movement efficiency**.
✅ **Reaction Time & Decision Making** – Identify how quickly players react **under pressure**.

<p align="center">
  <img src="https://github.com/user-attachments/assets/performance-insights.png" alt="Performance Insights Dashboard" width="600">
</p>

---

### 🎾 **Sport-Specific Analytics**
✅ **Tennis** – Shot effectiveness by set, opponent patterns, rally success rates.
✅ **Soccer** – Pass accuracy under pressure, sprint efficiency, fatigue analysis.
✅ **Basketball** – Shot arc optimization, fast-break effectiveness, defensive reaction times.

<p align="center">
  <img src="https://github.com/user-attachments/assets/sport-specific-metrics.png" alt="Sport-Specific Metrics" width="600">
</p>

---

### 📈 **Custom Reports for Coaches & Players**
✅ **Intuitive Dashboards** – Clear data-driven insights **without complex graphs**.
✅ **Custom Play Recommendations** – AI-generated **game plans** based on past performance.
✅ **Progress Tracking** – Compare **long-term player development trends**.

<p align="center">
  <img src="https://github.com/user-attachments/assets/reports-dashboard.png" alt="Custom Reports" width="600">
</p>

---

## 📌 **Join the Waitlist**
🚀 **Be the first to access AI-powered sports analytics!**
🔗 **[Join the Waitlist Now](https://statoracle.ai/waitlist)**

---

## 🏗 **How We Built It**

> *A quick look at the core technologies powering StatOracle.*

| **Category** | **Technologies** |
|:------------|:----------------:|
| **Frontend** | ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-C0C0C0?style=for-the-badge&logo=tailwind-css&logoColor=06B6D4) |
| **Computer Vision** | ![YOLOv8](https://img.shields.io/badge/YOLOv8-FF0000?style=for-the-badge) ![OpenCV](https://img.shields.io/badge/OpenCV-5C3EE8?style=for-the-badge&logo=opencv&logoColor=white) |
| **Backend** | ![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white) |
| **Data Processing** | ![Pandas](https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=white) ![NumPy](https://img.shields.io/badge/NumPy-013243?style=for-the-badge&logo=numpy&logoColor=white) |
| **Authentication** | ![Auth.js](https://img.shields.io/badge/Auth.js-000000?style=for-the-badge) |

---

## 📌 **Setup Instructions**

### **Step 1: Clone the Repository**
```bash
git clone https://github.com/statoracle/StatOracle.git
cd StatOracle
```

### **Step 2: Install Dependencies**
#### For Windows (setup.bat)
```sh
./setup.bat
```
#### For Mac/Linux (setup.sh)
```sh
chmod +x setup.sh
./setup.sh
```

### **Step 3: Configure Environment Variables**
Rename `.env.example` to `.env` and fill in **your API keys**:
```sh
cp .env.example .env
```
You'll need:
- OpenAI API Key (if applicable)
- Database connection URL
- Authentication secret keys

### **Step 4: Start the Application**
```bash
pnpm dev
# or
npm run dev
```

### **Step 5: Run YOLOv8 Model (Optional)**
```bash
python scripts/yolo_tracking.py --input video.mp4 --output output.mp4
```
> *Ensure `models/yolov8_weights.pt` is downloaded.*

### **Step 6: Access the App**
Go to:
🌍 **http://localhost:3000**

---

## 🔮 **The Future of StatOracle**
🚀 **What’s Next?**
- **Live In-Game Analysis** – Real-time decision-making insights during matches.
- **Mobile App** – Bringing **AI analytics on-the-go**.
- **Expanded Multi-Sport Models** – Support for **basketball, soccer, and football**.

📌 **Want to collaborate?**
We’re looking for **engineers, sports analysts, and data scientists** to **join the revolution**.

📩 **Contact Us:**
📧 team@statoracle.ai
🌍 [Visit Our Website](https://statoracle.ai)

---

## 🎮 **Join the AI Sports Revolution**
🔗 **[Join the Waitlist Now](https://statoracle.ai/waitlist)**

<p align="center">
  <a href="https://nextjs.org/">Next.js</a> •
  <a href="https://ultralytics.com/yolov8">YOLOv8</a> •
  <a href="https://opencv.org/">OpenCV</a> •
  <a href="https://pytorch.org/">PyTorch</a>
</p>
