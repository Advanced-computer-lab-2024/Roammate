import CreatePreferenceTagComponent from "../components/adminComponents/createPreferenceTagComponent";
import DeletePreferenceTag from "../components/adminComponents/deletePreferenceTag";
import EditPreferenceTag from "../components/adminComponents/editPreferenceTag";
import ReadPreferenceTags from "../components/adminComponents/readPreferenceTag";
import ProductList from "../components/ProductList";
import AddProduct from "../components/AddProduct";

const AdminPage = () => {
  return (
    <div>
      <CreatePreferenceTagComponent />
      <ReadPreferenceTags />
      <DeletePreferenceTag />
      <EditPreferenceTag />
      <AddProduct />
      <ProductList />
    </div>
  );
};

export default AdminPage;
