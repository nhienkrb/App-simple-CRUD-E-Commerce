import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Divider,
  Stack,
  Alert,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";

const API_URL = import.meta.env.VITE_API_URL + "/auth/register";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMsg("");

    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (!password.trim()) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors({ form: data.message || "Registration failed" });
        return;
      }

      setSuccessMsg("Account created successfully. You can now sign in.");
      setName("");
      setEmail("");
      setPassword("");

    } catch (err) {
      console.error("Signup error:", err);
      setErrors({ form: "Server error. Please try again later." });
    }
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
      <Typography variant="h4" fontWeight={700} mb={2}>
        Sign up
      </Typography>

      {errors.form && (
        <Alert severity="error" mb={2}>{errors.form}</Alert>
      )}
      {successMsg && (
        <Alert severity="success" mb={2}>{successMsg}</Alert>

      )}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          fullWidth
          size="small"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
        />

        <TextField
          label="Email"
          fullWidth
          size="small"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          size="small"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
        />

        <Button
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
          Sign up
        </Button>
      </form>

      <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} my={3}>
        <Divider sx={{ flex: 1 }} />
        <Typography variant="body2" color="textSecondary" textAlign="center">or</Typography>
        <Divider sx={{ flex: 1 }} />
      </Stack>

      <Button variant="outlined" fullWidth startIcon={<GoogleIcon />} sx={{ mb: 1, textTransform: "none" }}>
        Sign up with Google
      </Button>
      <Button variant="outlined" fullWidth startIcon={<FacebookIcon />} sx={{ textTransform: "none" }}>
        Sign up with Facebook
      </Button>

      <Box textAlign="center" mt={3} fontSize="0.875rem">
        Already have an account?{" "}
        <Link href="/login" underline="hover">Sign in</Link>
      </Box>
    </Box>
  );
};

export default SignUp;
