import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "@mui/material";

import { billDetailAction } from "../actions/invoiceAction";
import Loading from "../components/Loading";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CreateBill from "../components/CreateBill";

const CreateBillScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { bill } = useSelector((state) => state.InvoiceDetail);

  useEffect(() => {
    dispatch(billDetailAction(id));
  }, [dispatch, id]);
  let loading = true;
  if (bill) {
    loading = false;
  }
  return (
    <>
      <Header />
      <Container maxWidth="sm" sx={{ marginBottom: "50px" }}>
        {loading ? <Loading /> : <CreateBill preBill={bill} />}
      </Container>
      <Footer />
    </>
  );
};

export default CreateBillScreen;
