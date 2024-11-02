import { useState, useEffect } from 'react';
import Itinerary from '../itineraryComponents/Itinerary';
import EditItinerary from '../itineraryComponents/EditItinerary';
import { fetchItinerary } from '../../services/api';
const ManageItinerary = ({ id }) => {
    const [itinerary, setItinerary] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    useEffect(() => {
        const fetch = async () => {
            const fetchedItinerary = await fetchItinerary(id);
            setItinerary(fetchedItinerary);
        };
        fetch();
    }, [isEdit]);
    return (
        <div>
            {itinerary ? (<div className="itinerary-details">
                {!isEdit && <button className="edit-btn" onClick={() => setIsEdit(true)}>✏️</button>}
                {!isEdit && <Itinerary itinerary={itinerary} />}
                {isEdit && <EditItinerary itinerary={itinerary} setIsEdit={setIsEdit} />}
            </div>
            ) : <p>Loading...⌛</p>}
        </div>
    );
};
export default ManageItinerary;