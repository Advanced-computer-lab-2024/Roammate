import { useEffect, useState } from "react";
import { fetchPreferenceTags, deletePreferenceTag, updatePreferenceTag } from "../../services/api"; // Adjust the import path as needed

const UpdatePreferenceTags = () => {
  const [tags, setTags] = useState([]);
  const [tagNewName, setTagNewName] = useState("");
  const [editTagId, setEditTagId] = useState(null);
  const [msg, setMsg] = useState("");
  const [msgClassName, setMsgClassName] = useState("");


  useEffect(() => {
    const getTags = async () => {
      try {
        const data = await fetchPreferenceTags();
        setTags(data);
        if (data.length === 0) {
          setMsg("No preference tags found!");
          setMsgClassName("err-msg");
        }
      } catch (error) {
        setMsg("Failed to fetch preference tags! Error: " + error.message);
        setMsgClassName("err-msg");
      }
    };
    getTags();
  }, []);

  const handleEdit = async (id) => {
    try {
      await updatePreferenceTag(id, { name: tagNewName });
      setMsg("Preference tag updated successfully!");
      setMsgClassName("success-msg");
      setEditTagId(null);
      setTags(tags.map(tag => (tag._id === id ? { ...tag, name: tagNewName } : tag))); //Update the tag in the state
    }
    catch (error) {
      setMsg("Failed to update preference tag! Error: " + error.message);
      setMsgClassName("err-msg");
    }
  }

  const handleDelete = async (id) => {
    try {
      await deletePreferenceTag(id);
      setTags(tags.filter((tag) => tag._id !== id)); // Remove the deleted tag from the state
      setMsg("Preference tag deleted successfully!");
      setMsgClassName("success-msg");
    } catch (error) {
      setMsg("Failed to delete preference tag! Error: " + error.message);
      setMsgClassName("err-msg");
    }
  };

  return (
    <div>
      <h2>Preference Tags</h2>
      {
        msg && <div className={msgClassName}>{msg}</div>
      }
      {tags.length > 0 && tags.map((tag) => (
        <div key={tag._id}>
          {tag._id === editTagId ? (
            <form onSubmit={(e) => { e.preventDefault(); handleEdit(tag._id); }}>
              <input type="text" id={tag._id} value={tag.name} required onChange={(e) => setTagNewName(e.target.value)} />
              <button type="submit">Save</button>
              <button type="button" onClick={() => setEditTagId(null)}>Cancel</button>
            </form>

          ) : (
            <div>
              <p>{tag.name}</p>
              <button onClick={() => setEditTagId(tag._id)}>Edit</button>
              <button onClick={() => handleDelete(tag._id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
export default UpdatePreferenceTags;
