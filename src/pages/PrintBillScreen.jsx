import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "@mui/material";

import PrintBill from "../components/PrintBill";
import { billDetailAction, getAllBillsAction } from "../actions/invoiceAction";
import Loading from "../components/Loading";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ErrorMessage from "../components/ErrorMessage";

const PrintBillScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { bills } = useSelector((state) => state.invoices);
  const { error, bill } = useSelector((state) => state.InvoiceDetail);

  useEffect(() => {
    dispatch(getAllBillsAction());
    dispatch(billDetailAction(id));
  }, [dispatch, id]);
  let loading = true;
  let data;
  if (bills.length !== 0 && bill) {
    loading = false;
    data = bills.filter((b) => b.invoiceNumber === bill.invoiceNumber);
  }

  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ marginBottom: "50px" }}>
        {error && <ErrorMessage error={error} />}
        {loading ? <Loading /> : <PrintBill bill={data} />}
      </Container>
      <Footer />
    </>
  );
};

export default PrintBillScreen;
