import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
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

import { billEditAction } from "../actions/invoiceAction";
import ErrorMessage from "./ErrorMessage";
import useQuery from "../utils/useMediaQuery";

const EditBill = ({ bills }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const nevigate = useNavigate();
  const location = useLocation();
  const query = useQuery();

  const { error, bill } = useSelector((state) => state.editInvoice);

  const [invoice, setInvoice] = useState({
    invoiceNumber: bills.invoiceNumber,
    name: bills.name,
    startingTime: bills.startingTime,
    closingTime: bills.closingTime,
    jobDescription: bills.jobDescription,
    equipmentType: bills.equipmentType,
    tripHours: bills.tripHours,
    rate: bills.rate,
    tax: bills.tax,
    trn: bills.trn,
    left: bills.left,
    discount: bills.discount,
    date: bills.date,
    paid: bills.paid,
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

  const dataForUpdate = location.state;
  const handleClick = () => {
    dispatch(billEditAction(id, invoice));
    dataForUpdate.map((val) =>
      dispatch(
        billEditAction(val._id, { tax: invoice.tax, paid: invoice.paid })
      )
    );
  };
  const handleShow = () => {
    nevigate(`/billdetail/${bills._id}`);
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
          Edit Bill
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
          />
          <TextField
            placeholder="Enter Invoice Number"
            label="Invoice Number"
            value={invoice.invoiceNumber}
            onChange={handleChange}
            sx={{ margin: "5px", width: "48%" }}
          />
          <TextField
            label="Starting time"
            type="time"
            name="startingTime"
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
          />
          <TextField
            placeholder="Enter Equipment Type"
            label="Equipment Type"
            name="equipmentType"
            value={invoice.equipmentType}
            onChange={handleChange}
            sx={{ width: "48%", margin: "5px" }}
          />
          <TextField
            placeholder="Enter Trip Hours"
            label="Trip Hours"
            name="tripHours"
            value={invoice.tripHours}
            onChange={handleChange}
            sx={{ width: "48%", margin: "5px" }}
          />
          <TextField
            placeholder="Enter Rate"
            label="Rate"
            name="rate"
            value={invoice.rate}
            onChange={handleChange}
            sx={{ width: "48%", margin: "5px" }}
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
            sx={{ width: "48%", margin: "5px" }}
          />

          <TextField
            placeholder="Enter discount for cst"
            label="Discount"
            name="discount"
            value={invoice.discount}
            onChange={handleChange}
            sx={{ width: "48%", margin: "5px" }}
          />
          <TextField
            placeholder="Enter Date"
            label="Date"
            name="date"
            value={invoice.date}
            onChange={handleChange}
            sx={{ width: "48%", margin: "5px" }}
          />
          <FormControl sx={{ width: "48%", margin: "5px" }}>
            <InputLabel id="demo-simple-select-label">select</InputLabel>
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
              placeholder="Enter how much Pending"
              label="Pending"
              name="left"
              value={invoice.left}
              onChange={handleChange}
              sx={{ width: "48%", margin: "5px" }}
            />
          ) : (
            <Box></Box>
          )}
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
            Save
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

export default EditBill;
