/* eslint-disable react/prop-types */
import dayjs from 'dayjs';
const DATE_FORMAT = 'YYYY/MM/DD';

const Itinerary = ({ itinerary }) => {
    const { title, duration, startDate, endDate, timeline, price, lang, pickUpLocation, dropOffLocation, isBookingAvailable, tags, tourGuide, reviews, averageRating } = itinerary;

    return (
        <div className="itinerary-container">
            <div className="itinerary-header">
                <h2>{title}</h2>
                <p className="average-rating">Average Rating: <strong>{averageRating}</strong></p>
            </div>

            <div className="itinerary-body">

                <div className="duration-section">
                    <p><strong>Duration</strong>: {duration}</p>

                </div>

                <div className="timeline-section">
                    <h3>Timeline:</h3>
                    <ul>
                        {timeline.map((item, index) => (
                            <li key={index}>
                                <p>Day {item.day}</p>
                                <ul>
                                    {item.plan.map((plan, index) => (
                                        <li key={index}>
                                            <p><strong>Start Time:</strong> {plan.startTime}</p>
                                            <p><strong>Activity: </strong>{plan.activity}</p>
                                            <p><strong>Location:</strong> {plan.location}</p>
                                            <p><strong>Description:</strong> {plan.description}</p>
                                            <p><strong>Accessibility:</strong> {plan.accessibility ? 'Yes' : 'No'}</p>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='price-section'>
                    <p><strong>Price</strong>: {price}</p>
                </div>

                <div className='lang-section'>
                    <p><strong>Language:</strong> {lang}</p>
                </div>

                <div className='location-section'>
                    <p><strong>Pick Up Location:</strong> {pickUpLocation}</p>
                    <p><strong>Drop Off Location: </strong>{dropOffLocation}</p>
                </div>

                <div className='availability-section'>
                    <p><strong>Available Dates:</strong> {dayjs(startDate).format(DATE_FORMAT)} {endDate && ` - ${dayjs(endDate).format(DATE_FORMAT)}`}</p>
                    <p><strong>Booking Availability:</strong> {isBookingAvailable ? 'Accepting' : 'No Longer Accepting'}</p>
                </div>


                <div className='tags-section'>
                    <p><strong>Tags: </strong></p>
                    <div>
                        {tags.map((tag) => (
                            <li key={tag._id} style={{ marginRight: '5px' }}>{tag.name}</li>
                        ))}
                    </div>
                </div>

                <div className='tour-guide-section'>
                    <p><strong>Tour Guide:</strong> {tourGuide.username}</p>
                </div>

                <div className="reviews-section">
                    <p><strong>Reviews:</strong></p>
                    {reviews.length === 0 && <p>No reviews available.</p>}
                    <ul className="reviews-list">
                        {
                            reviews.map((review) => (
                                <li key={review._id}>
                                    <div className="review">
                                        <h4>{review.user.username}</h4>
                                        <p>Rating: {review.rating}</p>
                                        <p>Comment: {review.comment}</p>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Itinerary;
