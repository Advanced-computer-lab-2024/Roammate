const axios = require("axios");

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

// Search for flights
const searchFlights = async (req, res) => {
    const { origin, destination, departureDate, returnDate, passengers, currency } = req.body;
    try {
      const accessToken = await authenticateWithAmadeus(); // Get access token
  
      const response = await axios.get(
        "https://test.api.amadeus.com/v2/shopping/flight-offers",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          params: {
            originLocationCode: origin,
            destinationLocationCode: destination,
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

  // Get a list of hotels by city code
const getHotelListByCity = async (req, res) => {
    const { cityCode } = req.query;

    try {
        const accessToken = await authenticateWithAmadeus(); // Get access token

        const response = await axios.get(
            "https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city",
            {
                headers: { Authorization: `Bearer ${accessToken}` },
                params: {
                    cityCode,
                },
            }
        );

        // Send the list of hotels to the frontend
        res.status(200).json(response.data.data);
    } catch (error) {
        console.error("Error fetching hotel list:", error.response ? error.response.data : error.message);
        res.status(error.response ? error.response.status : 500).json({
            message: "Error fetching hotel list",
            details: error.response ? error.response.data : error.message,
        });
    }
};
// Search for hotels
const searchHotels = async (req, res) => {
    const { hotelIds, adults, checkInDate, checkOutDate,roomQuantity  } = req.query;
  
    try {
      const accessToken = await authenticateWithAmadeus(); // Get access token
  
      const response = await axios.get(
        "https://test.api.amadeus.com/v3/shopping/hotel-offers",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          params: {
            hotelIds,
            adults,
            checkInDate,
            checkOutDate,
            roomQuantity,
            currencyCode: "USD", // Adjust currency if needed
          },
        }
      );
  
      // Send hotel offers to the frontend
      res.status(200).json(response.data.data);
    }  catch (error) {
        console.error("Error searching hotels:", error.response ? error.response.data : error.message);
        res.status(500).json({ message: "Error searching hotels", details: error.response ? error.response.data : error.message });
    }
  };  

  

module.exports = { authenticateWithAmadeus, searchFlights,searchHotels, getHotelListByCity };
