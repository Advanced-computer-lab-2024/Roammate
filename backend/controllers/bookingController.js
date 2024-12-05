const axios = require("axios");
const FlightBooking = require("../models/FlightBooking");

// Authenticate with Amadeus to get an access token
const authenticateWithAmadeus = async () => {
  try {
    const response = await axios.post(
      "https://test.api.amadeus.com/v1/security/oauth2/token",
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.AMADEUS_API_KEY,
        client_secret: process.env.AMADEUS_API_SECRET,
      })
    );

    return response.data.access_token; // Return access token
  } catch (error) {
    console.error("Error authenticating with Amadeus:", error);
    throw new Error("Unable to authenticate with Amadeus API");
  }
};

const getIataCode = async (cityName, accessToken) => {
  try {
    const response = await axios.get(
      "https://test.api.amadeus.com/v1/reference-data/locations",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          keyword: cityName,
          subType: "AIRPORT,CITY",
        },
      }
    );

    const locations = response.data.data;

    if (locations && locations.length > 0) {
      // console.log(`Locations for ${cityName}:`, locations); // Debug available options

      // Prioritize city-level IATA codes, fallback to airport
      const city = locations.find((loc) => loc.subType === "CITY");
      return city ? city.iataCode : locations[0].iataCode;
    }

    throw new Error(`IATA code not found for city: ${cityName}`);
  } catch (error) {
    console.error(`Error fetching IATA code for ${cityName}:`, error);
    throw new Error(`Unable to find IATA code for city: ${cityName}`);
  }
};


// Search for flights
const searchFlights = async (req, res) => {
  const { origin, destination, departureDate, returnDate, passengers, currency } = req.body;

  try {
    const accessToken = await authenticateWithAmadeus(); // Get access token

    // Convert city names to IATA codes
    const originIata = await getIataCode(origin, accessToken);
    const destinationIata = await getIataCode(destination, accessToken);

    const response = await axios.get(
      "https://test.api.amadeus.com/v2/shopping/flight-offers",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          originLocationCode: originIata,
          destinationLocationCode: destinationIata,
          departureDate,
          returnDate,
          adults: passengers,
          currencyCode: currency, // Adjust currency if needed
        },
      }
    );

    // Send flight offers to the frontend
    res.status(200).json(response.data.data);
  } catch (error) {
    console.error("Error searching for flights:", error);
    res.status(500).json({ message: "Error searching for flights" });
  }
};

const getAllFlightBookings = async (req, res) => {
  try {
      const id = req.params.id;
      const flightBookings = await FlightBooking.find({ touristId: id });
      res.status(200).json(flightBookings);
  } catch (error) {
      res.status(500).json({ message: "Failed to fetch flight bookings.", error: error.message });
  }
};

const addFlightBooking = async (req, res) => {
  try {
      const { touristId, bookingCode, flightData } = req.body;

      if (!touristId || !bookingCode || !flightData) {
          return res.status(400).json({ message: "Tourist ID, booking code, and flight data are required." });
      }

      const flightBooking = new FlightBooking({
          touristId,
          bookingCode,
          flightData
      });

      const savedBooking = await flightBooking.save();
      res.status(201).json({
          message: "Flight booked successfully!",
          booking: savedBooking
      });
  } catch (error) {
      res.status(500).json({ message: "Failed to book the flight.", error: error.message });
  }
};

// Function to get hotels by city
const getHotelsByCity = async (req, res) => {
  const { cityName, page = 1 } = req.query;

  if (!cityName || cityName.trim() === "") {
      return res.status(400).json({
          message: "City name is required and cannot be empty",
      });
  }

  const options = {
      method: "GET",
      url: "https://tripadvisor-scraper.p.rapidapi.com/hotels/list",
      headers: {
          "x-rapidapi-key": "b811a12092msh20d707194921e1bp16e32fjsn90a9d51fcd92",
          "x-rapidapi-host": "tripadvisor-scraper.p.rapidapi.com",
      },
      params: { query: cityName, page: page },
  };

  try {
      const response = await axios.request(options);
      res.status(200).json(response.data);
  } catch (error) {
      console.error("Error fetching hotel list:", error.response?.data || error.message);
      res.status(500).json({
          message: "Error fetching hotel list",
          details: error.response?.data || error.message,
      });
  }
};

// Get hotel details (including images)
const getHotelDetails =async (req, res) => {
  const { hotelId} = req.query;
    
  if (!hotelId || hotelId.trim() === "") {
    return res.status(400).json({
        message: "Hotel ID is required and cannot be empty",
    });
}

const options = {
    method: 'GET',
    url: 'https://tripadvisor-scraper.p.rapidapi.com/hotels/detail',
    headers: {
        'x-rapidapi-key': 'b811a12092msh20d707194921e1bp16e32fjsn90a9d51fcd92',
        'x-rapidapi-host': 'tripadvisor-scraper.p.rapidapi.com',
    },
    params: {
        id: hotelId, // Use the hotelId from request parameters
    },
};

try {
    const response = await axios.request(options);
    res.status(200).json(response.data); // Return the hotel details including images
} catch (error) {
    console.error('Error fetching hotel details:', error.response ? error.response.data : error.message);
    res.status(500).json({
        message: "Error fetching hotel details",
        details: error.response ? error.response.data : error.message,
    });
}
};
  

module.exports = { authenticateWithAmadeus, searchFlights, getAllFlightBookings, addFlightBooking, getHotelDetails, getHotelsByCity};
