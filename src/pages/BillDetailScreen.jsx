import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "@mui/material";

import BillDetails from "../components/BillDetails";
import { billDetailAction, getAllBillsAction } from "../actions/invoiceAction";
import Loading from "../components/Loading";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ErrorMessage from "../components/ErrorMessage";

const BillDetailScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { bills } = useSelector((state) => state.invoices);
  const { error, bill } = useSelector((state) => state.InvoiceDetail);

  useEffect(() => {
    dispatch(getAllBillsAction());
    dispatch(billDetailAction(id));
  }, [dispatch, id]);
  let data;
  let loading = true;
  if (bills.length >= 1 && bill) {
    loading = false;
    data = bills.filter((b) => b.invoiceNumber === bill.invoiceNumber);
  }

  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ marginBottom: "50px" }}>
        {error && <ErrorMessage error={error} />}
        {loading ? <Loading /> : <BillDetails bill={data} />}
      </Container>
      <Footer />
    </>
  );
};

export default BillDetailScreen;
