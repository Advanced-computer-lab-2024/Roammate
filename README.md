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
### Backend
<details>
<summary>ProductController</summary>
**Description:** This demonstrates CRUD operations for the Product Controller, including adding, fetching, updating, and deleting products.
```javascript
const addProduct = async (req, res) => {
  const { name, image, price, description, seller, quantity } = req.body;

  const newProduct = new Product({
    name,
    // image,
    price,
    description,
    seller,
    quantity,
  });
  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { currency = "USD" } = req.query;
  try {
    const product = await Product.findById(id)
      .populate("seller", "username")
      .populate({
        path: "reviews",
        populate: { path: "user" },
      });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const convertedPrice = convertCurrency(product.price, "USD", currency);
    res.status(200).json({
      ...product.toObject(),
      price: convertedPrice.toFixed(2),
      currency,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving product", error });
  }
};

const deleteProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};

const updateProductById = async (req, res) => {
  const { id } = req.params;
  const { name, image, price, description, quantity, reviews, averageRating } =
    req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        image,
        price,
        description,
        quantity,
        reviews,
        averageRating,
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

</details> ```
<details>
<summary>FrontEnd</summary>
</details>

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

| HTTP Method | Endpoint                | Description                                |
|-------------|-------------------------|--------------------------------------------|
| GET         | `/users`                | Get all users                              |
| DELETE      | `/users/:id`            | Delete a user by ID                        |
| PATCH       | `/users/status`         | Update the status of all users             |
| PATCH       | `/users/status/:id`     | Update the status of a specific user       |
| GET         | `/users/status/:id`     | Get the status of a specific user          |
| GET         | `/users/pending`        | Get all users with 'Pending' status        |
| GET         | `/users/notifications/:id` | Get all notifications for a user         |
| PATCH       | `/users/notifications/:id` | Mark all notifications as read for a user |
| POST        | `/users/forgot-password` | Forgot password for a user                |
| POST        | `/users/verify-otp`     | Verify OTP for a user                      |
| POST        | `/users/reset-password` | Reset password for a user                  |

</details>

<details>
<summary>Admin Management</summary>

| HTTP Method | Endpoint        | Description                  |
|-------------|-----------------|------------------------------|
| POST        | `/admin`        | Add a new admin              |
| GET         | `/admin/:id`    | Get admin by ID              |
| PATCH       | `/admin/:id`    | Update admin by ID           |
| GET         | `/admin`        | Get all admins               |
| DELETE      | `/admin/:id`    | Delete an admin by ID        |

</details>

<details>
<summary>Advertiser Management</summary>

| HTTP Method | Endpoint                          | Description                                     |
|-------------|-----------------------------------|-------------------------------------------------|
| POST        | `/advertiser`                    | Register a new advertiser                      |
| GET         | `/advertiser/:id`                | Get advertiser by ID                           |
| PATCH       | `/advertiser/:id`                | Update advertiser by ID                        |
| GET         | `/advertiser`                    | Get all advertisers                            |
| POST        | `/advertiser/identification/upload` | Upload identification for advertiser          |
| POST        | `/advertiser/taxation/upload`    | Upload taxation document for advertiser        |
| POST        | `/advertiser/logo/upload`        | Upload logo for advertiser                     |
| DELETE      | `/request-delete-advertiser/:id` | Request advertiser deletion if no bookings     |

</details>

<details>
<summary>Seller Management</summary>

| HTTP Method | Endpoint                         | Description                                     |
|-------------|----------------------------------|-------------------------------------------------|
| POST        | `/seller`                       | Register a new seller                          |
| GET         | `/seller/:id`                   | Get seller by ID                               |
| PATCH       | `/seller/:id`                   | Update seller by ID                            |
| GET         | `/seller`                       | Get all sellers                                |
| POST        | `/seller/identification/upload` | Upload identification for seller              |
| POST        | `/seller/taxation/upload`       | Upload taxation document for seller           |
| POST        | `/seller/logo/upload`           | Upload logo for seller                         |
| DELETE      | `/request-delete-seller/:id`    | Request seller deletion if no upcoming products|

</details>

<details>
<summary>Tourist Management</summary>

| HTTP Method | Endpoint                        | Description                                     |
|-------------|---------------------------------|-------------------------------------------------|
| POST        | `/tourist`                     | Register a new tourist                         |
| GET         | `/tourist/:id`                 | Get tourist by ID                              |
| PATCH       | `/tourist/:id`                 | Update tourist by ID                           |
| GET         | `/tourist`                     | Get all tourists                               |
| DELETE      | `/request-delete-tourist/:id`  | Request tourist deletion if no bookings        |

