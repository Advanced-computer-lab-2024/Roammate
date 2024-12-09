import { Box } from "@mui/material";

import CreateActivity from "../../components/advertiserComponents/CreateActivity";


const CreateActivityPage = () => {
    const id = localStorage.getItem("userId");

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '50px',
                mt: '20px',

            }}
        >
            <CreateActivity id={id} />


        </Box>
    );
}

export default CreateActivityPage;