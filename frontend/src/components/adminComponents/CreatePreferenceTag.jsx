import { useState } from "react";
import { createPreferenceTag } from "../../services/api";

const CreatePreferenceTag = () => {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [msgClassName, setMsgClassName] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createPreferenceTag(name);
      setMsg("Preference tag created successfully!");
      setMsgClassName("success-msg");
    } catch (error) {
      setMsg("Failed to create preference tag! Error: " + error.message);
      setMsgClassName("err-msg");
    }
  };

  return (
    <div>
      <h2>Create Preference Tag</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {msg && <div className={msgClassName}>{msg}</div>}
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePreferenceTag;
