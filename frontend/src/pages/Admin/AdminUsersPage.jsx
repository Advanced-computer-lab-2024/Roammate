import React, { useState, useEffect } from "react";
import { Box, Grid2, Select, MenuItem, Checkbox, ListItemText, FormControl, InputLabel } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import { fetchAllUsers, deleteUser } from "../../services/api";
import { useLocation, useOutletContext } from "react-router";
import UserCard from "../../components/adminComponents/UserCard";

const AdminUsersPage = () => {
    const [loading, setLoading] = useState(false);
    const [roles] = useState(["tour guide", "advertiser", "seller", "admin", "tourism governor", "tourist"]);
    const [selectedRoles, setSelectedRoles] = useState([]); // State for selected roles
    const [users, setUsers] = useState([]);

    const { setActiveButton } = useOutletContext();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id");

    const _fetchAllUsers = async () => {
        setLoading(true);
        let result = await fetchAllUsers();
        // Filter users based on selected roles
        result = result.filter(user => selectedRoles.length === 0 || selectedRoles.includes(user.role));
        setUsers(result);
        setLoading(false);
    };

    useEffect(() => {
        if (id) {
            setActiveButton(null);
        }
        _fetchAllUsers();
    }, [id, selectedRoles]); // Trigger re-fetch when selectedRoles changes

    const handleRoleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedRoles(typeof value === "string" ? value.split(",") : value);
    };

    const removeUser = (userId) => {
        setUsers((prevUsers) => prevUsers.filter(user => user._id !== userId));
    };

    return (
        <Box>
            {/* Multi-Select Role Filter on Top with Fixed Width */}
            <Box sx={{ width: "300px", mb: 2 }}>
                <FormControl fullWidth>
                    <InputLabel>Roles</InputLabel>
                    <Select
                        multiple
                        value={selectedRoles}
                        onChange={handleRoleChange}
                        renderValue={(selected) => selected.join(", ")}
                    >
                        {roles.map((role) => (
                            <MenuItem key={role} value={role}>
                                <Checkbox checked={selectedRoles.indexOf(role) > -1} />
                                <ListItemText primary={role} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <Grid2 container spacing={1}>
                <Grid2 xs={12} sx={{ flexGrow: 1 }}>
                    {/* Users List */}
                    {users.length === 0 &&
                        (loading ? (
                            <h2>
                                Loading
                                <CachedIcon sx={{ fontSize: "25px", ml: "10px", mb: "-5px" }} />
                            </h2>
                        ) : (
                            <h2>No Users Were Found</h2>
                        ))}
                    {users.map((user) => (
                        <div key={user._id}>
                            <UserCard
                                user={user}
                                onRemove={() => removeUser(user._id)}
                            />
                        </div>
                    ))}
                </Grid2>
            </Grid2>
        </Box>
    );
};

export default AdminUsersPage;
