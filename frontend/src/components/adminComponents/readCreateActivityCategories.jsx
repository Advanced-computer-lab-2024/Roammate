import { useEffect, useState } from "react";
import {
  fetchActivityCategories,
  createActivityCategory,
  updateActivityCategory,
  deleteActivityCategory,
} from "../../services/api";

const ActivityCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const response = await fetchActivityCategories();
      setCategories(response.data);
    } catch (err) {
      setError("Failed to load categories.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;

    try {
      const response = await createActivityCategory({ name: newCategory });
      setCategories((prev) => [...prev, response.data]);
      setNewCategory(""); // Clear the input after adding
    } catch (err) {
      setError("Failed to add category.");
      console.log(err);
    }
  };

  const handleEditCategory = async (e) => {
    e.preventDefault();
    if (!editCategoryName.trim()) return;

    try {
      const response = await updateActivityCategory(editCategoryId, {
        name: editCategoryName,
      });
      setCategories((prev) =>
        prev.map((category) =>
          category._id === editCategoryId ? response.data : category
        )
      );
      setEditCategoryId(null); // Clear edit state
      setEditCategoryName(""); // Clear the input after editing
    } catch (err) {
      setError("Failed to update category.");
      console.log(err);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await deleteActivityCategory(categoryId);
      setCategories((prev) =>
        prev.filter((category) => category._id !== categoryId)
      );
    } catch (err) {
      setError("Failed to delete category.");
      console.log(err);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Activity Categories</h2>
      <form onSubmit={handleAddCategory}>
        <input
          type="text"
          placeholder="New category name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button type="submit">Add Category</button>
      </form>

      {editCategoryId && (
        <form onSubmit={handleEditCategory}>
          <input
            type="text"
            placeholder="Edit category name"
            value={editCategoryName}
            onChange={(e) => setEditCategoryName(e.target.value)}
          />
          <button type="submit">Update Category</button>
        </form>
      )}

      <ul>
        {categories.map((category) => (
          <li key={category._id}>
            {category.name}
            <button
              onClick={() => {
                setEditCategoryId(category._id);
                setEditCategoryName(category.name);
              }}
            >
              Edit
            </button>
            <button onClick={() => handleDeleteCategory(category._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityCategories;
