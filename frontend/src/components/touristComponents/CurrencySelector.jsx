import React, { useState } from 'react';
import { Select, MenuItem, IconButton, Box } from '@mui/material';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

function CurrencySelect() {
    const [currency, setCurrency] = useState(localStorage.getItem('currency') || 'EGP');
    const [open, setOpen] = useState(false);

    const handleCurrencyChange = (event) => {
        if (event.target.value === localStorage.getItem('currency')) {
            setOpen(false);
            return;
        }
        setCurrency(event.target.value);
        localStorage.setItem('currency', event.target.value);
        setOpen(false);
        window.location.reload();
    };

    return (
        <Box display="flex" alignItems="center">
            <IconButton
                size="large"
                color="inherit"
                edge="end"
                aria-label="currency"
                onClick={() => setOpen(true)}
            >
                <CurrencyExchangeIcon />
            </IconButton>
            <Select
                open={open}
                onClose={() => setOpen(false)}
                value={currency}
                onChange={handleCurrencyChange}
                variant="standard"
                disableUnderline
                sx={{
                    width: 0,
                    height: 0,
                    padding: 0,
                    ml: 2,
                    '& .MuiSelect-select': {
                        display: 'none',
                    },
                }}
                MenuProps={{
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                    },
                    transformOrigin: {
                        vertical: 'top',
                        horizontal: 'left',
                    },
                }}
            >
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="EUR">EUR</MenuItem>
                <MenuItem value="EGP">EGP</MenuItem>
            </Select>
        </Box>
    );
}

export default CurrencySelect;
