import { useState } from "react";
import { adminPost } from "../../services/api";

const AddAdmin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msgClassName, setMsgClassName] = useState("");
    const [msg, setMsg] = useState("");

    const handleAddAdmin = async (event) => {
        event.preventDefault();
        const admin = {
            username,
            password,
        };
        try {
            await adminPost(admin);
            setMsg("Admin added successfully!");
            setMsgClassName("success-msg");
        } catch (error) {
            setMsg("Failed to add admin! Error: " + error.message);
            setMsgClassName("err-msg");
            // Reset form fields
            setUsername("");
            setPassword("");
        }
    }
    return (
        <form onSubmit={handleAddAdmin}>
            <h3>Add Admin</h3>
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

export default AddAdmin;
