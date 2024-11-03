import React, { useEffect, useState } from 'react';

const TouristBookedActivities = ({ id }) => {
    const [bookedActivities, setBookedActivities] = useState([]);
    useEffect(() => {
        const fetchBookedActivities = async () => {
            const response = await fetch(`http://localhost:5000/tourist/bookings/activities/${id}`);
            const data = await response.json();
            setBookedActivities(data);
        }
        setBookedActivities(fetchBookedActivities);
    }, [id]);

    return (
        <div>
            <h1>Booked Activities</h1>
        </div>
    );
}

export default TouristBookedActivities;