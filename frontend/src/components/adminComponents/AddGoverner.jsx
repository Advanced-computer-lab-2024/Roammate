import { useState } from "react";
import { tourismGovernorPost } from "../../services/api";

const AddGovernor = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msgClassName, setMsgClassName] = useState("");
    const [msg, setMsg] = useState("");

    const handleAddGovernor = async (event) => {
        event.preventDefault();
        const governor = {
            username,
            password,
        };
        try {
            await tourismGovernorPost(governor);
            setMsg("Governor added successfully!");
            setMsgClassName("success-msg");
        } catch (err) {
            setMsg("Failed to add governor! Error: " + err.message);
            setMsgClassName("err-msg");
            // Reset form fields
            setUsername("");
            setPassword("");
        }
    };
    return (
        <form onSubmit={handleAddGovernor}>
            <h3>Add Governor</h3>
            <label htmlFor="name">Username:</label>
            <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            {msg && <div className={msgClassName}>{msg}</div>}
            <button className="btn" type="submit">
                Add
            </button>
        </form>
    );
};

export default AddGovernor;
