import { Box } from "@mui/material";

import CreateActivity from "../../components/advertiserComponents/CreateActivity";


const CreateActivityPage = ({ id }) => {

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'start',
                alignItems: 'start',
                gap: '50px',
                mt: '20px',

            }}
        >
            <CreateActivity id={id} />


        </Box>
    );
}

export default CreateActivityPage;