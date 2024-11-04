import React, { useState, useEffect } from "react";
import { Box, Grid2 } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import { fetchAllPendingUsers } from "../../services/api";
import { useLocation, useOutletContext } from "react-router";
import RegistrationCard from "../../components/adminComponents/RegistrationCard";

const AdminRegistrationsPage = () => {
    const [loading, setLoading] = useState(false);
    const [pendingUsers, setPendingUsers] = useState([]);

    const { setActiveButton } = useOutletContext();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id");

    const fetchPendingUsers = async () => {
        let result = await fetchAllPendingUsers();
        result = result.filter(user => ["tour guide", "advertiser", "seller"].includes(user.role));
        setPendingUsers(result);
        setLoading(false);
    }

    useEffect(() => {
        if (id) {
            setActiveButton(null);
        }

        fetchPendingUsers();

    }, [id]);


    const removeUser = (userId) => {
        setPendingUsers((prevUsers) => prevUsers.filter(user => user._id !== userId));
    };

    return (
        <Box>
            <Grid2 container spacing={1}>
                <Grid2 item xs={12} sx={{ flexGrow: 1 }}>
                    {/* Pending Users List */}
                    {pendingUsers.length === 0 &&
                        (loading == true ? (
                            <h2>
                                Loading
                                <CachedIcon sx={{ fontSize: "25px", ml: "10px", mb: "-5px" }} />
                            </h2>
                        ) : (
                            <h2>No Pending Users Were Found</h2>
                        ))}
                    {pendingUsers.map((pendingUser) => (
                        <div key={pendingUser._id}>
                            <RegistrationCard
                                pendingUser={pendingUser}
                                onRemove={() => removeUser(pendingUser._id)}
                            />
                        </div>
                    ))}

                </Grid2>
            </Grid2>
        </Box>
    )
};

export default AdminRegistrationsPage;
