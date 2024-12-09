# R🌎AMMATE

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
<details>
<summary>User Management</summary>

| HTTP Method | Endpoint                | Description                                | Parameters      |
|-------------|-------------------------|--------------------------------------------|-----------------|
| GET         | `/users`                | Get all users                              | None            |
| DELETE      | `/users/:id`            | Delete a user by ID                        | `id`            |
| PATCH       | `/users/status`         | Update the status of all users             | None            |
| PATCH       | `/users/status/:id`     | Update the status of a specific user       | `id`            |
| GET         | `/users/status/:id`     | Get the status of a specific user          | `id`            |
| GET         | `/users/pending`        | Get all users with 'Pending' status        | None            |
| GET         | `/users/notifications/:id` | Get all notifications for a user         | `id`            |
| PATCH       | `/users/notifications/:id` | Mark all notifications as read for a user | `id`            |
| POST        | `/users/forgot-password` | Forgot password for a user                | None            |
| POST        | `/users/verify-otp`     | Verify OTP for a user                      | None            |
| POST        | `/users/reset-password` | Reset password for a user                  | None            |

</details>

<details>
<summary>Admin Management</summary>

| HTTP Method | Endpoint        | Description                  | Parameters |
|-------------|-----------------|------------------------------|------------|
| POST        | `/admin`        | Add a new admin              | None       |
| GET         | `/admin/:id`    | Get admin by ID              | `id`       |
| PATCH       | `/admin/:id`    | Update admin by ID           | `id`       |
| GET         | `/admin`        | Get all admins               | None       |
| DELETE      | `/admin/:id`    | Delete an admin by ID        | `id`       |

</details>

<details>
<summary>Advertiser Management</summary>

| HTTP Method | Endpoint                          | Description                                     | Parameters |
|-------------|-----------------------------------|-------------------------------------------------|------------|
| POST        | `/advertiser`                    | Register a new advertiser                      | None       |
| GET         | `/advertiser/:id`                | Get advertiser by ID                           | `id`       |
| PATCH       | `/advertiser/:id`                | Update advertiser by ID                        | `id`       |
| GET         | `/advertiser`                    | Get all advertisers                            | None       |
| POST        | `/advertiser/identification/upload` | Upload identification for advertiser          | None       |
| POST        | `/advertiser/taxation/upload`    | Upload taxation document for advertiser        | None       |
| POST        | `/advertiser/logo/upload`        | Upload logo for advertiser                     | None       |
| DELETE      | `/request-delete-advertiser/:id` | Request advertiser deletion if no bookings     | `id`       |

</details>

<details>
<summary>Seller Management</summary>

| HTTP Method | Endpoint                         | Description                                     | Parameters |
|-------------|----------------------------------|-------------------------------------------------|------------|
| POST        | `/seller`                       | Register a new seller                          | None       |
| GET         | `/seller/:id`                   | Get seller by ID                               | `id`       |
| PATCH       | `/seller/:id`                   | Update seller by ID                            | `id`       |
| GET         | `/seller`                       | Get all sellers                                | None       |
| POST        | `/seller/identification/upload` | Upload identification for seller              | None       |
| POST        | `/seller/taxation/upload`       | Upload taxation document for seller           | None       |
| POST        | `/seller/logo/upload`           | Upload logo for seller                         | None       |
| DELETE      | `/request-delete-seller/:id`    | Request seller deletion if no upcoming products| `id`       |

</details>

<details>
<summary>Tourist Management</summary>

| HTTP Method | Endpoint                        | Description                                     | Parameters |
|-------------|---------------------------------|-------------------------------------------------|------------|
| POST        | `/tourist`                     | Register a new tourist                         | None       |
| GET         | `/tourist/:id`                 | Get tourist by ID                              | `id`       |
| PATCH       | `/tourist/:id`                 | Update tourist by ID                           | `id`       |
| GET         | `/tourist`                     | Get all tourists                               | None       |
| DELETE      | `/request-delete-tourist/:id`  | Request tourist deletion if no bookings        | `id`       |

</details>
<details>
<summary>Tourism Governor Management</summary>

