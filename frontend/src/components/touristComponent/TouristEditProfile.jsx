import React, { useState, useEffect } from "react";
import { Input, Btn, DisplayMessage } from "../input form components";

const TouristEditProfile = ({ id }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [nationality, setNationality] = useState("");
  const [DOB, setDOB] = useState("");
  const [job, setJob] = useState("");
  const [error, setError] = useState("");
  const [errClassName, setErrClassName] = useState("err-msg");
  const [edit, setEdit] = useState(false);
  const [disabled, setDisabled] = useState(true);

  //fetch data from backend and display it in the form
  useEffect(() => {
    const fetchTourist = async () => {
      const response = await fetch(`/api/tourist/${id}`);
      const json = await response.json();
      setUsername(json.username);
      setEmail(json.email);
      setMobile(json.mobile);
      setNationality(json.nationality);

      //format DOB
      const date = new Date(json.DOB);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Ensures 2 digits for the month
      const day = String(date.getDate()).padStart(2, "0");
      const newDate = year + "-" + month + "-" + day;

      setDOB(newDate);
      setJob(json.job);
    };
    fetchTourist();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const tourist = {
      email,
      mobile,
      nationality,
      job,
    };
    const response = await fetch(`/api/tourist/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tourist),
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
            label={"Mobile"}
            type={"text"}
            value={mobile}
            setValue={setMobile}
            required={true}
            disabled={disabled}
          />
          <Input
            label={"Nationality"}
            type={"text"}
            value={nationality}
            setValue={setNationality}
            required={true}
            disabled={disabled}
          />
          <Input
            label={"Date of Birth"}
            type={"date"}
            value={DOB}
            setValue={setDOB}
            required={true}
            disabled={true}
          />
          <Input
            label={"Job"}
            type={"text"}
            value={job}
            setValue={setJob}
            required={true}
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

export default TouristEditProfile;