</details>

<details>
<summary>Tourism Governor Management</summary>

| HTTP Method | Endpoint                | Description                          |
|-------------|-------------------------|--------------------------------------|
| POST        | `/tourismGovernor`      | Add a new tourism governor           |
| GET         | `/tourismGovernor`      | Get all tourism governors            |
| GET         | `/tourismGovernor/:id`  | Get tourism governor by ID           |
| PATCH       | `/tourismGovernor/:id`  | Update tourism governor by ID        |

</details>

<details>
<summary>Tour Guide Management</summary>

| HTTP Method | Endpoint                          | Description                                |
|-------------|-----------------------------------|--------------------------------------------|
| POST        | `/tourGuide`                     | Register a new tour guide                  |
| GET         | `/tourGuide/:id`                 | Get tour guide by ID                       |
| PATCH       | `/tourGuide/:id`                 | Update tour guide by ID                    |
| GET         | `/tourGuide`                     | Get all tour guides                        |
| POST        | `/tourGuide/identification/upload` | Upload identification for tour guide       |
| POST        | `/tourGuide/certificate/upload`  | Upload certificate for tour guide          |
| POST        | `/tourGuide/photo/upload`        | Upload photo for tour guide                |
| POST        | `/tourGuide/review/:id`          | Add review for a tour guide                |
| DELETE      | `/request-delete-tourguide/:id`  | Request tour guide deletion if no bookings |

</details>
<details>
<summary>Product Management</summary>

| HTTP Method | Endpoint                          | Description                                |
|-------------|-----------------------------------|--------------------------------------------|
| POST        | `/product`                       | Add a new product                          |
| GET         | `/product`                       | Get all products                           |
| GET         | `/product/:id`                   | Get product by ID                          |
| GET         | `/product-seller/:id`            | Get products by seller ID                  |
| DELETE      | `/product/:id`                   | Delete product by ID                       |
| PATCH       | `/product/:id`                   | Update product by ID                       |
| GET         | `/product-search`                | Search products with filters               |
| PUT         | `/product/:id/toggle-archived`   | Toggle archived status of a product        |
| GET         | `/product/:id/check-archived`    | Check if a product is archived             |
| POST        | `/product/image/upload`          | Upload image for a product                 |
| GET         | `/product/:id/product-sales`     | Get stock and sales of a product           |

</details>

<details>
<summary>Activity Management</summary>

| HTTP Method | Endpoint                          | Description                                |
|-------------|-----------------------------------|--------------------------------------------|
| POST        | `/activity`                      | Create a new activity                      |
| GET         | `/activity`                      | Get all activities                         |
| GET         | `/activity/:id`                  | Get activity by ID                         |
| PATCH       | `/activity/:id`                  | Update activity by ID                      |
| DELETE      | `/activity/:id`                  | Delete activity by ID                      |
| GET         | `/activity-search`               | Search activities with filters and sorting |
| GET         | `/activity-advertiser/:id`       | Get activities by advertiser ID            |
| GET         | `/activity-tourist/:id`          | Get booked activities by tourist ID        |
| GET         | `/check-activity-booking/:activityId` | Check if an activity is booked          |

</details>

<details>
<summary>Itinerary Management</summary>

| HTTP Method | Endpoint                          | Description                                |
|-------------|-----------------------------------|--------------------------------------------|
| POST        | `/itinerary`                     | Create a new itinerary                     |
| GET         | `/itinerary`                     | Get all itineraries                        |
| GET         | `/itinerary/:id`                 | Get itinerary by ID                        |
| PATCH       | `/itinerary/:id`                 | Update itinerary by ID                     |
| DELETE      | `/itinerary/:id`                 | Delete itinerary by ID                     |
| GET         | `/itinerary-search`              | Search itineraries with filters and sorting|
| GET         | `/itinerary/tourGuide/:id`       | Get itineraries by tour guide ID           |

</details>

<details>
<summary>Tags and Categories</summary>

| HTTP Method | Endpoint                          | Description                                |
|-------------|-----------------------------------|--------------------------------------------|
| POST        | `/preferenceTags`                | Create a new preference tag                |
| GET         | `/preferenceTags`                | Get all preference tags                    |
| PATCH       | `/preferenceTags/:id`            | Update a preference tag by ID              |
| DELETE      | `/preferenceTags/:id`            | Delete a preference tag by ID              |
| POST        | `/activityCategory`              | Create a new activity category             |
| GET         | `/activityCategory`              | Get all activity categories                |
| PATCH       | `/activityCategory/:id`          | Update an activity category by ID          |
| DELETE      | `/activityCategory/:id`          | Delete an activity category by ID          |

