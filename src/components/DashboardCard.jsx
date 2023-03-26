import { Box, Card, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const DashboardCard = ({ data, title, values }) => {
  const nevigate = useNavigate();
  const handleClick = () => {
    nevigate("/dashboard/data", { state: data });
  };
  return (
    <Box sx={{ display: "flex", margin: "10px", width: "100%" }}>
      <Card
        onClick={handleClick}
        sx={{
          width: "30%",
          backgroundColor: "#0081C9",
          color: "white",
          padding: "5px",
          marginRight: "5px",
          cursor: "pointer",
          overflow: `hidden`,
          border: `1px solid #0081C9`,
          ":hover": {
            transition: `all 0.2s ease-out`,
            boxShadow: `0px 4px 8px rgba(38, 38, 38, 0.2)`,
            backgroundColor: "#c9e4fe",
            color: "black",
            border: `1px solid #cccccc`,
          },
        }}
      >
        <Typography>{title.t1}</Typography>
        <Typography variant="h4" component={"h3"} sx={{ textAlign: "center" }}>
          {values.v1}
        </Typography>
      </Card>
      <Card
        sx={{
          width: "50%",
          backgroundColor: "#0081C9",
          color: "white",
          padding: "5px",
        }}
      >
        <Typography>{title.t2}</Typography>
        <Typography variant="h4" component={"h3"} sx={{ textAlign: "center" }}>
          {values.v2}
        </Typography>
      </Card>
    </Box>
  );
};

export default DashboardCard;
