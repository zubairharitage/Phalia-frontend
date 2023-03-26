import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import useQuery from "../utils/useMediaQuery";

const BillPaper = ({ bill }) => {
  const nevigate = useNavigate();
  const query = useQuery();

  const handleView = () => {
    nevigate(`/billdetail/${bill._id}`);
  };
  return (
    <Card
      onClick={handleView}
      sx={{
        margin: "10px",
        width: query ? "23%" : "90%",
        backgroundColor: "#0081C9",
        color: "white",
        cursor: "pointer",
        border: `1px solid #0081C9`,
        display: "inline-block",
        ":hover": {
          transition: `all 0.2s ease-out`,
          boxShadow: `0px 4px 8px rgba(38, 38, 38, 0.2)`,
          backgroundColor: "#c9e4fe",
          color: "black",
          border: `1px solid #cccccc`,
        },
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {bill.name}
        </Typography>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <Box flex={1}>
            <Typography variant="h6" component="h6">
              {bill.invoiceNumber}
            </Typography>
          </Box>

          <Box
            flex={1}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "end",
            }}
          >
            <Typography variant="h6" component="h6">
              {bill.date}
            </Typography>
            <Typography variant="h6" component="h6">
              {bill.paid ? "Paid" : "Unpaid"}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BillPaper;
