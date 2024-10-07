import ProductList from "../components/ProductList";
import GetActivity from "../components/shared/getActivityComponent";
import GetMuseums from "../components/shared/getMuseumsComponent";
import GetAllItineraries from "../components/tourGuideComponents/getAllItineraries";

const TouristPage = () => {
  return (
    <div>
      <ProductList />
      <GetActivity />
      <GetAllItineraries />
      <GetMuseums />
    </div>
  );
};

export default TouristPage;
