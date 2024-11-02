import { useState, useEffect } from "react";
import Activity from "../activityComponents/Activity";
import EditActivity from "../activityComponents/EditActivity";
import { fetchActivity } from "../../services/api";
const ManageActivity = ({ id }) => {
  const [activity, setActivity] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const fetchedActivity = await fetchActivity(id);
      setActivity(fetchedActivity);
    };
    fetch();
  }, [isEdit]);

  return (
    <div>
      {activity ? (<div className="activity-details">
        {!isEdit && <button className="edit-btn" onClick={() => setIsEdit(true)}>✏️</button>}
        {!isEdit && <Activity activity={activity} />}
        {isEdit && <EditActivity activity={activity} setIsEdit={setIsEdit} />}
      </div>
      ) : <p>Loading...⌛</p>}

    </div>
  );
}

export default ManageActivity;