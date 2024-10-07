import React, { useState, useEffect } from "react";
import { Input, Btn, DisplayMessage } from "../input form components";

const TourGuideEditProfile = ({ id }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [YOE, setYOE] = useState("");
  const [languages, setLanguages] = useState("");
  const [previousWork, setPreviousWork] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [errClassName, setErrClassName] = useState("err-msg");
  const [edit, setEdit] = useState(false);
  const [disabled, setDisabled] = useState(true);

  //fetch data from backend and display it in the form
  useEffect(() => {
    const fetchTourGuide = async () => {
      const response = await fetch(`/api/tourGuide/${id}`);
      const json = await response.json();
      setUsername(json.username);
      setEmail(json.email);
      setMobile(json.mobile);
      setYOE(json.yearsOfExperience);
      setLanguages(json.languages);
      setPreviousWork(json.previousWork);
      setDescription(json.description);
    };
    fetchTourGuide();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const tourGuide = {
      email,
      mobile,
      yearsOfExperience: YOE,
      languages: String(languages).replace(/\s+/g, "").split(","),
      previousWork,
      description,
    };
    const response = await fetch(`/api/tourGuide/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tourGuide),
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
            disabled={disabled}
          />
          <Input
            label={"Years of Experience"}
            type={"text"}
            value={YOE}
            setValue={setYOE}
            disabled={disabled}
          />
          <Input
            label={"Previous Work"}
            type={"text"}
            value={previousWork}
            setValue={setPreviousWork}
            disabled={disabled}
          />
          <Input
            label={"Languages"}
            type={"text"}
            value={languages}
            setValue={setLanguages}
            disabled={disabled}
          />
          <Input
            label={"About"}
            type={"text"}
            value={description}
            setValue={setDescription}
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

export default TourGuideEditProfile;