| HTTP Method | Endpoint                | Description                          | Parameters |
|-------------|-------------------------|--------------------------------------|------------|
| POST        | `/tourismGovernor`      | Add a new tourism governor           | None       |
| GET         | `/tourismGovernor`      | Get all tourism governors            | None       |
| GET         | `/tourismGovernor/:id`  | Get tourism governor by ID           | `id`       |
| PATCH       | `/tourismGovernor/:id`  | Update tourism governor by ID        | `id`       |

</details>

<details>
<summary>Tour Guide Management</summary>

| HTTP Method | Endpoint                          | Description                                | Parameters |
|-------------|-----------------------------------|--------------------------------------------|------------|
| POST        | `/tourGuide`                     | Register a new tour guide                  | None       |
| GET         | `/tourGuide/:id`                 | Get tour guide by ID                       | `id`       |
| PATCH       | `/tourGuide/:id`                 | Update tour guide by ID                    | `id`       |
| GET         | `/tourGuide`                     | Get all tour guides                        | None       |
| POST        | `/tourGuide/identification/upload` | Upload identification for tour guide       | None       |
| POST        | `/tourGuide/certificate/upload`  | Upload certificate for tour guide          | None       |
| POST        | `/tourGuide/photo/upload`        | Upload photo for tour guide                | None       |
| POST        | `/tourGuide/review/:id`          | Add review for a tour guide                | `id`       |
| DELETE      | `/request-delete-tourguide/:id`  | Request tour guide deletion if no bookings | `id`       |

</details>

<details>
<summary>Product Management</summary>

| HTTP Method | Endpoint                          | Description                                | Parameters |
|-------------|-----------------------------------|--------------------------------------------|------------|
| POST        | `/product`                       | Add a new product                          | None       |
| GET         | `/product`                       | Get all products                           | None       |
| GET         | `/product/:id`                   | Get product by ID                          | `id`       |
| GET         | `/product-seller/:id`            | Get products by seller ID                  | `id`       |
| DELETE      | `/product/:id`                   | Delete product by ID                       | `id`       |
| PATCH       | `/product/:id`                   | Update product by ID                       | `id`       |
| GET         | `/product-search`                | Search products with filters               | None       |
| PUT         | `/product/:id/toggle-archived`   | Toggle archived status of a product        | `id`       |
| GET         | `/product/:id/check-archived`    | Check if a product is archived             | `id`       |
| POST        | `/product/image/upload`          | Upload image for a product                 | None       |
| GET         | `/product/:id/product-sales`     | Get stock and sales of a product           | `id`       |

</details>

<details>
<summary>Activity Management</summary>

| HTTP Method | Endpoint                          | Description                                | Parameters |
|-------------|-----------------------------------|--------------------------------------------|------------|
| POST        | `/activity`                      | Create a new activity                      | None       |
| GET         | `/activity`                      | Get all activities                         | None       |
| GET         | `/activity/:id`                  | Get activity by ID                         | `id`       |
| PATCH       | `/activity/:id`                  | Update activity by ID                      | `id`       |
| DELETE      | `/activity/:id`                  | Delete activity by ID                      | `id`       |
| GET         | `/activity-search`               | Search activities with filters and sorting | None       |
| GET         | `/activity-advertiser/:id`       | Get activities by advertiser ID            | `id`       |
| GET         | `/activity-tourist/:id`          | Get booked activities by tourist ID        | `id`       |
| GET         | `/check-activity-booking/:activityId` | Check if an activity is booked          | `activityId`|

</details>

<details>
<summary>Itinerary Management</summary>

| HTTP Method | Endpoint                          | Description                                | Parameters |
|-------------|-----------------------------------|--------------------------------------------|------------|
| POST        | `/itinerary`                     | Create a new itinerary                     | None       |
| GET         | `/itinerary`                     | Get all itineraries                        | None       |
| GET         | `/itinerary/:id`                 | Get itinerary by ID                        | `id`       |
| PATCH       | `/itinerary/:id`                 | Update itinerary by ID                     | `id`       |
| DELETE      | `/itinerary/:id`                 | Delete itinerary by ID                     | `id`       |
| GET         | `/itinerary-search`              | Search itineraries with filters and sorting| None       |
| GET         | `/itinerary/tourGuide/:id`       | Get itineraries by tour guide ID           | `id`       |

