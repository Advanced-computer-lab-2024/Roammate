import CachedIcon from "@mui/icons-material/Cached";

const TouristViewComplaint = ({ complaint }) => {
  if (!complaint) {
    return (
      <h2>
        loading
        <CachedIcon
          sx={{
            fontSize: "25px",
            ml: "10px",
            mb: "-5px",
          }}
        />
      </h2>
    );
  }

  return <h2>{complaint.title}</h2>;
};

export default TouristViewComplaint;
