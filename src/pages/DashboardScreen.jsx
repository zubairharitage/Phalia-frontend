import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/material";

import Footer from "../components/Footer";
import Header from "../components/Header";
import Dashboard from "../components/Dashboard";
import { getAllBillsAction } from "../actions/invoiceAction";
import Loading from "../components/Loading";

const DashboardScreen = () => {
  const dispatch = useDispatch();
  const { loading, bills } = useSelector((state) => state.invoices);

  useEffect(() => {
    dispatch(getAllBillsAction());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Box sx={{ marginBottom: "50px" }}>
        {loading ? <Loading /> : <Dashboard bills={bills} />}
      </Box>
      <Footer />
    </>
  );
};

export default DashboardScreen;
