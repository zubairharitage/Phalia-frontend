import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import Footer from "../components/Footer";
import Header from "../components/Header";
import { createBillAction, getAllBillsAction } from "../actions/invoiceAction";
import ErrorMessage from "../components/ErrorMessage";
import useQuery from "../utils/useMediaQuery";

const Home = () => {
  const dispatch = useDispatch();
  const nevigate = useNavigate();
  const query = useQuery();
  const { error, bill } = useSelector((state) => state.createInvoice);
  const { bills } = useSelector((state) => state.invoices);

  const [billNumber, setBillNumber] = useState("");
  const [reload, setReload] = useState(0);

  const d = new Date();
  const dayy = `${d.getDate()}`;
  const day = dayy.length === 1 ? `0${dayy}` : dayy;

  const mon = `${d.getMonth() + 1}`;
  const month = mon.length === 1 ? `0${mon}` : mon;

  const dat = `${day}-${month}-${d.getFullYear()}`;

  const [invoice, setInvoice] = useState({
    name: "",
    startingTime: "- - : - -",
    closingTime: "- - : - -",
    jobDescription: "",
    equipmentType: "",
    tripHours: "",
    rate: "",
    tax: 0,
    trn: 0,
    left: 0,
    discount: 0,
    date: dat,
    paid: false,
  });

  useEffect(() => {
    dispatch(getAllBillsAction());
  }, [dispatch, reload]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInvoice((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
    if (bills.length !== 0) {
      if (name === "name") {
        setBillNumber(bills[bills.length - 1].invoiceNumber + 1);
      }
    }
  };

  const handleClick = () => {
    const invoiceForCreate = {
      invoiceNumber: billNumber,
      ...invoice,
    };
    dispatch(createBillAction(invoiceForCreate));
    setInvoice({
      name: "",
      startingTime: "",
      closingTime: "",
      jobDescription: "",
      equipmentType: "",
      tripHours: "",
      rate: "",
      tax: 0,
      trn: 0,
      left: 0,
      discount: 0,
      date: dat,
      paid: false,
    });
    setBillNumber("");
    setReload(Math.random());
  };

  const handleShow = () => {
    nevigate(`/billdetail/${bill._id}`);
  };
  return (
    <>
      <Header />
      <Container maxWidth="sm" sx={{ marginBottom: "50px" }}>
        <Typography
          variant="h5"
          sx={{ margin: "10px", fontWeight: "600", textAlign: "center" }}
        >
          Create Invoice
        </Typography>
        {error ? <ErrorMessage error={error} /> : <div></div>}
        <Box>
          <TextField
            placeholder="Enter Name"
            label="Name"
            name="name"
            value={invoice.name}
            onChange={handleChange}
            sx={{ margin: "5px", width: query ? "48%" : "96%" }}
            required
          />
          <TextField
            placeholder="Enter Invoice Number"
            label="Invoice Number"
            value={billNumber}
            required
            onChange={(e) => setBillNumber(e.target.value)}
            sx={{ margin: "5px", width: query ? "48%" : "96%" }}
          />
          <TextField
            label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Starting time"
            type="time"
            name="startingTime"
            value={invoice.startingTime}
            onChange={handleChange}
            sx={{ width: query ? "48%" : "96%", margin: "5px" }}
          />
          <TextField
            label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Closing time"
            type="time"
            name="closingTime"
            value={invoice.closingTime}
            onChange={handleChange}
            sx={{ width: query ? "48%" : "96%", margin: "5px" }}
          />
          <TextField
            placeholder="Enter Job Description"
            label="Job Description"
            name="jobDescription"
            value={invoice.jobDescription}
            onChange={handleChange}
            required
            sx={{ width: query ? "48%" : "96%", margin: "5px" }}
          />
          <TextField
            placeholder="Enter Equipment Type"
            label="Equipment Type"
            name="equipmentType"
            value={invoice.equipmentType}
            onChange={handleChange}
            sx={{ width: query ? "48%" : "96%", margin: "5px" }}
          />
          <TextField
            placeholder="Enter Trip Hours"
            label="Trip Hours"
            name="tripHours"
            value={invoice.tripHours}
            onChange={handleChange}
            required
            sx={{ width: query ? "48%" : "96%", margin: "5px" }}
          />
          <TextField
            placeholder="Enter Rate"
            label="Rate"
            name="rate"
            value={invoice.rate}
            onChange={handleChange}
            required
            sx={{ width: query ? "48%" : "96%", margin: "5px" }}
          />
          <FormControl sx={{ width: query ? "48%" : "96%", margin: "5px" }}>
            <InputLabel id="simple-select-label">Tax</InputLabel>
            <Select
              labelId="simple-select-label"
              id="simple-select"
              label="paid"
              value={invoice.tax}
              onChange={handleChange}
              name="tax"
            >
              <MenuItem value={0}>No</MenuItem>
              <MenuItem value={5}>Yes</MenuItem>
            </Select>
          </FormControl>
          <TextField
            placeholder="Enter Customer TRN"
            label="TRN"
            name="trn"
            value={invoice.trn}
            onChange={handleChange}
            sx={{ width: query ? "48%" : "96%", margin: "5px" }}
          />

          <TextField
            placeholder="Enter discount for cst"
            label="Discount"
            name="discount"
            value={invoice.discount}
            onChange={handleChange}
            sx={{ width: query ? "48%" : "96%", margin: "5px" }}
          />
          <TextField
            placeholder="Enter Date"
            label="Date"
            name="date"
            value={invoice.date}
            onChange={handleChange}
            sx={{ width: query ? "48%" : "96%", margin: "5px" }}
          />
          <FormControl sx={{ width: query ? "48%" : "96%", margin: "5px" }}>
            <InputLabel id="demo-simple-select-label">Bill</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="paid"
              value={invoice.paid}
              onChange={handleChange}
              name="paid"
            >
              <MenuItem value={true}>paid</MenuItem>
              <MenuItem value={false}>unpaid</MenuItem>
            </Select>
          </FormControl>
          {!invoice.paid ? (
            <TextField
              placeholder="Enter how much pending"
              label="Pending"
              name="left"
              value={invoice.left}
              onChange={handleChange}
              sx={{ width: query ? "48%" : "96%", margin: "5px" }}
            />
          ) : (
            <Box></Box>
          )}
          <Button
            variant="contained"
            onClick={handleClick}
            sx={{
              width: query ? "48%" : "96%",
              margin: "5px",
              backgroundColor: "#0081C9",
              ":hover": { backgroundColor: "#05a5fb" },
            }}
          >
            Create Invoice
          </Button>
          {bill && (
            <Button
              variant="outlined"
              onClick={handleShow}
              sx={{
                width: query ? "48%" : "96%",
                margin: "5px",
                ":hover": { backgroundColor: "#05a5fb", color: "white" },
              }}
            >
              Show bill
            </Button>
          )}
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
