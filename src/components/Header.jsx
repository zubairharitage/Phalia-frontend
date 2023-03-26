import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#0081C9",
        padding: "15px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Link to="/create" style={{ textDecoration: "none" }}>
        <Typography
          sx={{
            fontWeight: "bold",
            cursor: "pointer",
            color: "white",
            backgroundColor: "transparent",
            border: "none",
            borderRadius: "5px",
            ":hover": { backgroundColor: "#05a5fb" },
          }}
          variant={"h5"}
          component="button"
        >
          SUPER PHALIA
        </Typography>
      </Link>
      <Box>
        <Link to="/create" style={{ textDecoration: "none" }}>
          <Button
            sx={{
              mr: "3px",
              color: "white",
              fontWeight: "600",
              ":hover": { backgroundColor: "#05a5fb" },
            }}
          >
            Create Invoice
          </Button>
        </Link>
        <Link to="/all" style={{ textDecoration: "none" }}>
          <Button
            sx={{
              mr: "3px",
              color: "white",
              fontWeight: "600",
              ":hover": { backgroundColor: "#05a5fb" },
            }}
          >
            All Bills
          </Button>
        </Link>
        <Link to="/paid" style={{ textDecoration: "none" }}>
          <Button
            sx={{
              mr: "3px",
              color: "white",
              fontWeight: "600",
              ":hover": { backgroundColor: "#05a5fb" },
            }}
          >
            Paid
          </Button>
        </Link>
        <Link to="/unpaid" style={{ textDecoration: "none" }}>
          <Button
            sx={{
              mr: "3px",
              color: "white",
              fontWeight: "600",
              ":hover": { backgroundColor: "#05a5fb" },
            }}
          >
            UnPaid
          </Button>
        </Link>
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <Button
            sx={{
              mr: "3px",
              color: "white",
              fontWeight: "600",
              ":hover": { backgroundColor: "#05a5fb" },
            }}
          >
            Dashboard
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Header;
