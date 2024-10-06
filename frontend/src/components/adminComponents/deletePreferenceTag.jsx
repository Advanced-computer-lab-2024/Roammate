import { useEffect, useState } from "react";
import { fetchPreferenceTags, deletePreferenceTag } from "../../services/api"; // Adjust the import path as needed

const DeletePreferenceTag = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rererender, setRerender] = useState(0);

  const handleRerender = () => {
    setRerender(rererender + 1);
  };

  useEffect(() => {
    const getTags = async () => {
      try {
        const response = await fetchPreferenceTags();
        setTags(response.data);
      } catch (error) {
        setError("Failed to fetch preference tags");
        console.error("Error fetching tags:", error);
      } finally {
        setLoading(false);
      }
    };

    getTags();
  }, [rererender]);

  const handleDelete = async (id) => {
    try {
      await deletePreferenceTag(id);
      setTags(tags.filter((tag) => tag._id !== id)); // Remove the deleted tag from the state
    } catch (error) {
      setError("Failed to delete preference tag");
      console.error("Error deleting tag:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Delete Preference Tags</h2>
      <button onClick={handleRerender}>Reload</button>
      <ul>
        {tags.map((tag) => (
          <li key={tag._id}>
            {tag.name}
            <button onClick={() => handleDelete(tag._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeletePreferenceTag;
