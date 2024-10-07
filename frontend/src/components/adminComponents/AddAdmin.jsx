import { useState } from "react";
import { DisplayMessage } from "../input form components";
import { Input } from "../input form components";

const AddAdmin = () => {
    // State to handle form inputs
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errClassName, setErrClassName] = useState("");
    const [error, setError] = useState("");

    const handleAddAdmin = async (event) => {
        event.preventDefault();
        const admin = {
            username,
            password,
        };
        const response = await fetch("/api/admin/admin/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(admin),
        });
        const json = await response.json();
        console.log("new admin added:\n", json);
        if (!response.ok) {
            setError(json.message);
            setErrClassName("err-msg");
        } else {
            setError("Admin added successfully!");
            setErrClassName("success-msg");
            // Reset form fields
            setUsername("");
            setPassword("");
        }
    };
    return (
        <form onSubmit={handleAddAdmin}>
            <h3>Add Admin</h3>

            <Input
              label={"Username"}
              type={"text"}
              value={username}
              setValue={setUsername}
              required={true}
            />
            <Input
              label={"Password"}
              type={"password"}
              value={password}
              setValue={setPassword}
              required={true}
            />
            {error && <DisplayMessage msg={error} className={errClassName} />}
            <button className="btn" type="submit">
                Add
            </button>
        </form>
    );
};

export default AddAdmin;
