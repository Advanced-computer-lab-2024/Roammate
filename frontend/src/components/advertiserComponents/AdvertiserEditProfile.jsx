import React, { useState, useEffect } from "react";
import { Input, Btn, DisplayMessage } from "../input form components";

const AdvertiserEditProfile = ({ id }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [hotline, setHotline] = useState("");
  const [description, setDescription] = useState("");
  const [foundedYear, setFoundedYear] = useState("");
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [employees, setEmployees] = useState("");
  const [services, setServices] = useState([]);
  const [error, setError] = useState("");
  const [errClassName, setErrClassName] = useState("err-msg");
  const [edit, setEdit] = useState(false);
  const [disabled, setDisabled] = useState(true);

  //fetch data from backend and display it in the form
  useEffect(() => {
    const fetchAdvertiser = async () => {
      const response = await fetch(`/api/Advertiser/${id}`);
      const json = await response.json();
      const companyProfile = json.companyProfile;
      setUsername(json.username);
      setEmail(json.email);
      setWebsite(json.website);
      setHotline(json.hotline);
      setDescription(json.companyProfile.description);
      setFoundedYear(json.companyProfile.foundedYear);
      setIndustry(json.companyProfile.industry);
      setLocation(json.companyProfile.location);
      setEmployees(json.companyProfile.employees);
      setServices(json.companyProfile.services);
    };
    fetchAdvertiser();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const Advertiser = {
      email,
      website,
      hotline,
      companyProfile: {
        description,
        foundedYear,
        industry,
        location,
        employees,
        services,
      },
    };
    const response = await fetch(`/api/Advertiser/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Advertiser),
    });

    const json = await response.json();
    if (!response.ok) {
      setErrClassName("err-msg");
      setError(json.message);
    } else {
      setErrClassName("success-msg");
      setError("Profile updated!👍");
      setDisabled(true);
      setEdit(false);
    }
  };

  return (
    <div className="edit-profile">
      <h2>Profile</h2>
      {
        <form onSubmit={handleSubmit}>
          <Input
            label={"Username"}
            type={"text"}
            value={username}
            setValue={setUsername}
            required={true}
            disabled={true}
          />
          <Input
            label={"Email"}
            type={"email"}
            value={email}
            setValue={setEmail}
            required={true}
            disabled={disabled}
          />
          <Input
            label={"Website"}
            type={"text"}
            value={website}
            setValue={setWebsite}
            disabled={disabled}
          />
          <Input
            label={"Hotline"}
            type={"text"}
            value={hotline}
            setValue={setHotline}
            disabled={disabled}
          />

          <Input
            label={"description"}
            type={"text"}
            value={description}
            setValue={setDescription}
            disabled={disabled}
          />

          <Input
            label={"foundedYear"}
            type={"number"}
            value={foundedYear}
            setValue={setFoundedYear}
            disabled={disabled}
          />
          <Input
            label={"industry"}
            type={"text"}
            value={industry}
            setValue={setIndustry}
            disabled={disabled}
          />
          <Input
            label={"location"}
            type={"text"}
            value={location}
            setValue={setLocation}
            disabled={disabled}
          />
          <Input
            label={"employees"}
            type={"number"}
            value={employees}
            setValue={setEmployees}
            disabled={disabled}
          />
          <Input
            label={"services"}
            type={"text"}
            value={services}
            setValue={setServices}
            disabled={disabled}
          />

          {error && <DisplayMessage msg={error} className={errClassName} />}
          <br />
          <hr />

          {/* <Btn text={"Update"} type={"submit"} /> */}
          {!edit && (
            <button
              className={"btn"}
              type="button"
              onClick={() => {
                setDisabled(false);
                setEdit(true);
              }}
            >
              Edit
            </button>
          )}

          {edit && <Btn text={"Submit"} type={"submit"} />}
        </form>
      }
    </div>
  );
};

export default AdvertiserEditProfile;
