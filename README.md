# ROAMMATE

## Table of Contents

1. [🚀 Motivation](#-motivation)
2. [🧱 Build Status](#-build-status)
3. [🎨 Code Style](#-code-style)
4. [📸 Screenshots](#screenshots)
5. [⚒️ Tech and Frameworks used](#%EF%B8%8F-tech-and-frameworks-used)
6. [🔥 Features](#-features--screenshots)
7. [💻 Code Examples](#-code-examples)
8. [⚙️ Installation](#%EF%B8%8F-installation)
9. [📚 API Reference](#-api-reference)
10. [🧪 Tests](#-tests)
11. [🧑🏻‍🏫 How to Use](#-how-to-use)
12. [🤝 Contribute](#-contribute)
13. [©️ Credits](#-credits)
14. [📜 License](#-license)

## 🚀 Motivation

The Virtual Trip Planner is an all-in-one travel platform that aims to simplify and enhance vacation planning. Whether you’re exploring historical landmarks, unwinding on tranquil beaches, or seeking thrilling adventures, this app caters to all your travel needs. Its goal is to provide a seamless, intuitive, and enjoyable experience for tourists, advertisers, tour guides, sellers, and administrators.

## 🧱 Build Status

- The project is currently in development.
- Code optimization for faster load times is planned.
- Performance testing is underway to ensure scalability
- A CI/CD pipeline needs to be implemented.
- The project needs to be deployed through cloud services.
- More documentation should be added


## 🎨 Code Style
- [Prettier](https://prettier.io/) : it is a code formatter that runs automatically before each commit on the whole code so that the codes looks well formatted across the whole project

## 📸 Screenshots


## ⚒️ Tech and Frameworks used

<div align="center" >

[![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)](https://www.javascript.com)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://html.com/html5/)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
[![ExpressJs](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/en/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Stripe](https://img.shields.io/badge/Stripe-6772E5?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com)
[![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)](https://jwt.io/)
[![Nodemailer](https://img.shields.io/badge/Nodemailer-4EA94B?style=for-the-badge&logo=npm&logoColor=white)](https://nodemailer.com/)
[![Axios](https://img.shields.io/badge/Axios-4EA94B?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com/)
[![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)](https://mui.com/)
[![Chart.js](https://img.shields.io/badge/Chart.js-F5788D?style=for-the-badge&logo=chartdotjs&logoColor=white)](https://www.chartjs.org/)
[![Postman](https://img.shields.io/badge/Postman-FD602F?style=for-the-badge&logo=postman&logoColor=white)](https://www.postman.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

</div>

- **Backend**: Node.js, Express, Mongoose, JWT, Axios, Nodemailer, Cron
- **Frontend**: React.js, Material-UI, React-Router, Chart.js, Framer-Motion
- **Database**: MongoDB
- **Authentication**: JWT
- **APIs**: Stripe, Amadeus API
- **Development Tools**: Postman, Nodemon, Vite, Prettier


## 🔥 Features

<details>
<summary>Admin</summary>

- **User Management**: Approve or reject registrations for tour guides, advertisers, sellers, and tourism governors based on uploaded documents. Add new admins or tourism governors to the system.
- **Content Moderation**: Review, flag, or remove inappropriate events, itineraries, or other activities. Manage activity categories, preference tags, and historical location tags.
- **Complaint Handling**: Access, review, and respond to complaints. Mark complaints as resolved or pending and filter them by status or date.
- **Performance Monitoring**: Track the total number of users, new user registrations per month, and system-wide revenue trends through detailed sales reports.
- **System-Wide Insights**: Analyze system activities and generate reports for events, itineraries, and sales for enhanced decision-making.
- **Stock and Product Management**: View and manage inventory levels for all sellers' products, monitor sales trends, and track product performance.
- **User Interaction**: Communicate with users regarding flagged content, account deletions, or complaint resolutions.

</details>

<details>
<summary>Tourist</summary>

- **User Profile & Preferences**: Update profile, set preferences (budget, family-friendly, historic areas, etc.), and view wallet.
- **Booking & Payment**: Book activities, itineraries, or transportation and pay using credit/debit or wallet with Stripe integration.
- **Event & Itinerary Management**: View, bookmark, or filter upcoming activities and itineraries; receive notifications for bookings and reminders.
- **Engagement & Feedback**: Rate, comment on, and share activities, itineraries, and guides; redeem loyalty points for cash in wallet.
- **History & Cancellation**: View past and upcoming bookings; cancel bookings (with refunds to wallet) and track cancellation status.
- **Complaint System**: File complaints with details and track resolution status.
- **Exclusive Rewards**: Earn loyalty points and badges for participation and purchases.

</details>

<details>
<summary>Seller</summary>

- **Profile Management**: Create, update, and manage a seller profile, including descriptions, and upload images to showcase products effectively.
- **Product Management**: Add, update, and delete products, including details like name, price, description, and images, with the ability to manage stock levels.
- **Sales Insights**: View and filter sales reports by product, date, or month, and track revenue trends.
- **Customer Interaction**: Respond to tourist inquiries or feedback related to products.
- **Stock Monitoring**: Receive low-stock notifications to restock promptly and ensure availability.
- **Revenue Tracking**: Access detailed sales reports showing performance metrics for each product.
- **Compliance with Admin**: Collaborate with the admin to ensure product approval and adherence to guidelines.

</details>

<details>
<summary>Tourism Governor</summary>

- **Historical Site Management**: Create, update, and manage museums and historical places, including descriptions, pictures, locations, opening hours, and ticket prices.
- **Tagging System**: Assign tags to historical locations based on type, historical period, or other defining characteristics.
- **Activity Review**: Monitor and manage activities or itineraries related to historical places in collaboration with tour guides and advertisers.
- **Performance Reports**: Generate reports to analyze visitor engagement with museums and historical places.
- **Collaboration**: Coordinate with admins, tour guides, and advertisers for better management and promotion of cultural and historical tourism.

</details>

<details>
<summary>Advertiser</summary>

- **Profile Setup & Updates**: Create and manage a comprehensive profile including company details, website links, hotline, and other contact information.
- **Activity Management**: Create, update, and delete activities with details like date, time, location (via Google Maps), pricing, categories, tags, and special discounts.
- **Sales Insights & Reporting**: View and filter sales reports by activity or date and analyze tourist attendance for events.
- **Flagging & Notifications**: Receive alerts if an event is flagged as inappropriate by the admin, both in-app and via email.
- **Event Visibility & Filtering**: Ensure activities are visible to users through category, tag, and budget filters.

</details>

<details>
<summary>Tour Guide</summary>

- **Comprehensive Profile Management**: Set up and manage a profile with personal details, years of experience, past projects, and uploaded documents.
- **Itinerary Creation & Management**: Design, update, and manage detailed itineraries, including activities, locations, pricing, and availability.
- **Booking & Accessibility Control**: Handle itinerary bookings, activate/deactivate itineraries, and ensure accessibility features for tourists.
- **Sales Tracking & Reporting**: Monitor sales reports, filter by date or itinerary, and view tourist engagement statistics.
- **Feedback System**: Access tourist ratings and comments for improvement and reputation building.
- **Notifications**: Get alerted via email and app for flagged itineraries or system updates.

</details>


## 💻 Code Examples

## ⚙️ Installation

### Clone the repository:

   bash
   git clone https://github.com/Advanced-computer-lab-2024/Roammate.git
   cd 
`

### Install backend dependencies

bash
cd backend
npm install



### Install frontend dependencies

bash
cd ../frontend
npm install

## 📚 API Reference

## 🧪 Testing

## 🧑🏻‍🏫 How to Use

- Make sure to follow the [Installation](#-installation) steps first.

- Add a `.env` file in the `backend` directory of the project with the following variables (replace the values with your own):

```bash
PORT=8000
MONGO_URI="mongodb+srv://<your_username>:<your_password>@cluster0.ls7js.mongodb.net/Roammate?retryWrites=true&w=majority&appName=Cluster0"
AMADEUS_API_KEY="<Your Amadeus API Key>"
AMADEUS_API_SECRET="<Your Amadeus API Secret>"
JWT_SECRET="<A secret string to use for hashing JWT tokens>"

#### Run the Backend:

```bash
cd backend
node server.js
```

Once started, the backend server will be accessible at http://localhost:8000. This is where all API requests will be handled.

#### Run the Frontend:

```bash
cd frontend
npm run dev
```
The frontend application will run at http://localhost:5173. Open this URL in your browser to interact with the application's user interface.

## 🤝 Contributing

## ©️ Credits

### Docs
- [NodeJs Docs](https://nodejs.org/en/docs/)
- [Mongoose Docs](https://mongoosejs.com/docs/)
- [ReactJs Docs](https://reactjs.org/docs/getting-started.html)

### YouTube Videos
- [JavaScript Full Course](https://youtube.com/playlist?list=PL4cUxeGkcC9haFPT7J25Q9GRB_ZkFrQAc&si=Fm8OY8eQUIbgYweb)
- [NodeJs Crash Course](https://youtube.com/playlist?list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU&si=Zd0vazKdEQBU71Le)
- [ReactJS Crash Course](https://www.youtube.com/watch?v=hQAHSlTtcmY)
- [MERN Stack Development](https://youtube.com/playlist?list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE&si=YcMDQIsWK_dJaqPN)
- [MERN Full Stack Tutorial](https://www.youtube.com/watch?v=O3BUHwfHf84)
- [Stripe Integration](https://youtu.be/1r-F3FIONl8)
- [JWT Authentication Tutorial](https://www.youtube.com/watch?v=mbsmsi7l3r4)

## 📜 License

This software is licensed under the [GNU General Public License v3.0](https://choosealicense.com/licenses/gpl-3.0/).

Note: This project integrates with Stripe for payment processing. Portions of the Stripe software may be licensed under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0). Please refer to Stripe's documentation for further details.
