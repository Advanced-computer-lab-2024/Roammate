import CachedIcon from "@mui/icons-material/Cached";

const AdminViewActivity = ({ activity }) => {
  if (!activity) {
    return (
      <h2>
        {" "}
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

  return <h2>{activity.title}</h2>;
};

export default AdminViewActivity;
