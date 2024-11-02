import { useEffect, useState } from 'react';
import { createActivity, fetchAllActivityCategories, fetchAllPreferenceTags } from '../../services/api';

const CreateActivity = ({ id }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState({ lat: '', lng: '' });
  const [price, setPrice] = useState('');
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [discount, setDiscount] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [time, setTime] = useState('');
  const [isBookingAvailable, setIsBookingAvailable] = useState(false);
  const [availableTags, setAvailableTags] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [msg, setMsg] = useState('');
  const [msgClassName, setMsgClassName] = useState('');

  useEffect(() => {
    const fetchActivityCategories = async () => {
      const fetchedCategories = await fetchAllActivityCategories();
      setAvailableCategories(fetchedCategories);
    };
    const fetchPreferenceTags = async () => {
      const fetchedTags = await fetchAllPreferenceTags();
      setAvailableTags(fetchedTags);
    };
    fetchActivityCategories();
    fetchPreferenceTags();
  }, []);

  // Handle multi-select for categories
  const handleCategoryChange = (e) => {
    const selectedCategories = Array.from(e.target.selectedOptions, (option) => option.value);
    setCategories(selectedCategories);
  };

  // Handle multi-select for tags
  const handleTagChange = (e) => {
    const selectedTags = Array.from(e.target.selectedOptions, (option) => option.value);
    setTags(selectedTags);
  };

  // Add a new discount entry
  const handleAddDiscount = () => {
    setDiscount([...discount, { percentage: '', description: '' }]);
  };

  const handleRemoveDiscount = () => {
    if (discount.length >= 1) {
      const updatedDiscount = [...discount];
      updatedDiscount.pop();
      setDiscount(updatedDiscount);
    }
  };

  // Update discount fields dynamically
  const handleDiscountChange = (index, field, value) => {
    const updatedDiscount = [...discount];
    updatedDiscount[index][field] = value;
    setDiscount(updatedDiscount);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newActivity = {
      title,
      description,
      location,
      price,
      category: categories,
      tags,
      discount,
      startDate,
      endDate,
      time,
      isBookingAvailable,
      advertiser: id,
    };

    try {
      await createActivity(newActivity);
      setMsg('Activity created successfully!');
      setMsgClassName('success-msg');
    } catch (error) {
      setMsg(`Failed to create activity! Error: ${error.message}`);
      setMsgClassName('err-msg');
    }
  };

  return (
    <div className="activity-container">
      <h2>Create Activity</h2>
      {/* Feedback Message */}
      {msg && <p className={msgClassName}>{msg}</p>}

      <form onSubmit={handleSubmit}>
        <div className="activity-header">
          <label>
            Title:  <br />
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="activity-body">
          <div className="description-section">
            <label>
              Description:
              <br />
              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </label>
          </div>

          <div className="location-section">

            <label>
              Location:
              <br />
              <input
                type="text"
                placeholder="Latitude"
                value={location.lat}
                onChange={(e) => setLocation({ lat: e.target.value, lng: location.lng })} // Update only the latitude
                required
              />
              <br />
              <input
                type="text"
                placeholder="Longitude"
                value={location.lng}
                onChange={(e) => setLocation({ lat: location.lat, lng: e.target.value })} // Update only the longitude
                required
              />
            </label>
          </div>

          <div className="price-section">
            <label>
              Price:
              <br />
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </label>
          </div>

          <div className="category-section">
            {/* Multi-select for Categories */}
            <label>
              Categories:
              <select multiple onChange={handleCategoryChange}>
                <option value="">Select categories</option>
                {availableCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="tags-section">
            {/* Multi-select for Tags */}
            <label> Tags:
              <select multiple onChange={handleTagChange}>
                <option value="">Select tags</option>
                {availableTags.map((tag) => (
                  <option key={tag.id} value={tag.id}>
                    {tag.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="discount-section">
            {/* Discounts section */}
            <div>
              <h3>Discounts</h3>
              {discount.map((d, index) => (
                <div key={index} className="discount-inputs">
                  <input
                    type="number"
                    placeholder="Percentage"
                    value={d.percentage}
                    onChange={(e) => handleDiscountChange(index, 'percentage', e.target.value)}
                    min="0"
                    max="100"
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    value={d.description}
                    onChange={(e) => handleDiscountChange(index, 'description', e.target.value)}
                  />
                </div>
              ))}
              <button className="btn" type="button" onClick={handleAddDiscount}>
                Add Discount
              </button>
              <button className="btn" type="button" onClick={handleRemoveDiscount}>
                Remove Discount
              </button>
            </div>


          </div>

          <div className="availability-section">
            <label>
              Start Date:
              <br />
              <input
                type="date"
                placeholder="Start date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </label>
            <label>
              End Date:
              <br />
              <input
                type="date"
                placeholder="End date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </label>
            <label>
              Time:
              <br />
              <input
                type="time"
                placeholder="Time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </label>
            {/* Checkbox for Booking Availability */}
            <label>
              Is booking available?
              <input
                type="checkbox"
                checked={isBookingAvailable}
                onChange={(e) => setIsBookingAvailable(e.target.checked)}
              />
            </label>
          </div>

          <button className="submit-btn" type="submit">Create</button>
        </div>
      </form>

    </div>
  );
};

export default CreateActivity;
