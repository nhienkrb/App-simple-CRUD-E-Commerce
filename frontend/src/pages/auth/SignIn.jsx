import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  Link,
  Divider,
  Stack,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
const API_URL = import.meta.env.VITE_API_URL + "/auth/login";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const validate = () => {
    let valid = true;

    if (password.length < 2) {
      setPasswordError("Password must be at least 6 characters long.");
      valid = false;
    } else {
      setPasswordError("");
    }
    return valid;
  };

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/home";
  const user = { email: email, password: password };
  const handleLogin = async () => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const res = await response.json();
    const fullToken = res.token || "";
    const jwt = fullToken.includes("|") ? fullToken.split("|")[1] : fullToken;
    login(jwt);
    navigate(from, { replace: true });
  };

  return (
    <Box
      maxWidth={400}
      mx="auto"
      mt={8}
      p={4}
      boxShadow={3}
      borderRadius={2}
      bgcolor="#fff"
    >
      <Typography variant="h2" fontWeight={700} mb={2}>
        Sign in
      </Typography>

      <TextField
        label="Email"
        placeholder="your@email.com"
        fullWidth
        size="small"
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!emailError}
        helperText={emailError}
      />

      <TextField
        label="Password"
        type="password"
        fullWidth
        size="small"
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!passwordError}
        helperText={passwordError}
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
        }
        label="Remember me"
        sx={{ mt: 1 }}
      />

      <Button
        onClick={handleLogin}
        type="submit"
        variant="contained"
        fullWidth
        sx={{
          mt: 2,
          background: "linear-gradient(180deg,#1c1f29 0%,#191c27 100%)",
          textTransform: "none",
          boxShadow: "0 2px 6px rgb(20 22 33 / 50%)",
        }}
      >
        Sign in
      </Button>

      <Box textAlign="center" mt={2}>
        <Link href="#" underline="hover" fontSize="0.875rem">
          Forgot your password?
        </Link>
      </Box>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={1}
        my={3}
      >
        <Divider sx={{ flex: 1 }} />
        <Typography variant="body2" color="textSecondary" textAlign="center">
          or
        </Typography>
        <Divider sx={{ flex: 1 }} />
      </Stack>

      <Button
        variant="outlined"
        fullWidth
        startIcon={<GoogleIcon />}
        sx={{ mb: 1, textTransform: "none" }}
      >
        Sign in with Google
      </Button>

      <Button
        variant="outlined"
        fullWidth
        startIcon={<FacebookIcon />}
        sx={{ textTransform: "none" }}
      >
        Sign in with Facebook
      </Button>

      <Box textAlign="center" mt={3} fontSize="0.875rem">
        Don't have an account?{" "}
        <Link  component={RouterLink}  to={"/register"} underline="hover">
          Sign up
        </Link>
      </Box>
    </Box>
  );
};

export default SignIn;
