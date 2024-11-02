import { Box, Button, Checkbox, Chip, Divider, FormControl, IconButton, InputLabel, MenuItem, OutlinedInput, Rating, Select, TextField, Typography } from "@mui/material";
import { useLocation, useParams } from "react-router";
import { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchAllActivityCategories, fetchAllPreferenceTags, updateActivity } from "../../services/api";
import EditActivityForm from "../../components/activityComponents/EditActivityForm";
import CachedIcon from '@mui/icons-material/Cached';

const ManageActivityPage = ({ activity }) => {
    if (!activity) {
        return (
            < h2 > loading
                <CachedIcon sx={
                    {
                        fontSize: '25px',
                        ml: '10px',
                        mb: '-5px',
                    }
                } />
            </h2>
        )
    }
    const [rating, setRating] = useState(activity.averageRating);
    const [reviews, setReviews] = useState(activity.reviews);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start',
                alignItems: 'start',
                gap: '20px',
                width: '350px',
            }}
        >
            <EditActivityForm activity={activity} />

            <Box>
                {/* TODO */}
                <h2 style={{
                    color: 'grey',
                    mb: '10px',
                }}>
                    Reviews Section
                </h2>
            </Box>

        </Box>
    );
}

export default ManageActivityPage;