</details>

<details>
<summary>Tags and Categories</summary>

| HTTP Method | Endpoint                          | Description                                | Parameters |
|-------------|-----------------------------------|--------------------------------------------|------------|
| POST        | `/preferenceTags`                | Create a new preference tag                | None       |
| GET         | `/preferenceTags`                | Get all preference tags                    | None       |
| PATCH       | `/preferenceTags/:id`            | Update a preference tag by ID              | `id`       |
| DELETE      | `/preferenceTags/:id`            | Delete a preference tag by ID              | `id`       |
| POST        | `/activityCategory`              | Create a new activity category             | None       |
| GET         | `/activityCategory`              | Get all activity categories                | None       |
| PATCH       | `/activityCategory/:id`          | Update an activity category by ID          | `id`       |
| DELETE      | `/activityCategory/:id`          | Delete an activity category by ID          | `id`       |

</details>

<details>
<summary>Complaints Management</summary>

| HTTP Method | Endpoint                          | Description                                | Parameters |
|-------------|-----------------------------------|--------------------------------------------|------------|
| POST        | `/complaint`                     | Create a new complaint                     | None       |
| GET         | `/complaints`                    | Get all complaints                         | None       |
| GET         | `/complaints/:issuerId`          | Get complaints by issuer ID                | `issuerId` |
| GET         | `/complaint/:id`                 | Get complaint details by ID                | `id`       |
| DELETE      | `/complaint/:id`                 | Delete a complaint by ID                   | `id`       |
| PUT         | `/complaint/:id`                 | Mark a complaint as resolved by ID         | `id`       |

</details>
<details>
<summary>Monument Management</summary>

| HTTP Method | Endpoint                          | Description                                | Parameters |
|-------------|-----------------------------------|--------------------------------------------|------------|
| POST        | `/monument`                      | Create a new monument                      | None       |
| GET         | `/monument`                      | Get all monuments                          | None       |
| GET         | `/monument/:id`                  | Get monument by ID                         | `id`       |
| PATCH       | `/monument/:id`                  | Update a monument by ID                    | `id`       |
| DELETE      | `/monument/:id`                  | Delete a monument by ID                    | `id`       |
| GET         | `/monument-search`               | Search monuments with filters              | None       |
| GET         | `/monument/tourismGovernor/:id`  | Get monuments by tourism governor ID       | `id`       |

</details>

<details>
<summary>Monument Tags Management</summary>

| HTTP Method | Endpoint                          | Description                                | Parameters |
|-------------|-----------------------------------|--------------------------------------------|------------|
| POST        | `/monumentTags`                  | Create a new monument tag                  | None       |
| GET         | `/monumentTags`                  | Get all monument tags                      | None       |
| PATCH       | `/monumentTags/:id`              | Update a monument tag by ID                | `id`       |
| DELETE      | `/monumentTags/:id`              | Delete a monument tag by ID                | `id`       |

</details>

<details>
<summary>Booking Management</summary>

| HTTP Method | Endpoint                          | Description                                | Parameters |
|-------------|-----------------------------------|--------------------------------------------|------------|
| POST        | `/bookActivity`                  | Book an activity                           | None       |
| DELETE      | `/activityBookings/:id`          | Cancel an activity booking                 | `id`       |
| GET         | `/activityBookings/:id`          | Get booked activities for a tourist        | `id`       |
| GET         | `/activityBookings-count/:id`    | Get activity bookings count                | `id`       |
| POST        | `/bookItinerary`                 | Book an itinerary                          | None       |
| DELETE      | `/itineraryBookings/:id`         | Cancel an itinerary booking                | `id`       |
| GET         | `/itineraryBookings/:id`         | Get booked itineraries for a tourist       | `id`       |
| GET         | `/itineraryBookings-count/:id`   | Get itinerary bookings count               | `id`       |

</details>

<details>
<summary>Transportation Management</summary>

