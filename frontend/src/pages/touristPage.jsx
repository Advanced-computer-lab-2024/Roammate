import ProductList from "../components/ProductList";
import FilterActivities from "../components/shared/filterActivitiesComponent";
import GetMuseums from "../components/shared/getMuseumsComponent";
import GetAllItineraries from "../components/tourGuideComponents/getAllItineraries";

const TouristPage = () => {
  return (
    <div>
      <ProductList />
      <FilterActivities />
      <GetAllItineraries />
      <GetMuseums />
    </div>
  );
};

export default TouristPage;
