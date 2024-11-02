const Monument = ({ details }) => {
    /*name, description, pictures(many), location, openingHours,
    ticketPrices(array of different ranges), tags(array of tags),
    monumentTags(array of tags), tourismGovernor*/
    const { name, description, pictures, location, openingHours, ticketPrices, tags, monumentTags, tourismGovernor } = details;
    return (
        <div className="monument">
            <h2>{name}</h2>
            <p>{description}</p>
            <h2>Location:</h2>
            <p>{`${location.lat}, ${location.lng}`}</p>
            <h2>Opening Hours:</h2>
            <ul>
                {openingHours.map((hours, index) => (
                    <li key={index}>
                        {hours.day}: {hours.open} - {hours.close}
                    </li>
                ))}
            </ul>
            <h2>Ticket Prices:</h2>
            <ul>
                {ticketPrices.map((ticket, index) => (
                    <li key={index}>
                        {ticket.for}: ${ticket.price}
                    </li>
                ))}
            </ul>
            <h2>Pictures:</h2>
            <div>
                {pictures.map((picture, index) => (
                    <img key={index} src={picture} alt={name} style={{ width: '200px', height: 'auto' }} />
                ))}
            </div>
            <h2>Tags:</h2>
            <ul>
                {tags.map((tag) => (
                    <li key={tag._id}>{tag.name}</li>
                ))}
            </ul>
            <h2>Monument Tags:</h2>
            <ul>
                {monumentTags.map((tag) => (
                    <li key={tag._id}>{tag.name}</li>
                ))}
            </ul>
            <h2>Tourism Governor:</h2>
            <p>{tourismGovernor.username}</p>
        </div>
    );
}

export default Monument;