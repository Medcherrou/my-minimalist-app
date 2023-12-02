import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function RegisterView() {
const theme = useTheme();
const router = useRouter();
const [showPassword, setShowPassword] = useState(false);

const handleSignup = () => {
// Handle signup logic here
// You may want to make an API call to register the user
// Example: axios.post('/api/signup', { username, email, password })
router.push('/'); // Redirect to the login page after signup
};

const renderForm = (
<>
    <Stack spacing={3}>
    <TextField name="username" label="Username" />

    <TextField name="email" label="Email address" />

    <TextField
        name="password"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        InputProps={{
        endAdornment: (
            <InputAdornment position="end">
            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
            </IconButton>
            </InputAdornment>
        ),
        }}
    />
    </Stack>

    

    <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleSignup}
        sx={{ mt: 2 }}
      >
        Sign Up
      </LoadingButton>
</>
);

return (
<Box
    sx={{
    ...bgGradient({
        color: alpha(theme.palette.background.default, 0.9),
        imgUrl: '/assets/background/overlay_4.jpg',
    }),
    height: 1,
    }}
>
    <Logo
    sx={{
        position: 'fixed',
        top: { xs: 16, md: 24 },
        left: { xs: 16, md: 24 },
    }}
    />

    <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
    <Card
        sx={{
        p: 5,
        width: 1,
        maxWidth: 420,
        }}
    >
        <Typography variant="h4" sx={{ textAlign: 'center' }}>Sign up for Minimal</Typography>

        <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
        Already have an account?
        <Link variant="subtitle2" sx={{ ml: 0.5, cursor:'pointer' }} onClick={() => router.push('/login')}>
            Login
        </Link>
        </Typography>

        
        <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            OR
        </Typography>
        </Divider>

        {renderForm}
    </Card>
    </Stack>
</Box>
);
}
