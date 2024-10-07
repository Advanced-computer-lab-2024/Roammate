import { useState } from "react";
import { DisplayMessage } from "../input form components";
import { Input } from "../input form components";

const AddGoverner = () => {
    // State to handle form inputs
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errClassName, setErrClassName] = useState("");
    const [error, setError] = useState("");

    const handleAddGoverner = async (event) => {
        event.preventDefault();
        const governer = {
            username,
            password,
        };
        const response = await fetch("/api/admin/tourismGoverner/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(governer),
        });
        const json = await response.json();
        console.log("new governer added:\n", json);
        if (!response.ok) {
            setError(json.message);
            setErrClassName("err-msg");
        } else {
            setError("Governer added successfully!");
            setErrClassName("success-msg");
            // Reset form fields
            setUsername("");
            setPassword("");
        }
    };
    return (
        <form onSubmit={handleAddGoverner}>
            <h3>Add Governer</h3>
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

export default AddGoverner;
