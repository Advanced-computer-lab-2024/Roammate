import CreateActivityComponent from "../components/advertiserComponents/createActivityComponent";
import DeleteActivityComponent from "../components/advertiserComponents/deleteActivityComponent";
import GetActivitiesWithEdit from "../components/shared/getActivityComponent";

const AdvertiserPage = () => {
  return (
    <div>
      <CreateActivityComponent />
      <GetActivitiesWithEdit />
      <DeleteActivityComponent />
    </div>
  );
};

export default AdvertiserPage;