| HTTP Method | Endpoint                          | Description                                | Parameters |
|-------------|-----------------------------------|--------------------------------------------|------------|
| POST        | `/addTransportation`             | Add a new transportation                   | None       |
| GET         | `/listTransportation`            | Get a list of all transportations          | None       |
| POST        | `/bookTransportation`            | Book a transportation                      | None       |
| GET         | `/availableTransportation`       | Get all available transportations          | None       |
| GET         | `/touristTransportationBookings` | Get all booked transportations for a tourist | None    |

</details>

<details>
<summary>Wallet Management</summary>

| HTTP Method | Endpoint                          | Description                                | Parameters |
|-------------|-----------------------------------|--------------------------------------------|------------|
| POST        | `/redeem-points/:touristId`       | Redeem points to cash for a tourist        | `touristId` |
| POST        | `/wallet/pay`                    | Pay with the wallet                        | None       |
| POST        | `/wallet/refund`                 | Refund to the wallet                       | None       |

</details>

<details>
<summary>Wishlist Management</summary>

| HTTP Method | Endpoint                          | Description                                | Parameters |
|-------------|-----------------------------------|--------------------------------------------|------------|
| POST        | `/wishlist/:userId/add`          | Add a product to the user's wishlist       | `userId`   |
| GET         | `/wishlist/:userId`              | Get the user's wishlist                    | `userId`   |
| POST        | `/wishlist/:userId/toggle`       | Toggle a product in the user's wishlist    | `userId`   |

</details>

<details>
<summary>User Cart Management</summary>

| HTTP Method | Endpoint                          | Description                                | Parameters |
|-------------|-----------------------------------|--------------------------------------------|------------|
| POST        | `/cart/:userId/add`              | Add a product to the user's cart           | `userId`   |
| PATCH       | `/cart/:userId/update`           | Update product quantity in the user's cart | `userId`   |
| DELETE      | `/cart/:userId/remove`           | Remove a product from the user's cart      | `userId`   |
| GET         | `/cart/:userId`                  | Get the user's cart                        | `userId`   |

</details>

<details>
<summary>Promo Code Management</summary>

| HTTP Method | Endpoint                          | Description                                | Parameters |
|-------------|-----------------------------------|--------------------------------------------|------------|
| POST        | `/promoCodes`                    | Create a new promo code                    | None       |
| POST        | `/promoCodes/apply`              | Apply a promo code                         | None       |
| GET         | `/promoCodes`                    | Get all promo codes                        | None       |
| GET         | `/promoCodes/user/:userId`       | Get all promo codes for a user             | `userId`   |

</details>

<details>
<summary>Sales Reports</summary>

| HTTP Method | Endpoint                          | Description                                | Parameters |
|-------------|-----------------------------------|--------------------------------------------|------------|
| GET         | `/advertiser-analytics`          | Get advertiser revenue analytics           | None       |
| GET         | `/tourguide-analytics`           | Get tour guide revenue analytics           | None       |
| GET         | `/seller-analytics`              | Get seller revenue analytics               | None       |
| GET         | `/vtp-analytics-giftshop`        | Get gift shop revenue analytics            | None       |
| GET         | `/vtp-analytics-total`           | Get total revenue analytics                | None       |

</details>
<details>
<summary>Bookmarks Management</summary>

| HTTP Method | Endpoint                          | Description                                | Parameters |
|-------------|-----------------------------------|--------------------------------------------|------------|
| POST        | `/addBookmark`                   | Add a bookmarked activity                 | None       |
| GET         | `/getBookmarks`                  | Get all bookmarked activities             | None       |
| DELETE      | `/removeBookmark`                | Remove a bookmarked activity              | None       |
| POST        | `/addBookmarkitinerary`          | Add a bookmarked itinerary                | None       |
| DELETE      | `/removeBookmarkitinerary`       | Remove a bookmarked itinerary             | None       |
| GET         | `/getBookmarkeditinerary`        | Get all bookmarked itineraries            | None       |

</details>

<details>
<summary>Interested Tourists</summary>

| HTTP Method | Endpoint                          | Description                                | Parameters |
|-------------|-----------------------------------|--------------------------------------------|------------|
| POST        | `/addInterestToActivity`         | Add interest to an activity               | None       |
| POST        | `/addInterestToItinerary`        | Add interest to an itinerary              | None       |
| DELETE      | `/removeInterestFromActivity`    | Remove interest from an activity          | None       |
| DELETE      | `/removeInterestFromItinerary`   | Remove interest from an itinerary         | None       |

