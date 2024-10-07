import { useState } from "react";
import {
  Input,
  DisplayMessage,
  AlreadyHaveAnAccount,
  Btn,
} from "../../components/input form components";

import GuestNavbar from "../../components/Navbars/GuestNavbar";
import GuestSidebar from "../../components/Sidebars/GuestSidebar";

const DefaultRegister = ({ role }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState(null);

  const roleTitle = (role) => {
    switch (role.toLowerCase()) {
      case "tourguide":
        return "Tour Guide";
      case "seller":
        return "Seller";
      case "advertiser":
        return "Advertiser";
      default:
        return "User";
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = {
      username,
      email,
      password,
    };

    const response = await fetch(`http://localhost:8000/api/${role}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const json = await response.json();

    console.log(`new ${roleTitle(role)} added:\n`, json);

    if (!response.ok) {
      setError(json.message);
    } else {
      setError("");
      setUsername("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="register">
      <GuestNavbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className="main-container">
        <div className="content">
          <h2 style={{ margin: "15px" }}>Register as a {roleTitle(role)}</h2>
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

            {error && <DisplayMessage msg={error} className={"err-msg"} />}
            <br />
            <hr />

            <Btn text={"Register"} type={"submit"} />
            <AlreadyHaveAnAccount link={`/${role}login`} />
          </form>
        </div>
        {isSidebarOpen && <GuestSidebar setContent={setActiveContent} />}
      </div>
    </div>
  );
};
export default DefaultRegister;
