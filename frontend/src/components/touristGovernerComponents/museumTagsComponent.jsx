import { useEffect, useState } from "react";
import {
  fetchMuseumTags,
  createMuseumTag,
  updateMuseumTag,
  deleteMuseumTag,
} from "../../services/api"; // Ensure you have the appropriate API functions

const MuseumTags = () => {
  const [tags, setTags] = useState([]);
  const [newTagType, setNewTagType] = useState("");
  const [newTagValue, setNewTagValue] = useState("");
  const [editTagId, setEditTagId] = useState(null);
  const [editTagType, setEditTagType] = useState("");
  const [editTagValue, setEditTagValue] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadTags = async () => {
    setLoading(true);
    try {
      const response = await fetchMuseumTags();
      setTags(response.data);
    } catch (err) {
      setError("Failed to load tags.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTag = async (e) => {
    e.preventDefault();
    if (!newTagType.trim() || !newTagValue.trim()) return;

    try {
      const response = await createMuseumTag({
        type: newTagType,
        value: newTagValue,
      });
      setTags((prev) => [...prev, response.data]);
      setNewTagType(""); // Clear the input after adding
      setNewTagValue(""); // Clear the input after adding
    } catch (err) {
      setError("Failed to add tag.");
      console.log(err);
    }
  };

  const handleEditTag = async (e) => {
    e.preventDefault();
    if (!editTagType.trim() || !editTagValue.trim()) return;

    try {
      const response = await updateMuseumTag(editTagId, {
        type: editTagType,
        value: editTagValue,
      });
      setTags((prev) =>
        prev.map((tag) => (tag._id === editTagId ? response.data : tag))
      );
      setEditTagId(null); // Clear edit state
      setEditTagType(""); // Clear the input after editing
      setEditTagValue(""); // Clear the input after editing
    } catch (err) {
      setError("Failed to update tag.");
      console.log(err);
    }
  };

  const handleDeleteTag = async (tagId) => {
    try {
      await deleteMuseumTag(tagId);
      setTags((prev) => prev.filter((tag) => tag._id !== tagId));
    } catch (err) {
      setError("Failed to delete tag.");
      console.log(err);
    }
  };

  useEffect(() => {
    loadTags();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Museum Tags</h2>
      <form onSubmit={handleAddTag}>
        <input
          type="text"
          placeholder="Tag Type (Type/Historical Period)"
          value={newTagType}
          onChange={(e) => setNewTagType(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tag Value"
          value={newTagValue}
          onChange={(e) => setNewTagValue(e.target.value)}
        />
        <button type="submit">Add Tag</button>
      </form>

      {editTagId && (
        <form onSubmit={handleEditTag}>
          <input
            type="text"
            placeholder="Edit Tag Type"
            value={editTagType}
            onChange={(e) => setEditTagType(e.target.value)}
          />
          <input
            type="text"
            placeholder="Edit Tag Value"
            value={editTagValue}
            onChange={(e) => setEditTagValue(e.target.value)}
          />
          <button type="submit">Update Tag</button>
        </form>
      )}

      <ul>
        {tags.map((tag) => (
          <li key={tag._id}>
            <strong>Type:</strong> {tag.type}, <strong>Value:</strong>{" "}
            {tag.value}
            <button
              onClick={() => {
                setEditTagId(tag._id);
                setEditTagType(tag.type);
                setEditTagValue(tag.value);
              }}
            >
              Edit
            </button>
            <button onClick={() => handleDeleteTag(tag._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MuseumTags;
