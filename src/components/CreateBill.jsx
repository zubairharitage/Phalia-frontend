import React, { useState } from "react";
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

import { createBillAction } from "../actions/invoiceAction";
import ErrorMessage from "../components/ErrorMessage";
import useQuery from "../utils/useMediaQuery";

const CreateBill = ({ preBill }) => {
  const dispatch = useDispatch();
  const nevigate = useNavigate();
  const query = useQuery();

  const { error, bill } = useSelector((state) => state.createInvoice);

  const [invoice, setInvoice] = useState({
    name: preBill.name,
    invoiceNumber: preBill.invoiceNumber,
    startingTime: "10:00",
    closingTime: "11:00",
    jobDescription: "",
    equipmentType: preBill.equipmentType,
    tripHours: "",
    rate: "",
    tax: preBill.tax,
    trn: preBill.trn,
    left: 0,
    discount: 0,
    date: preBill.date,
    paid: preBill.paid,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInvoice((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const handleClick = () => {
    dispatch(createBillAction(invoice));
    setInvoice({
      name: preBill.name,
      invoiceNumber: preBill.invoiceNumber,
      startingTime: "10:00",
      closingTime: "11:00",
      jobDescription: "",
      equipmentType: preBill.equipmentType,
      tripHours: "",
      rate: "",
      tax: preBill.tax,
      trn: preBill.trn,
      left: 0,
      discount: 0,
      date: preBill.date,
      paid: preBill.paid,
    });
  };
  const handleShow = () => {
    nevigate(`/billdetail/${preBill._id}`);
  };
  const handleBack = () => {
    nevigate(-1);
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ marginBottom: "50px" }}>
        <Button
          variant="contained"
          onClick={handleBack}
          sx={{
            margin: "5px",
            backgroundColor: "#0081C9",
            ":hover": { backgroundColor: "#05a5fb" },
          }}
        >
          Back
        </Button>
        <Typography
          variant="h5"
          sx={{ margin: "10px", fontWeight: "600", textAlign: "center" }}
        >
          Add Bill
        </Typography>
        {error ? <ErrorMessage error={error} /> : <div></div>}
        <Box>
          <TextField
            placeholder="Enter Name"
            label="Name"
            name="name"
            value={invoice.name}
            onChange={handleChange}
            sx={{ margin: "5px", width: "48%" }}
            disabled
          />
          <TextField
            placeholder="Enter Invoice Number"
            label="Invoice Number"
            name="invoiceNumber"
            value={invoice.invoiceNumber}
            onChange={handleChange}
            sx={{ margin: "5px", width: "48%" }}
            disabled
          />
          <TextField
            label="Starting time"
            name="startingTime"
            type="time"
            value={invoice.startingTime}
            onChange={handleChange}
            sx={{ width: "48%", margin: "5px" }}
          />
          <TextField
            label="Closing time"
            type="time"
            name="closingTime"
            value={invoice.closingTime}
            onChange={handleChange}
            sx={{ width: "48%", margin: "5px" }}
          />
          <TextField
            placeholder="Enter Job Description"
            label="Job Description"
            name="jobDescription"
            value={invoice.jobDescription}
            onChange={handleChange}
            sx={{ width: "48%", margin: "5px" }}
            required
          />
          <TextField
            placeholder="Enter Equipment Type"
            label="Equipment Type"
            name="equipmentType"
            value={invoice.equipmentType}
            onChange={handleChange}
            sx={{ width: "48%", margin: "5px" }}
            disabled
          />
          <TextField
            placeholder="Enter Trip Hours"
            label="Trip Hours"
            name="tripHours"
            value={invoice.tripHours}
            onChange={handleChange}
            sx={{ width: "48%", margin: "5px" }}
            required
          />
          <TextField
            placeholder="Enter Rate"
            label="Rate"
            name="rate"
            value={invoice.rate}
            onChange={handleChange}
            sx={{ width: "48%", margin: "5px" }}
            required
          />
          <FormControl sx={{ width: "48%", margin: "5px" }}>
            <InputLabel id="simple-select-label">Tax</InputLabel>
            <Select
              labelId="simple-select-label"
              id="simple-select"
              label="paid"
              value={invoice.tax}
              onChange={handleChange}
              name="tax"
              disabled
            >
              <MenuItem value={0}>No</MenuItem>
              <MenuItem value={5}>Yes</MenuItem>
            </Select>
          </FormControl>
          <TextField
            placeholder="Enter Customer TRN"
            label="Customer TRN"
            name="trn"
            value={invoice.trn}
            onChange={handleChange}
            sx={{ width: "48%", margin: "5px" }}
            disabled
          />
          <Button
            variant="contained"
            onClick={handleClick}
            sx={{
              width: "48%",
              margin: "5px",
              backgroundColor: "#0081C9",
              ":hover": { backgroundColor: "#05a5fb" },
            }}
          >
            Add Bill
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
    </>
  );
};

export default CreateBill;
