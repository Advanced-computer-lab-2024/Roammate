import { useEffect, useState } from "react";
import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { calcSellerRevenue } from "../../services/api";
import dayjs from 'dayjs';
import { PieChart } from '@mui/x-charts/PieChart';

const SellerAnalyticsPage = () => {
    const id = localStorage.getItem('userId');
    const [startDate, setStartDate] = useState(0);
    const [endDate, setEndDate] = useState(11);
    const [revenueData, setRevenueData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [pieChartData, setPieChartData] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const currentYear = new Date().getFullYear();

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


    const calcRevenue = async () => {
        setRevenueData([]);
        try {
            const response = await calcSellerRevenue({
                id: id,
                startDate: dates[startDate],
                endDate: dayjs(dates[endDate]).endOf('month').format('YYYY-MM-DD')
            });
            //console.log(response.data);
            setRevenueData(response.data);
            // set products to array of itinerary titles
            setProducts(response.data.map((data) => data.productName));
            if (selectedProducts.length === 0) {
                setSelectedProducts(response.data.map((data) => data.productName));
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const getRevenue = async () => {
            await calcRevenue();
        }
        getRevenue();
        const tableData = revenueData.filter((data) => selectedProducts.includes(data.productName));
        setTableData(tableData);
        setPieChartData(tableData.map((data) => { return { id: data.productName, value: data.totalRevenue, label: data.productName } }));
    }, [startDate, endDate]);

    useEffect(() => {
        const tableData = revenueData.filter((data) => selectedProducts.includes(data.productName));
        setTableData(tableData);
        setPieChartData(tableData.map((data) => { return { id: data.productName, value: data.totalRevenue, label: data.productName } }));
    }, [selectedProducts, revenueData]);

    function createData(title, price, users, sales) {
        return { title, price, users, sales };
    }

    const rows = tableData.map((data) => {
        return createData(data.productName, data.productPrice, data.bookingCount, data.totalRevenue);
    });

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: "#353535",
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        // Select All
        if (value.includes('all')) {
            setSelectedProducts(products);
            return;
        }
        setSelectedProducts(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );

    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            width: '100%',
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                mt: 2,
            }}>
                <FormControl sx={{ m: 1, width: 250 }}>
                    <InputLabel id="demo-multiple-name-label">Products</InputLabel>
                    <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={selectedProducts}
                        onChange={handleChange}
                        input={<OutlinedInput label="Products" />}
                    >
                        {/* "All" Option */}
                        <MenuItem
                            key="all"
                            value="all"
                        >
                            Select All
                        </MenuItem>

                        {products.map((name) => (
                            <MenuItem
                                key={name}
                                value={name}
                                style={{
                                    color:
                                        selectedProducts.indexOf(name) === -1
                                            ? 'lightgrey'
                                            : 'black',
                                }}
                            >
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt: 2,
                }}>
                    <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
                        <InputLabel id="demo-select-small-label">From</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={startDate}
                            label="From"
                            onChange={(event) => {
                                setStartDate(event.target.value);
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

                    <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
                        <InputLabel id="demo-select-small-label">To</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={endDate}
                            label="From"
                            onChange={(event) => {
                                setEndDate(event.target.value);
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


            </Box>


            {<Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'start',
                mt: 2,
                width: '100%',
            }}><TableContainer component={Paper} sx={{
                marginTop: '30px',

            }}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Product</StyledTableCell>
                                <StyledTableCell align="center">Price</StyledTableCell>
                                <StyledTableCell align="center">Total Tourists</StyledTableCell>
                                <StyledTableCell align="right">Total Sales</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.title}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.title}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row.price} EGP</StyledTableCell>
                                    <StyledTableCell align="center">{row.users}</StyledTableCell>
                                    <StyledTableCell align="right">{row.sales} EGP</StyledTableCell>
                                </StyledTableRow>
                            ))}
                            <StyledTableRow>
                                <StyledTableCell colSpan={2} align="left"><strong>Totals</strong></StyledTableCell>
                                <StyledTableCell align="center" sx={{
                                    fontWeight: 'bold'
                                }}>{tableData.reduce((acc, curr) => acc + curr.bookingCount, 0)}</StyledTableCell>
                                <StyledTableCell align="right" sx={{
                                    fontWeight: 'bold'
                                }}>{tableData.reduce((acc, curr) => acc + curr.totalRevenue, 0)} EGP</StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>


                <PieChart
                    series={[
                        {
                            data: pieChartData,
                            highlightScope: { fade: 'global', highlight: 'item' },
                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },

                        },
                    ]}
                    slotProps={{
                        legend: {
                            labelStyle: {
                                fontSize: 18,
                                fill: 'grey',
                            },
                        },
                    }}
                    height={500}
                    width={1200}


                />

            </Box>

            }



        </Box >

    );
}

export default SellerAnalyticsPage;