import React, { useEffect } from "react";
import { Box, Card, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import dayjs from 'dayjs';
import { BarChart } from '@mui/x-charts/BarChart';


const UsersBarChart = ({ activityId, calcUsers }) => {
    const id = localStorage.getItem('userId');
    const currentYear = new Date().getFullYear();
    const [usersPerMonth, setUsersPerMonth] = React.useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [dataset, setDataset] = React.useState([]);
    const [filteredDataset, setFilteredDataset] = React.useState([]);
    const [minMonth, setMinMonth] = React.useState(0);
    const [maxMonth, setMaxMonth] = React.useState(11);
    const [totalUsers, setTotalUsers] = React.useState(0);

    const dates = [
        `${currentYear}-01-01`,
        `${currentYear}-02-01`,
        `${currentYear}-03-01`,
        `${currentYear}-04-01`,
        `${currentYear}-05-01`,
        `${currentYear}-06-01`,
        `${currentYear}-07-01`,
        `${currentYear}-08-01`,
        `${currentYear}-09-01`,
        `${currentYear}-10-01`,
        `${currentYear}-11-01`,
        `${currentYear}-12-01`,
    ]

    const getUsersPerMonth = async (month) => {
        try {
            const response = await calcUsers({
                id: id,
                activityId: activityId,
                startDate: dates[month],
                endDate: dayjs(dates[month]).endOf('month').format('YYYY-MM-DD')
            });
            if (response.data.length > 0) {
                //console.log(response.data[0].bookingCount);
                return response.data[0].bookingCount;
            }
            return 0;
        } catch (error) {
            console.log(error);
        }
    }

    const getUsersAnalytics = async () => {
        let arr = []
        for (let i = 0; i < 12; i++) {
            arr[i] = await getUsersPerMonth(i);
        }
        setUsersPerMonth(arr);
        let data = [];
        for (let i = 0; i < 12; i++) {
            data.push({
                month: dayjs(dates[i]).format('MMM'),
                count: arr[i]
            });
        }
        setDataset(data);
        //console.log(data);
    }

    useEffect(() => {
        const getAnalytics = async () => {
            await getUsersAnalytics();
        }
        getAnalytics();
    }, []);

    useEffect(() => {
        let data = [];
        for (let i = minMonth; i <= maxMonth; i++) {
            data.push({
                month: dayjs(dates[i]).format('MMM'),
                count: usersPerMonth[i]
            });
        }
        let total = 0;
        for (let i = minMonth; i <= maxMonth; i++) {
            total += usersPerMonth[i];
        }
        setTotalUsers(total);
        setFilteredDataset(data);
    }, [dataset, minMonth, maxMonth]);

    const chartSetting = {
        xAxis: [
            {
                label: 'count',
            },
        ],
        yAxis: [
            {
                scaleType: 'band',
                dataKey: 'month',
            },
        ],
        width: 570,
        height: 400,
    };

    return (


        <Card elevation={1} sx={{ padding: 2 }}>

            <Typography variant="body1" color="text.secondary" >Total Users: {totalUsers}</Typography>

            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                mt: 2,
            }}>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small-label">From</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={minMonth}
                        label="From"
                        onChange={(event) => {
                            setMinMonth(event.target.value);
                        }}
                    >
                        <MenuItem value={0}>Jan</MenuItem>
                        <MenuItem value={1}>Feb</MenuItem>
                        <MenuItem value={2}>Mar</MenuItem>
                        <MenuItem value={3}>Apr</MenuItem>
                        <MenuItem value={4}>May</MenuItem>
                        <MenuItem value={5}>Jun</MenuItem>
                        <MenuItem value={6}>Jul</MenuItem>
                        <MenuItem value={7}>Aug</MenuItem>
                        <MenuItem value={8}>Sep</MenuItem>
                        <MenuItem value={9}>Oct</MenuItem>
                        <MenuItem value={10}>Nov</MenuItem>
                        <MenuItem value={11}>Dec</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small-label">To</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={maxMonth}
                        label="From"
                        onChange={(event) => {
                            setMaxMonth(event.target.value);
                        }}
                    >
                        <MenuItem value={0}>Jan</MenuItem>
                        <MenuItem value={1}>Feb</MenuItem>
                        <MenuItem value={2}>Mar</MenuItem>
                        <MenuItem value={3}>Apr</MenuItem>
                        <MenuItem value={4}>May</MenuItem>
                        <MenuItem value={5}>Jun</MenuItem>
                        <MenuItem value={6}>Jul</MenuItem>
                        <MenuItem value={7}>Aug</MenuItem>
                        <MenuItem value={8}>Sep</MenuItem>
                        <MenuItem value={9}>Oct</MenuItem>
                        <MenuItem value={10}>Nov</MenuItem>
                        <MenuItem value={11}>Dec</MenuItem>
                    </Select>
                </FormControl>


            </Box>
            <BarChart
                dataset={filteredDataset}
                yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                series={[{ dataKey: 'count', label: 'users', valueFormatter: (value) => Math.round(value) }]}
                layout="horizontal"
                {...chartSetting}

            />

        </Card>
    );
}

export default UsersBarChart;