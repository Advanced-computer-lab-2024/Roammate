import FilterActivities from "../components/shared/filterActivitiesComponent";
import FilterItineraries from "../components/touristComponent/filterItinerary";

const GuestPage = () => {
  return (
    <div>
      <FilterItineraries />
      <FilterActivities />
    </div>
  );
};

export default GuestPage;
