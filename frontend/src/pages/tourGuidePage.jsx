import CreateItineraryComponent from "../components/tourGuideComponents/createItinerary";
import GetAllItineraries from "../components/tourGuideComponents/getAllItineraries";
import ViewItineraryComponent from "../components/tourGuideComponents/getAllItinerariesbyid";
import UpdateItineraryComponent from "../components/tourGuideComponents/updateItinerary";
import DeleteItineraryComponent from "../components/tourGuideComponents/deleteItinerary";


const TourGuidePage = () => {
  return (
    <div>
      <h1>Tour Guide Page</h1>

      <div>
        
        <CreateItineraryComponent />
      </div>

      <div>
        
        <ViewItineraryComponent />
      </div>

      <div>
        
        <UpdateItineraryComponent />
      </div>

      <div>
        
        <DeleteItineraryComponent />
      </div>

      <div>
        
        <GetAllItineraries />
      </div>
    </div>
  );
};

export default TourGuidePage;
