import CreateItineraryComponent from "../components/tourGuideComponents/createItinerary";
import GetAllItineraries from "../components/tourGuideComponents/getAllItineraries";



const TourGuidePage = () => {
  return (
  <div>
    <div>
      <CreateItineraryComponent />
    </div>

    <div>
      < GetAllItineraries/>
    </div>
  </div>
    
    
  );
};

export default TourGuidePage;
