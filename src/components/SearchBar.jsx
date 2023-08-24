import React, { useState } from "react";
import { TextField, Button, Grid, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={9}>
            <TextField
              fullWidth
              variant="outlined"
              label="Search for books"
              value={query}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              endIcon={<SearchIcon />}
              type="submit"
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default SearchBar;
