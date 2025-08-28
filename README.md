# 💰 Daily Kharch Tracker

A simple **Expense Tracking Web App** built with **Node.js, Express, MongoDB, and EJS**.
This app helps you manage and track your daily expenses with category-wise filtering, total expense calculation, and clean UI.

---

## 🚀 Features

* ➕ Add new expenses with **Title, Amount, and Category**
* 📊 View all expenses in a table
* 🔎 Search & filter expenses by **category**
* 💵 Auto-calculates **Total Expense**
* 🗑️ API support for adding and deleting expenses
* 🎨 Clean and responsive UI using **EJS templates**

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Templating Engine:** EJS
* **Frontend:** HTML, CSS (inline styling with custom UI)

---

## 📂 Project Structure

```
Expense-Node-App/
│── views/                # EJS templates (UI files)
│   ├── expense.ejs       # Main expense listing page
│   ├── add-expense.ejs   # Add expense form
│
│── server.js             # Express server & routes
│── package.json          # Project dependencies
│── README.md             # Documentation
```

---

## ⚡ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/Rakshitsen/Expense-Node-App.git
cd Expense-Node-App
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup MongoDB

* Make sure MongoDB is running locally (`mongodb://localhost:27017`)
* Default DB: `project`
* Collection: `expense`

### 4. Run the app

```bash
node server.js
```

Now visit: **[http://localhost:3000](http://localhost:3000)** 🚀

---

## 📡 API Endpoints

| Method | Endpoint          | Description                 |
| ------ | ----------------- | --------------------------- |
| GET    | `/api`            | Get all expenses            |
| POST   | `/add-api`        | Add new expense (JSON body) |
| DELETE | `/delete-api/:id` | Delete expense by ID        |

---


---

🚀 Future Enhancements

User Authentication:
Add secure user login & registration using JWT/bcrypt to protect routes and personalize user experience.

Multi-user Support:
Convert app into a multi-user system where each user can manage their own data independently.

Role-based Access Control (RBAC):
Introduce roles (Admin, User) for better data and permission management.

---

## 👨‍💻 Author

**Rakshit Sen**

* 🌐 [LinkedIn](https://www.linkedin.com/in/rakshit-sen-0171501b1/)
* 📧 [rakshitsen1@gmail.com](mailto:rakshitsen1@gmail.com)

---

