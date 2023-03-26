import React from "react";
import { Box, Alert, AlertTitle } from "@mui/material";

const ErrorMessage = ({ error }) => {
  return (
    <Box sx={{ margin: "5px" }}>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {error}
      </Alert>
    </Box>
  );
};

export default ErrorMessage;
