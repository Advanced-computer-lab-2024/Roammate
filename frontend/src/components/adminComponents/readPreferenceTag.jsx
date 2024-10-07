import { useEffect, useState } from "react";
import { fetchPreferenceTags } from "../../services/api"; // Adjust the import path as needed

const ReadPreferenceTags = () => {
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Preference Tags</h2>
      <button onClick={handleRerender}>Reload</button>
      <ul>
        {tags.map((tag) => (
          <li key={tag._id}>{tag.name}</li> // Assuming tag has an _id and name
        ))}
      </ul>
    </div>
  );
};

export default ReadPreferenceTags;
