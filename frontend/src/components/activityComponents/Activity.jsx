import dayjs from "dayjs";
const DATE_FORMAT = 'YYYY/MM/DD';

const Activity = ({ activity }) => {
    const { title, description, location, price, category, tags, discount, startDate, endDate, time, isBookingAvailable, reviews, averageRating, advertiser } = activity;

    return (
        <div className="activity-container">
            <div className="activity-header">
                <h2>{title}</h2>
                <p className="average-rating">Average Rating: <strong>{averageRating}</strong></p>
            </div>

            <div className="activity-body">
                <div className="description-section">
                    <p className="description"><strong>Description:</strong> {description}</p>
                </div>

                <div className="location-section">
                    <p><strong>Location: </strong>{`lat: ${location.lat}, lng: ${location.lng}`}</p>
                </div>

                <div className="price-section">
                    <p><strong>Price: </strong> ${price}</p>
                </div>

                <div className="category-section">
                    <p><strong>Category: </strong>
                        {category.map((cat) => (
                            <li key={cat.id}>{cat.name} </li>
                        ))}
                    </p>
                </div>

                <div className="tags-section">
                    <p><strong>Tags: </strong>
                        {tags.map((tag) => (
                            <li key={tag.id}>{tag.name} </li>
                        ))}
                    </p>
                </div>

                <div className="discount-section">
                    <p><strong>Discount(s): </strong></p>
                    {discount.length === 0 && <p>No discounts available.</p>}
                    {discount.map((dis) => (
                        <li key={dis.id}>
                            <strong>{dis.percentage}%</strong> - {dis.description}
                        </li>
                    ))}

                </div>

                <div className="availability-section">
                    <p><strong>Available Dates:</strong> {dayjs(startDate).format(DATE_FORMAT)} {endDate && ` - ${dayjs(endDate).format(DATE_FORMAT)}`}</p>
                    <p><strong>Time:</strong> {time}</p>
                    <p><strong>Booking Availability:</strong> {isBookingAvailable ? 'Accepting' : 'No Longer Accepting'}</p>
                </div>

                <div className="advertiser-section">
                    <p><strong>Advertiser:</strong> {advertiser.username}</p>
                </div>

                <div className="reviews-section">
                    <p><strong>Reviews:</strong></p>
                    {reviews.length === 0 && <p>No reviews available.</p>}
                    <ul className="reviews-list">
                        {
                            reviews.map((review) => (
                                <li key={review.id}>
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
};

export default Activity;
