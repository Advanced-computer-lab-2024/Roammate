import React, { useState, useEffect } from "react";
import { Input, Btn, DisplayMessage } from "../input form components";

const SellerEditProfile = ({ id }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [errClassName, setErrClassName] = useState("err-msg");
  const [edit, setEdit] = useState(false);
  const [disabled, setDisabled] = useState(true);

  //fetch data from backend and display it in the form
  useEffect(() => {
    const fetchSeller = async () => {
      const response = await fetch(`/api/seller/${id}`);
      const json = await response.json();
      setUsername(json.username);
      setName(json.name);
      setEmail(json.email);
      setDescription(json.description);
    };
    fetchSeller();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const seller = {
      email,
      name,
      description,
    };
    const response = await fetch(`/api/seller/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(seller),
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
            label={"Name"}
            type={"text"}
            value={name}
            setValue={setName}
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

export default SellerEditProfile;
