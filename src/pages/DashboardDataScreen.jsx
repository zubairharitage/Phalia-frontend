import React from "react";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";

import Footer from "../components/Footer";
import Header from "../components/Header";
import Search from "../components/Search";

const DashboardDataScreen = () => {
  const location = useLocation();
  const data = location.state;
  const bill = [...new Map(data.map((b) => [b.invoiceNumber, b])).values()];
  return (
    <>
      <Header />
      <Box sx={{ marginBottom: "50px" }}>
        <Search bills={bill} />
      </Box>
      <Footer />
    </>
  );
};

export default DashboardDataScreen;
