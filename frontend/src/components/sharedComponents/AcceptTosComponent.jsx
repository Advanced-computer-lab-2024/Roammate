import React, { useState } from "react";
import { Alert, Box, FormControl, FormControlLabel, Radio, Button } from "@mui/material";
import { updateUserStatus } from "../../services/api";


const AcceptTosComponent = ({ userId, setStatus }) => {
    const [tosChecked, setTosChecked] = useState(false);
    const [tosAccepted, setTosAccepted] = useState(false);

    const handleTOSSubmit = async (e) => {
        e.preventDefault();
        try {
            setTosAccepted(true);
            setStatus("active");
            await updateUserStatus(userId, "active");
        } catch (error) {
        }
    };

    return (<Alert severity="warning">
        Your account has been approved. Please accept the Terms of Service
        (TOS) to start using your account.
        <Box sx={{ mt: 2 }}>
            <form onSubmit={handleTOSSubmit}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                }}>
                    <FormControl component="fieldset">
                        <FormControlLabel
                            control={
                                <Radio
                                    checked={tosChecked}
                                    onChange={(e) => setTosChecked(e.target.checked)}
                                    value="accepted"
                                    name="tos"
                                />
                            }
                            label="I accept the Terms of Service"
                        />
                    </FormControl>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{ mt: 2 }}
                        disabled={tosAccepted}
                    >
                        Submit
                    </Button>
                </Box>
            </form>
        </Box>
    </Alert>
    );
}

export default AcceptTosComponent;