import { useState } from 'react';
import { createActivityCategory } from '../../services/api';
const CreateActivityCategory = () => {
    const [name, setName] = useState("");
    const [msg, setMsg] = useState("");
    const [msgClassName, setMsgClassName] = useState("");
    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createActivityCategory(name);
            setMsg("Activity category created successfully!");
            setMsgClassName("success-msg");
        } catch (error) {
            setMsg("Failed to create activity category! Error: " + error.message);
            setMsgClassName("err-msg");
        }
    }
    return (
        <div>
            <h2>Create Activity Category</h2>
            <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    {msg && <div className={msgClassName}>{msg}</div>}
                    <button type="submit">Add</button>
                </form>
            </div>
        </div>
    );
}

export default CreateActivityCategory;