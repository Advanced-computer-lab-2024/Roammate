const Activity = require("../models/activitySchema");

const createActivity = async (req, res) =>{
   
        const { title, location, price, category, tags, discounts, availability } = req.body;
    
        const activity = new Activity({
            title,
            location,
            price,
            category,
            tags,
            discounts,
            availability
        });
    
        activity.save()
            .then(result => {
                res.status(201).json(result);  // Send back created resource
            })
            .catch(err => {
                res.status(400).json({ error: err.message });
            });
    };
    // READ all activities
    const getAllActivities = (req, res) => {
    Activity.find()
        .then(activities => {
            res.status(200).json(activities);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
};
   const getActivityById = (req, res) => {
    const id = req.params.id;

    Activity.findById(id)
        .then(activity => {
            if (!activity) {
                return res.status(404).json({ error: 'Activity not found' });
            }
            res.status(200).json(activity);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
};
     const updateActivity = async (req, res) => {
    try {
      const activityId = req.params.id; // 1
      const updatedData = req.body;     // 2
  
      // 3
      const updatedActivity = await Activity.findByIdAndUpdate(
        activityId,        // 4
        updatedData,       // 5
        { new: true, runValidators: true } // 6
      );
  
      // 7
      if (!updatedActivity) {
        return res.status(404).json({ error: 'Activity not found' });
      }
  
      // 8
      res.status(200).json(updatedActivity);
    } catch (error) {
      // 9
      res.status(400).json({ error: error.message });
    }
  };
    const deleteActivity = (req, res) => {
    const id = req.params.id;

    Activity.findByIdAndDelete(id)
        .then(result => {
            if (!result) {
                return res.status(404).json({ error: 'Activity not found' });
            }
            res.status(204).send();
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
};
    const filterActivities = async (req, res) => {
    try {
      // Extract query parameters from the request
      const { budget, date, category, rating } = req.query;
  
      // Build the filter object for MongoDB query
      let filter = {};
  
      // Filter by budget (price range)
      if (budget) {
        const [minPrice, maxPrice] = budget.split(','); // assuming budget is in format "min,max"
        filter.price = { $gte: minPrice || 0, $lte: maxPrice || Infinity };
      }
  
      // Filter by date (check if the activity is available on or after a given date)
      if (date) {
        filter['availability.startDate'] = { $lte: new Date(date) };
        filter['availability.endDate'] = { $gte: new Date(date) };
      }
  
      // Filter by category
      if (category) {
        filter.category = category;
      }
  
      // Filter by ratings
      if (rating) {
        filter.rating = { $gte: rating };
      }
  
      // Query the database with the filter object
      const activities = await Activity.find(filter);
  
      // Return the filtered activities
      res.status(200).json(activities);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const sortActivities = async (req, res) => {
    const { sortBy } = req.query; // Get sorting criteria from query params
    const sortCriteria = {};

    // Determine sorting order based on query parameter
    if (sortBy === 'price') {
        sortCriteria.price = 1; // Ascending order
    } else if (sortBy === '-price') {
        sortCriteria.price = -1; // Descending order
    } else if (sortBy === 'rating') {
        sortCriteria.rating = 1; // Ascending order
    } else if (sortBy === '-rating') {
        sortCriteria.rating = -1; // Descending order
    }

    try {
        const activities = await Activity.find().sort(sortCriteria); // Retrieve and sort activities
        res.status(200).json(activities); // Send sorted activities as response
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: error.message });
    }
};









































    module.exports = {
        createActivity,getAllActivities,getActivityById,updateActivity,deleteActivity,filterActivities,sortActivities
      };
    
    






