import { useEffect, useState } from 'react';
import { createItinerary, fetchAllPreferenceTags } from '../../services/api';

const CreateItinerary = ({ id }) => {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [timeline, setTimeline] = useState([{
    day: 1,
    plan: [
      {
        startTime: '',
        activity: '',
        location: '',
        description: '',
        accessibility: false,
      },
    ],
  }]);
  const [price, setPrice] = useState('');
  const [lang, setLang] = useState('');
  const [pickUpLocation, setPickUpLocation] = useState('');
  const [dropOffLocation, setDropOffLocation] = useState('');
  const [isBookingAvailable, setIsBookingAvailable] = useState('');
  const [tags, setTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [msg, setMsg] = useState('');
  const [msgClassName, setMsgClassName] = useState('');

  useEffect(() => {
    const fetchPreferenceTags = async () => {
      const fetchedTags = await fetchAllPreferenceTags();
      setAvailableTags(fetchedTags);
    };
    fetchPreferenceTags();
  }, []);


  // Handle multi-select for tags
  const handleTagChange = (e) => {
    const selectedTags = Array.from(e.target.selectedOptions, (option) => option.value);
    setTags(selectedTags);
  };

  // Handle change for timeline
  const handleTimelineChange = (dayIndex, planIndex, field, value) => {
    const updatedTimeline = [...timeline];
    updatedTimeline[dayIndex].plan[planIndex][field] = value;
    setTimeline(updatedTimeline);
  };

  // Add a new day to the timeline
  const handleAddDay = () => {
    const newDay = {
      day: timeline.length + 1, // Increment the day number
      plan: [
        {
          startTime: '',
          activity: '',
          location: '',
          description: '',
          accessibility: false,
        },
      ],
    };
    setTimeline([...timeline, newDay]);
  };

  // Delete a day from the timeline
  const handleDeleteDay = () => {
    if (timeline.length >= 1) {
      const updatedTimeline = [...timeline];
      updatedTimeline.pop();
      setTimeline(updatedTimeline);
    }
  }
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const Itinerary = {
      title,
      duration,
      startDate,
      endDate,
      timeline,
      price,
      lang,
      pickUpLocation,
      dropOffLocation,
      isBookingAvailable,
      tags,
      tourGuide: id,
    };
    try {
      await createItinerary(Itinerary);
      setMsg('Itinerary created successfully');
      setMsgClassName('success-msg');
      setIsEdit(false);
    } catch (error) {
      setMsg('Failed to create itinerary');
      setMsgClassName('error-msg');
    }
  };

  return (
    <div className="itinerary-container">

      <h2>Create Itinerary</h2>

      <div className="itinerary-header">
        {msg && <p className={msgClassName}>{msg}</p>}
      </div>

      <form className="itinerary-body" onSubmit={handleSubmit}>

        <div className="title-section">
          <label>
            Title:
            <br />
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>

          <label>
            Duration:
            <br />
            <input
              type="text"
              name="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </label>
        </div>


        <div className='tags-section'>
          <label>
            Tags:
            <br />
            <select multiple value={tags} onChange={handleTagChange}>
              {availableTags.map((tag) => (
                <option key={tag._id} value={tag._id}>
                  {tag.name}
                </option>
              ))}
            </select>
          </label>
        </div>


        <div className='timeline-section'>
          <h3>Timeline:</h3>
          {timeline.map((item, dayIndex) => (
            <div key={dayIndex}>
              <p>Day {item.day}</p>
              {item.plan.map((plan, planIndex) => (
                <div key={planIndex}>
                  <label>
                    Start Time:
                    <br />
                    <input
                      type="text"
                      value={plan.startTime}
                      onChange={(e) =>
                        handleTimelineChange(dayIndex, planIndex, 'startTime', e.target.value)
                      }
                    />
                  </label>
                  <label>
                    Activity:
                    <br />
                    <input
                      type="text"
                      value={plan.activity}
                      onChange={(e) =>
                        handleTimelineChange(dayIndex, planIndex, 'activity', e.target.value)
                      }
                    />
                  </label>
                  <label>
                    Location:
                    <br />
                    <input
                      type="text"
                      value={plan.location}
                      onChange={(e) =>
                        handleTimelineChange(dayIndex, planIndex, 'location', e.target.value)
                      }
                    />
                  </label>
                  <label>
                    Description:
                    <br />
                    <input
                      type="text"
                      value={plan.description}
                      onChange={(e) =>
                        handleTimelineChange(dayIndex, planIndex, 'description', e.target.value)
                      }
                    />
                  </label>
                  <label>

                    Accessibility:
                    <input
                      type="checkbox"
                      checked={plan.accessibility}
                      onChange={(e) =>
                        handleTimelineChange(dayIndex, planIndex, 'accessibility', e.target.checked)
                      }
                    />
                  </label>
                </div>
              ))}
            </div>
          ))}

          {/* Button to add a new day */}
          <button className="btn" type="button" onClick={handleAddDay}>
            Add Day
          </button>
          <button className="btn" type="button" onClick={handleDeleteDay}>
            Delete Day
          </button>
        </div>

        <div className='price-section'>
          <label>
            Price:
            <br />
            <input
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </label>
        </div>

        <div className='lang-section'>
          <label>
            Language:
            <br />
            <input
              type="text"
              name="lang"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              required
            />
          </label>
        </div>

        <div className='location-section'>
          <label>
            Pick Up Location:
            <br />
            <input
              type="text"
              name="pickUpLocation"
              value={pickUpLocation}
              onChange={(e) => setPickUpLocation(e.target.value)}
              required
            />
          </label>

          {/* Drop Off Location */}
          <label>
            Drop Off Location:
            <br />
            <input
              type="text"
              name="dropOffLocation"
              value={dropOffLocation}
              onChange={(e) => setDropOffLocation(e.target.value)}
              required
            />
          </label>

        </div>

        <div className='availability-section'>
          <label>
            Start Date:
            <br />
            <input
              type="date"
              name="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </label>

          {/* End Date */}
          <label>
            End Date:
            <br />
            <input
              type="date"
              name="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </label>

          <label>
            <br />
            Is booking available?
            <input
              style={{ marginLeft: '0px' }}
              type="checkbox"
              checked={isBookingAvailable}
              onChange={(e) => setIsBookingAvailable(e.target.checked)}
            />
          </label>

        </div>

        {/* Submit Button */}
        <button className='submit-btn' type="submit">Save Itinerary</button>

        {/* Cancel Button */}
        <button className="cancel-btn" type="button" onClick={() => setIsEdit(false)}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateItinerary;
