import React, { useState } from "react";
import {
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginClick = () => {
    onLogin();
  };

  return (
    <Grid
      container
      style={{
        height: "100vh",
        backgroundImage: 'url("/Login.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      alignItems="center"
      justifyContent="center"
    >
      <Grid item style={{ marginRight: "40%" }} xs={12} sm={8} md={6} lg={4}>
        <Container component="main" maxWidth="xs">
          <Paper
            elevation={3}
            style={{
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <LockOutlinedIcon
              style={{ fontSize: "40px", marginBottom: "20px" }}
            />
            <Typography variant="h5">Sign in</Typography>
            <form style={{ width: "100%", marginTop: "20px" }}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                style={{ margin: "20px 0" }}
                onClick={handleLoginClick}
              >
                Sign In
              </Button>
            </form>
          </Paper>
        </Container>
      </Grid>
    </Grid>
  );
}

export default Login;
