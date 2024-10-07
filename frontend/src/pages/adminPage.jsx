import CreatePreferenceTagComponent from "../components/adminComponents/createPreferenceTagComponent";
import DeletePreferenceTag from "../components/adminComponents/deletePreferenceTag";
import EditPreferenceTag from "../components/adminComponents/editPreferenceTag";
import ReadPreferenceTags from "../components/adminComponents/readPreferenceTag";
import ProductList from "../components/ProductList";
import AddProduct from "../components/AddProduct";
import ActivityCategories from "../components/adminComponents/readCreateActivityCategories";
import FilterActivities from "../components/shared/filterActivitiesComponent";
import FilterItineraries from "../components/touristComponent/filterItinerary";

const AdminPage = () => {
  return (
    <div>
      <CreatePreferenceTagComponent />
      <ReadPreferenceTags />
      <DeletePreferenceTag />
      <EditPreferenceTag />
      <AddProduct />
      <ProductList />
      <ActivityCategories />
      <FilterActivities />
      <FilterItineraries />
    </div>
  );
};

export default AdminPage;