</details>

<details>
<summary>Complaints Management</summary>

| HTTP Method | Endpoint                          | Description                                |
|-------------|-----------------------------------|--------------------------------------------|
| POST        | `/complaint`                     | Create a new complaint                     |
| GET         | `/complaints`                    | Get all complaints                         |
| GET         | `/complaints/:issuerId`          | Get complaints by issuer ID                |
| GET         | `/complaint/:id`                 | Get complaint details by ID                |
| DELETE      | `/complaint/:id`                 | Delete a complaint by ID                   |
| PUT         | `/complaint/:id`                 | Mark a complaint as resolved by ID         |

</details>

<details>
<summary>Monument Management</summary>

| HTTP Method | Endpoint                          | Description                                |
|-------------|-----------------------------------|--------------------------------------------|
| POST        | `/monument`                      | Create a new monument                      |
| GET         | `/monument`                      | Get all monuments                          |
| GET         | `/monument/:id`                  | Get monument by ID                         |
| PATCH       | `/monument/:id`                  | Update a monument by ID                    |
| DELETE      | `/monument/:id`                  | Delete a monument by ID                    |
| GET         | `/monument-search`               | Search monuments with filters              |
| GET         | `/monument/tourismGovernor/:id`  | Get monuments by tourism governor ID       |

</details>

<details>
<summary>Monument Tags Management</summary>

| HTTP Method | Endpoint                          | Description                                |
|-------------|-----------------------------------|--------------------------------------------|
| POST        | `/monumentTags`                  | Create a new monument tag                  |
| GET         | `/monumentTags`                  | Get all monument tags                      |
| PATCH       | `/monumentTags/:id`              | Update a monument tag by ID                |
| DELETE      | `/monumentTags/:id`              | Delete a monument tag by ID                |

</details>
<details>
<summary>Booking Management</summary>

| HTTP Method | Endpoint                          | Description                                |
|-------------|-----------------------------------|--------------------------------------------|
| POST        | `/bookActivity`                  | Book an activity                           |
| DELETE      | `/activityBookings/:id`          | Cancel an activity booking                 |
| GET         | `/activityBookings/:id`          | Get booked activities for a tourist        |
| GET         | `/activityBookings-count/:id`    | Get activity bookings count                |
| POST        | `/bookItinerary`                 | Book an itinerary                          |
| DELETE      | `/itineraryBookings/:id`         | Cancel an itinerary booking                |
| GET         | `/itineraryBookings/:id`         | Get booked itineraries for a tourist       |
| GET         | `/itineraryBookings-count/:id`   | Get itinerary bookings count               |

</details>

<details>
<summary>Transportation Management</summary>

| HTTP Method | Endpoint                          | Description                                |
|-------------|-----------------------------------|--------------------------------------------|
| POST        | `/addTransportation`             | Add a new transportation                   |
| GET         | `/listTransportation`            | Get a list of all transportations          |
| POST        | `/bookTransportation`            | Book a transportation                      |
| GET         | `/availableTransportation`       | Get all available transportations          |
| GET         | `/touristTransportationBookings` | Get all booked transportations for a tourist |

</details>

<details>
<summary>Wallet Management</summary>

| HTTP Method | Endpoint                          | Description                                |
|-------------|-----------------------------------|--------------------------------------------|
| POST        | `/redeem-points/:touristId`       | Redeem points to cash for a tourist        |
| POST        | `/wallet/pay`                    | Pay with the wallet                        |
| POST        | `/wallet/refund`                 | Refund to the wallet                       |

</details>

<details>
<summary>Wishlist Management</summary>

| HTTP Method | Endpoint                          | Description                                |
|-------------|-----------------------------------|--------------------------------------------|
| POST        | `/wishlist/:userId/add`          | Add a product to the user's wishlist       |
| GET         | `/wishlist/:userId`              | Get the user's wishlist                    |
| POST        | `/wishlist/:userId/toggle`       | Toggle a product in the user's wishlist    |

</details>

<details>
<summary>User Cart Management</summary>

| HTTP Method | Endpoint                          | Description                                |
|-------------|-----------------------------------|--------------------------------------------|
| POST        | `/cart/:userId/add`              | Add a product to the user's cart           |
| PATCH       | `/cart/:userId/update`           | Update product quantity in the user's cart |
| DELETE      | `/cart/:userId/remove`           | Remove a product from the user's cart      |
| GET         | `/cart/:userId`                  | Get the user's cart                        |

