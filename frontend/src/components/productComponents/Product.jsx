const Product = ({ details }) => {
    //name, image, price, description, seller, reviews, quantity, averageRating
    const { name, image, price, description, seller, reviews, quantity, averageRating } = details;
    return (
        <div className="product">
            <h2>{name}</h2>
            <p>Image: {image}</p>
            <p>Price: {price}</p>
            <p>Description: {description}</p>
            <p>Seller: {seller.username}</p>
            <p>Quantity: {quantity}</p>
            <p>Average Rating: {averageRating}</p>
            <p>Reviews:
                {reviews ?
                    (reviews.map((review) => (
                        <li key={review.id}>
                            <h3>{review.user.username}</h3>
                            <p>Rating: {review.rating}</p>
                            <p>Comment: {review.comment}</p>
                        </li>
                    )))
                    :
                    (<p>No Reviews yet</p>)
                }
            </p>

        </div>
    );
}

export default Product;