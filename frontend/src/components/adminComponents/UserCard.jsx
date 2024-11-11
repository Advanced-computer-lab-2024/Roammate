import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { deleteUser } from "../../services/api";

const RegistrationCard = ({ user, onRemove }) => {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        try {
            await deleteUser(user._id);
            onRemove();
        } catch (error) {
            console.error("Failed to delete user:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card sx={{ maxWidth: 650, mb: 4 }}>
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >

                {/* Header */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "start",
                        width: "100%",
                    }}
                >
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            textAlign: "left",
                        }}
                    >
                        @{user.username}
                    </Typography>
                </Box>

                <Typography
                    variant="body2"
                    sx={{
                        color: "text.secondary",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        textAlign: "left",
                        mb: "10px",
                        width: "100%",
                    }}
                >
                    Role: {user.role}
                </Typography>

                {/* Tourist Info */}
                <Typography
                    variant="body2"
                    sx={{
                        color: "text.secondary",
                        textAlign: "left",
                        mb: "10px",
                        width: "100%",
                    }}
                >
                    ID: {user._id}<br />
                    Email: {user.email}

                </Typography>
            </CardContent>

            {/* Actions */}
            <CardActions
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                    mt: -1,
                    width: "100%",
                }}
            >
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleDelete}
                        disabled={loading}
                    >
                        Delete
                    </Button>
                </Box>

            </CardActions>
        </Card>
    );
};

export default RegistrationCard;
