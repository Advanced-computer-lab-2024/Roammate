import { useEffect, useState } from "react";
import { deleteActivityCategory, fetchActivityCategories, updateActivityCategory } from "../../services/api";
const UpdateActivityCategory = () => {
  const [categories, setCategories] = useState([]);
  const [categoryNewName, setCategoryNewName] = useState("");
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [msg, setMsg] = useState("");
  const [msgClassName, setMsgClassName] = useState("");

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchActivityCategories();
        setCategories(data);
        if (data.length === 0) {
          setMsg("No activity categories found!");
          setMsgClassName("err-msg");
        }
      } catch (error) {
        setMsg("Failed to fetch activity categories! Error: " + error.message);
        setMsgClassName("err-msg");
      }
    };
    getCategories();

  }, []);

  const handleEdit = async (id) => {
    try {
      await updateActivityCategory(id, { name: categoryNewName });
      setMsg("Activity category updated successfully!");
      setMsgClassName("success-msg");
      setEditCategoryId(null);
      setCategories(categories.map(category => (category._id === id ? { ...category, name: categoryNewName } : category))); // Update the category in the state
    } catch (error) {
      setMsg("Failed to update activity category! Error: " + error.message);
      setMsgClassName("err-msg");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteActivityCategory(id);
      setCategories(categories.filter((category) => category._id !== id)); // Remove the deleted category from the state
      setMsg("Activity category deleted successfully!");
      setMsgClassName("success-msg");
    } catch (error) {
      setMsg("Failed to delete activity category! Error: " + error.message);
      setMsgClassName("err-msg");
    }
  }
  return (
    <div>
      <h2>Activity Categories</h2>
      {
        msg && <div className={msgClassName} > {msg} </div>
      } {categories.length > 0 &&
        categories.map(category => (
          <div key={category._id} >
            {
              editCategoryId === category._id ? (
                <form onSubmit={(e) => { e.preventDefault(); handleEdit(category._id); }}>
                  <input type="text" id={category._id} value={category.name} placeholder={category.name} required onChange={(e) => setCategoryNewName(e.target.value)} />
                  <button type="submit">Save</button>
                  <button type="button" onClick={() => setEditCategoryId(null)}>Cancel</button>
                </form>
              ) : (
                <div>
                  <p> {category.name} </p>
                  <button onClick={
                    () =>
                      setEditCategoryId(category._id)
                  }
                  > Edit </button>
                  <button onClick={
                    () => handleDelete(category._id)
                  } > Delete </button>
                </div>
              )
            }
          </div>
        ))
      }
      );
    </div>
  );
}

export default UpdateActivityCategory;