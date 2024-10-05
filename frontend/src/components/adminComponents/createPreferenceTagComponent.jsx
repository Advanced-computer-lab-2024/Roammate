import { useState } from "react";
import { createPreferenceTag } from "../../services/api";

const CreatePreferenceTagComponent = () => {
  const [name, setName] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = { name };
      const response = createPreferenceTag(data);

      console.log("Response from server:", response);
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <div>
      <div>Creating Preference Tag</div>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)} // Update the state on change
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePreferenceTagComponent;
