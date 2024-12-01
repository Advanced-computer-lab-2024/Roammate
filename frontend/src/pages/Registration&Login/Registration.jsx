import { useState } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import PublicIcon from '@mui/icons-material/Public';
import { useNavigate } from "react-router";
const Registeration = () => {
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleChange = () => {
    switch (role) {
      case 'Tourist':
        navigate('/tourist/register');
        break;
      default:
        navigate('/register?role=' + role);
        break;
    }
  }
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '100px'
    }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Typography variant="h4" component="div" sx={{
          textAlign: 'left'
        }}>
          R
        </Typography>
        <PublicIcon fontSize="large" />
        <Typography variant="h4" component="div" sx={{
          textAlign: 'left'
        }}>
          AMMATE
        </Typography>
      </Box>

      <Typography variant="h5" component="div" sx={{
        marginTop: '40px',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        Register as
      </Typography>
      <FormControl sx={{
        minWidth: 120,
        width: '200px',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        <InputLabel id="demo-simple-select-label">Role</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={role}
          label="Role"
          onChange={(event) =>
            setRole(event.target.value)
          }
        >
          <MenuItem value={'Tourist'}>Tourist</MenuItem>
          <MenuItem value={'Advertiser'}>Advertiser</MenuItem>
          <MenuItem value={'Tour Guide'}>Tour Guide</MenuItem>
          <MenuItem value={'Seller'}>Seller</MenuItem>
        </Select>
      </FormControl >

      <Button variant="contained" sx={{
        width: '200px',
        marginBottom: '20px'
      }}
        disabled={role === ''}
        onClick={handleChange}
      >
        Continue
      </Button>

      <Typography variant="body2" component="div" sx={{
        textAlign: 'center',
        '& a': {
          color: 'black',
        },
        '& a:hover': {
          color: 'blue',
        }
      }}>
        Already have an account? <a href="/login">Login</a>
      </Typography>
    </Box >

  );
}

export default Registeration;