import CachedIcon from "@mui/icons-material/Cached";

const TouristViewMuseum = ({ museum }) => {
  if (!museum) {
    return (
      <h2>
        Loading
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

  return <h2>{museum.name}</h2>;
};

export default TouristViewMuseum;
