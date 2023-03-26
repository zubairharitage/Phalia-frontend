import React from "react";
import { Box } from "@mui/material";

const Loading = () => {
  return (
    <Box sx={{ textAlign: "center", marginTop: "20px" }}>
      <img style={{ width: "100px" }} src="/gif.gif" alt="Loading..." />
    </Box>
  );
};

export default Loading;