</details>

<details>
<summary>File Management</summary>

| HTTP Method | Endpoint                          | Description                                | Parameters |
|-------------|-----------------------------------|--------------------------------------------|------------|
| GET         | `/image/:id`                     | Get an image file by ID                   | `id`       |
| GET         | `/pdf/:id`                       | Get a PDF file by ID                      | `id`       |

</details>

<details>
<summary>Flight and Hotel Bookings</summary>

| HTTP Method | Endpoint                          | Description                                | Parameters |
|-------------|-----------------------------------|--------------------------------------------|------------|
| POST        | `/search-flights`                | Search for flights                        | None       |
| GET         | `/fetch-flights/:id`             | Get all flight bookings by ID             | `id`       |
| POST        | `/book-flight`                   | Book a flight                             | None       |
| GET         | `/hotels`                        | Get hotel details                         | None       |
| GET         | `/search-hotel`                  | Search hotel by details                   | None       |
| GET         | `/list-hotels`                   | List hotels by city                       | None       |

</details>

<details>
<summary>Deletion Requests</summary>

| HTTP Method | Endpoint                          | Description                                | Parameters |
|-------------|-----------------------------------|--------------------------------------------|------------|
| GET         | `/deletion-requests`             | Get all deletion requests with filters    | None       |
| GET         | `/deletion-requests/user/:userId`| Get deletion requests by user ID          | `userId`   |
| DELETE      | `/deletion-requests/:id`         | Delete a deletion request by ID           | `id`       |
| PATCH       | `/deletion-requests/:id`         | Update a deletion request status by ID    | `id`       |
| PUT         | `/deletion-requests/:deletionRequestId/approve` | Approve a deletion request | `deletionRequestId` |
| PUT         | `/deletion-requests/:deletionRequestId/deny`    | Deny a deletion request    | `deletionRequestId` |
| GET         | `/deletion-request-status`       | Check deletion request status             | None       |

</details>

<details>
<summary>Miscellaneous</summary>

| HTTP Method | Endpoint                          | Description                                | Parameters |
|-------------|-----------------------------------|--------------------------------------------|------------|
| POST        | `/change-password`               | Change the password of a user             | None       |
| POST        | `/login`                         | Login a user                              | None       |
| POST        | `/logout`                        | Logout a user                             | None       |
| GET         | `/userRole`                      | Get the role of the logged-in user        | None       |

</details>

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
```

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

## 🤝 Contribute

Contributions are always welcome to Roammate!  

Whether you're here to fix bugs, propose new features, or help improve documentation, we're thrilled to have your support.

<details>
  <summary>Getting Started</summary>

To begin contributing:

1. *Fork the repository* to your GitHub account.  
2. *Clone your forked repository* and create a new branch:  
    ```bash
    git checkout -b my-new-feature
    ```  
3. Make your changes and commit them:  
    ```bash
    git commit -am "Add some feature"
    ```  
4. *Push your branch* to your forked repository:  
    ```bash
    git push origin my-new-feature
    ```  
5. Open a *Pull Request (PR)* against the main branch of this repository.

</details>

<details>
  <summary>Reporting Issues</summary>

If you encounter any issues, feel free to report them using the GitHub Issues feature. For a helpful bug report, please include:

- A brief summary or background of the issue.
- Detailed steps to reproduce the issue.
- Any sample code or context.
- The expected and actual outcomes.
- Any additional notes or observations.

</details>

<details>
  <summary>Feature Requests</summary>

Have an idea for a new feature? We'd love to hear it! Open a GitHub issue with your proposal, making sure to provide context, motivation, and detailed examples of how it would benefit the project.

</details>

<details>
  <summary>Pull Requests</summary>

We appreciate your efforts to contribute via Pull Requests. Here's how you can make the process smoother:

- Ensure the tests pass before submitting your PR.  
- Include tests for any new functionality you've added.  
- Make sure your changes align with the project's goals.

</details>



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
