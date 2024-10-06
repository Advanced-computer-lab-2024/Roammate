import { useEffect, useState } from "react";
import { fetchPreferenceTags, updatePreferenceTag } from "../../services/api"; // Adjust the import path as needed

const EditPreferenceTag = () => {
  const [tags, setTags] = useState([]);
  const [selectedTagId, setSelectedTagId] = useState("");
  const [tagName, setTagName] = useState("");
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

  const handleEditChange = (e) => {
    const { value } = e.target;
    setTagName(value);
  };

  const handleSelectTag = (id, name) => {
    setSelectedTagId(id);
    setTagName(name);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updatePreferenceTag(selectedTagId, { name: tagName });
      setTags(
        tags.map((tag) =>
          tag._id === selectedTagId ? { ...tag, name: tagName } : tag
        )
      ); // Update the local state
      setSelectedTagId("");
      setTagName("");
    } catch (error) {
      setError("Failed to update preference tag");
      console.error("Error updating tag:", error);
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
      <h2>Edit Preference Tags</h2>
      <button onClick={handleRerender}>Reload</button>
      <ul>
        {tags.map((tag) => (
          <li key={tag._id}>
            {tag.name}
            <button onClick={() => handleSelectTag(tag._id, tag.name)}>
              Edit
            </button>
          </li>
        ))}
      </ul>

      {selectedTagId && (
        <form onSubmit={handleUpdate}>
          <label htmlFor="edit-name">Edit Name:</label>
          <input
            type="text"
            id="edit-name"
            value={tagName}
            onChange={handleEditChange}
            required
          />
          <button type="submit">Update</button>
        </form>
      )}
    </div>
  );
};

export default EditPreferenceTag;