</details>

<details>
<summary>Promo Code Management</summary>

| HTTP Method | Endpoint                          | Description                                |
|-------------|-----------------------------------|--------------------------------------------|
| POST        | `/promoCodes`                    | Create a new promo code                    |
| POST        | `/promoCodes/apply`              | Apply a promo code                         |
| GET         | `/promoCodes`                    | Get all promo codes                        |
| GET         | `/promoCodes/user/:userId`       | Get all promo codes for a user             |

</details>

<details>
<summary>Sales Reports</summary>

| HTTP Method | Endpoint                          | Description                                |
|-------------|-----------------------------------|--------------------------------------------|
| GET         | `/advertiser-analytics`          | Get advertiser revenue analytics           |
| GET         | `/tourguide-analytics`           | Get tour guide revenue analytics           |
| GET         | `/seller-analytics`              | Get seller revenue analytics               |
| GET         | `/vtp-analytics-giftshop`        | Get gift shop revenue analytics            |
| GET         | `/vtp-analytics-total`           | Get total revenue analytics                |

</details>

<details>
<summary>Bookmarks Management</summary>

| HTTP Method | Endpoint                          | Description                                |
|-------------|-----------------------------------|--------------------------------------------|
| POST        | `/addBookmark`                   | Add a bookmarked activity                 |
| GET         | `/getBookmarks`                  | Get all bookmarked activities             |
| DELETE      | `/removeBookmark`                | Remove a bookmarked activity              |
| POST        | `/addBookmarkitinerary`          | Add a bookmarked itinerary                |
| DELETE      | `/removeBookmarkitinerary`       | Remove a bookmarked itinerary             |
| GET         | `/getBookmarkeditinerary`        | Get all bookmarked itineraries            |

</details>

<details>
<summary>Interested Tourists</summary>

| HTTP Method | Endpoint                          | Description                                |
|-------------|-----------------------------------|--------------------------------------------|
| POST        | `/addInterestToActivity`         | Add interest to an activity               |
| POST        | `/addInterestToItinerary`        | Add interest to an itinerary              |
| DELETE      | `/removeInterestFromActivity`    | Remove interest from an activity          |
| DELETE      | `/removeInterestFromItinerary`   | Remove interest from an itinerary         |

</details>

<details>
<summary>File Management</summary>

| HTTP Method | Endpoint                          | Description                                |
|-------------|-----------------------------------|--------------------------------------------|
| GET         | `/image/:id`                     | Get an image file by ID                   |
| GET         | `/pdf/:id`                       | Get a PDF file by ID                      |

</details>

<details>
<summary>Flight and Hotel Bookings</summary>

| HTTP Method | Endpoint                          | Description                                |
|-------------|-----------------------------------|--------------------------------------------|
| POST        | `/search-flights`                | Search for flights                        |
| GET         | `/fetch-flights/:id`             | Get all flight bookings by ID             |
| POST        | `/book-flight`                   | Book a flight                             |
| GET         | `/hotels`                        | Get hotel details                         |
| GET         | `/search-hotel`                  | Search hotel by details                   |
| GET         | `/list-hotels`                   | List hotels by city                       |

</details>

<details>
<summary>Deletion Requests</summary>

| HTTP Method | Endpoint                          | Description                                |
|-------------|-----------------------------------|--------------------------------------------|
| GET         | `/deletion-requests`             | Get all deletion requests with filters    |
| GET         | `/deletion-requests/user/:userId`| Get deletion requests by user ID          |
| DELETE      | `/deletion-requests/:id`         | Delete a deletion request by ID           |
| PATCH       | `/deletion-requests/:id`         | Update a deletion request status by ID    |
| PUT         | `/deletion-requests/:deletionRequestId/approve` | Approve a deletion request |
| PUT         | `/deletion-requests/:deletionRequestId/deny`    | Deny a deletion request    |
| GET         | `/deletion-request-status`       | Check deletion request status             |

</details>

<details>
<summary>Miscellaneous</summary>

| HTTP Method | Endpoint                          | Description                                |
|-------------|-----------------------------------|--------------------------------------------|
| POST        | `/change-password`               | Change the password of a user             |
| POST        | `/login`                         | Login a user                              |
| POST        | `/logout`                        | Logout a user                             |
| GET         | `/userRole`                      | Get the role of the logged-in user        |

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
