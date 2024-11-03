import { useState } from "react";

import GuestNavbar from "../../components/Navbars/GuestNavbar";

import {
  Input,
  AlreadyHaveAnAccount,
  DisplayMessage,
} from "../../components/inputComponents";
import GuestSidebar from "../../components/Sidebars/GuestSidebar";

const TouristRegister = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [nationality, setNationality] = useState("");
  const [DOB, setDOB] = useState("");
  const [job, setJob] = useState("");
  const [error, setError] = useState("");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== document.getElementById("retype-password").value) {
      setError("Passwords do not match");
      return;
    }
    const tourist = {
      username,
      email,
      password,
      mobile,
      nationality,
      DOB,
      job,
    };
    const response = await fetch("http://localhost:8000/api/tourist/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tourist),
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.message);
    } else {
      setError("");
      setUsername("");
      setEmail("");
      setPassword("");
      setMobile("");
      setNationality("");
      setDOB("");
      setJob("");
    }
  };
  return (
    <div className="register">
      <GuestNavbar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="main-container">
        <div className="content">
          <h2>Register as Tourist</h2>
          <form onSubmit={handleSubmit}>
            <Input
              label={"Username"}
              type={"text"}
              value={username}
              setValue={setUsername}
              required={true}
            />
            <Input
              label={"Email"}
              type={"email"}
              value={email}
              setValue={setEmail}
              required={true}
            />
            <Input
              label={"Password"}
              type={"password"}
              value={password}
              setValue={setPassword}
              required={true}
            />

            {/* retype password  */}
            <div className="form-group">
              <label htmlFor="retype-password">Retype Password</label>
              <input type="password" id="retype-password" required />
              <div />
            </div>

            <Input
              label={"Mobile"}
              type={"text"}
              value={mobile}
              setValue={setMobile}
              required={true}
            />
            <Input
              label={"Nationality"}
              type={"text"}
              value={nationality}
              setValue={setNationality}
              required={true}
            />
            <Input
              label={"Date of Birth"}
              type={"date"}
              value={DOB}
              setValue={setDOB}
              required={true}
            />
            <Input
              label={"Job"}
              type={"text"}
              value={job}
              setValue={setJob}
              required={true}
            />
            {error && <DisplayMessage msg={error} className={"err-msg"} />}
            <br />
            <hr />
            <button text={"Register"} type={"submit"}>
              submit
            </button>
            <AlreadyHaveAnAccount link={"/touristlogin"} />
          </form>
        </div>
        {isSidebarOpen && <GuestSidebar setContent={setActiveContent} />}
      </div>
    </div>
  );
};
export default TouristRegister;
