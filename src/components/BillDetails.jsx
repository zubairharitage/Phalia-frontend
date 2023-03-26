import React, { useState, useRef } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useReactToPrint } from "react-to-print";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import PrintIcon from "@mui/icons-material/Print";
import { useNavigate } from "react-router-dom";

import { deleteBillAction } from "../actions/invoiceAction";

const BillDetails = ({ bill }) => {
  const dispatch = useDispatch();
  const nevigate = useNavigate();
  const conponentRef = useRef();

  const billl = bill[0];
  const [open, setOpen] = useState(false);
  const [openPrint, setOpenPrint] = useState(false);

  const arrayForBoxes = [1, 2, 3, 4, 5, 6];
  bill.forEach(() => arrayForBoxes.pop());
  let discount;
  let vat;
  let totalBill;
  let totalBil;
  let pendingBalance;

  totalBil = bill.reduce((sum, b) => sum + b.tripHours * b.rate, 0);
  discount = bill.reduce((sum, d) => sum + d.discount, 0);
  vat = (totalBil * billl.tax) / 100;
  totalBill = totalBil + vat - discount;
  pendingBalance = billl.left === 0 ? totalBill : billl.left;

  const handleDelete = (bill) => {
    bill.map((b) => dispatch(deleteBillAction(b._id)));
    nevigate(`/create`);
  };

  const handleDeleteOneBill = (id) => {
    dispatch(deleteBillAction(id));
    window.location.reload(false);
  };

  const handleAddBill = () => {
    nevigate(`/addbill/${billl._id}`);
  };
  const handlePrintBlack = () => {
    nevigate(`/printbill/${billl._id}`);
  };
  const handlePrint = useReactToPrint({
    content: () => conponentRef.current,
    documentTitle: `${billl.name}-${billl.invoiceNumber}`,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpenPrint = () => {
    setOpenPrint(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClosePrint = () => {
    setOpenPrint(false);
  };

  const dataForUpdate = bill.filter((val) => val._id !== billl._id);
  const handleEdit = () => {
    nevigate(`/editbill/${billl._id}`, { state: dataForUpdate });
  };
  const handleBack = () => {
    nevigate(-1);
  };

  return (
    <Box>
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
      <Paper
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px",
          margin: "5px 0",
          backgroundColor: "#0081C9",
          borderBottom: `3px solid ${billl.paid ? "#0081C9" : "red"}`,
        }}
      >
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddBill}
          sx={{
            backgroundColor: "#0081C9",
            ":hover": { backgroundColor: "#05a5fb" },
          }}
        >
          Add Bill
        </Button>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={handleEdit}
          sx={{
            backgroundColor: "#0081C9",
            mr: "2px",
            ":hover": { backgroundColor: "#05a5fb" },
          }}
        >
          Edit Bill
        </Button>
        <Button
          variant="contained"
          startIcon={<PrintIcon />}
          onClick={handleClickOpenPrint}
          sx={{
            backgroundColor: "#0081C9",
            mr: "2px",
            ":hover": { backgroundColor: "#05a5fb" },
          }}
        >
          Print Bill
        </Button>
        <Dialog
          open={openPrint}
          onClose={handleClosePrint}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Print</DialogTitle>
          <DialogContent>
            <Button
              variant="contained"
              startIcon={<PrintIcon />}
              onClick={handlePrintBlack}
              sx={{
                backgroundColor: "#0081C9",
                mr: "2px",
                ":hover": { backgroundColor: "#05a5fb" },
              }}
            >
              Print Black
            </Button>
            <Button
              variant="contained"
              startIcon={<PrintIcon />}
              onClick={handlePrint}
              sx={{
                backgroundColor: "#0081C9",
                mr: "2px",
                ":hover": { backgroundColor: "#05a5fb" },
              }}
            >
              Print Colorfull
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClosePrint}>Close</Button>
          </DialogActions>
        </Dialog>
        <Button
          variant="contained"
          startIcon={<DeleteIcon />}
          onClick={handleClickOpen}
          sx={{
            backgroundColor: "#0081C9",
            ":hover": { backgroundColor: "#05a5fb" },
          }}
        >
          Delete Bill
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Delete</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {`Which bill you want to delete:`}
              <br />
              {bill.map((val, index) => (
                <Button
                  key={val._id}
                  endIcon={<DeleteIcon />}
                  color="error"
                  onClick={() => handleDeleteOneBill(val._id)}
                  sx={{ display: "block" }}
                >
                  Bill No. {index + 1}
                </Button>
              ))}
              <br />
              {`Or Do you want to Delete the whole Bill?`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button
              color="error"
              onClick={() => handleDelete(bill)}
              autoFocus
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
      <Box
        ref={conponentRef}
        sx={{
          padding: "9px",
          color: "#0081C9",
          backgroundColor: "white",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Typography component="h2" variant="h4" sx={{ fontWeight: "bold" }}>
            SUPER PHALIA
          </Typography>
          <Typography component="h4" variant="h6" sx={{ fontWeight: "bold" }}>
            TRANSPORT BY HEAVY TRUCKS I.I.C
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography component="h2" variant="h6" sx={{ fontWeight: "bold" }}>
            MR. ARIF OR ATIF
          </Typography>
          <Typography component="p" variant="body1">
            MOB: 050-5837940/055-9910062/052-4723299
          </Typography>
          <Typography
            component="p"
            variant="body2"
            sx={{
              border: "2px solid #0081C9",
              display: "inline-block",
              padding: "2px",
              margin: "5px",
            }}
          >
            PLEASE ISSUE CHEQUE IN A/C OF MR. ARIF OR ATIF ALI
          </Typography>
          <Box sx={{ textAlign: "center" }}>
            <Typography
              component="p"
              variant="body1"
              sx={{ fontWeight: "bold" }}
            >
              TAX INVOICE
            </Typography>
            <Typography
              component="p"
              variant="body1"
              sx={{
                borderTop: "2px solid #0081C9",
                display: "inline-block",
                color: "black",
              }}
            >
              TRN: 100594171900003 &nbsp;&nbsp;&nbsp;&nbsp;
              {billl.trn === 0 ? "" : `Customer TRN: ${billl.trn}`}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            marginTop: "5px",
            border: "2px solid #0081C9",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>No:&nbsp;</Typography>
            <Typography sx={{ color: "red" }}>{billl.invoiceNumber}</Typography>
          </Box>
          <Typography sx={{ color: "black" }}>
            {billl.paid && "Paid"}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>Date:&nbsp;</Typography>
            <Typography sx={{ color: "black" }}>{billl.date}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            border: "2px solid #0081C9",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>Company Name:&nbsp;</Typography>
            <Typography sx={{ color: "black" }}>{billl.name}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>Equipment Type:&nbsp;</Typography>
            <Typography sx={{ color: "black" }}>
              {billl.equipmentType}
            </Typography>
          </Box>
        </Box>
        <TableContainer>
          <Table>
            <TableHead
              sx={{ backgroundColor: "#0081C9", border: "2px solid #0081C9" }}
            >
              <TableRow sx={{ border: "2px solid #0081C9" }}>
                <TableCell
                  sx={{
                    color: "white",
                    border: "2px solid #0081C9",
                  }}
                >
                  Starting Time
                </TableCell>
                <TableCell sx={{ color: "white", border: "2px solid #0081C9" }}>
                  Closing Time
                </TableCell>
                <TableCell sx={{ color: "white", border: "2px solid #0081C9" }}>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Job
                  Description&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </TableCell>
                <TableCell sx={{ color: "white", border: "2px solid #0081C9" }}>
                  Trip Hours
                </TableCell>
                <TableCell sx={{ color: "white", border: "2px solid #0081C9" }}>
                  Rate
                </TableCell>
                <TableCell sx={{ color: "white", border: "2px solid #0081C9" }}>
                  Amount
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bill.map((b) => (
                <TableRow sx={{ border: "2px solid #0081C9" }} key={b._id}>
                  <TableCell sx={{ border: "2px solid #0081C9" }}>
                    {b.startingTime}
                  </TableCell>
                  <TableCell sx={{ border: "2px solid #0081C9" }}>
                    {b.closingTime}
                  </TableCell>
                  <TableCell sx={{ border: "2px solid #0081C9" }}>
                    {b.jobDescription}
                  </TableCell>
                  <TableCell sx={{ border: "2px solid #0081C9" }}>
                    {b.tripHours}
                  </TableCell>
                  <TableCell sx={{ border: "2px solid #0081C9" }}>
                    {b.rate}
                  </TableCell>
                  <TableCell sx={{ border: "2px solid #0081C9" }}>
                    {b.tripHours * b.rate}
                  </TableCell>
                </TableRow>
              ))}
              {arrayForBoxes.map((val) => (
                <TableRow sx={{ border: "2px solid #0081C9" }} key={val}>
                  <TableCell sx={{ border: "2px solid #0081C9" }}>
                    <br />
                    {""}
                  </TableCell>
                  <TableCell sx={{ border: "2px solid #0081C9" }}>
                    <br />
                    {""}
                  </TableCell>
                  <TableCell sx={{ border: "2px solid #0081C9" }}>
                    <br />
                    {""}
                  </TableCell>
                  <TableCell sx={{ border: "2px solid #0081C9" }}>
                    <br />
                    {""}
                  </TableCell>
                  <TableCell sx={{ border: "2px solid #0081C9" }}>
                    <br />
                    {""}
                  </TableCell>
                  <TableCell sx={{ border: "2px solid #0081C9" }}>
                    <br />
                    {""}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "15px",
            borderBottom: "2px solid #0081C9",
          }}
        >
          <Typography>Bill</Typography>
          <Typography sx={{ color: "black" }}>{totalBil}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "15px",
            borderBottom: "2px solid #0081C9",
          }}
        >
          <Typography>VAT 5%</Typography>
          <Typography sx={{ color: "black" }}>{vat}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "15px",
            borderBottom: "2px solid #0081C9",
          }}
        >
          <Typography>
            {discount === 0 ? "" : "Discount"} &nbsp;&nbsp;&nbsp;
          </Typography>
          <Typography sx={{ color: "black" }}>
            {discount === 0 ? "" : discount}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "15px",
            borderBottom: "2px solid #0081C9",
          }}
        >
          <Typography>Total Bill</Typography>
          <Typography sx={{ color: "black" }}>{totalBill}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "15px",
            borderBottom: "2px solid #0081C9",
          }}
        >
          <Typography>Pending Balance</Typography>
          <Typography sx={{ color: "black" }}>
            {billl.paid ? "0" : pendingBalance}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "15px",
          }}
        >
          <Typography
            variant="body2"
            component="p"
            sx={{
              display: "inline-block",
              borderBottom: "2px solid #0081C9",
              width: "40%",
              fontWeight: "bold",
            }}
          >
            Driver Name:
          </Typography>
          <Typography
            variant="body2"
            component="p"
            sx={{
              display: "inline-block",
              borderBottom: "2px solid #0081C9",
              width: "45%",
              fontWeight: "bold",
            }}
          >
            Hirer's Signature:
          </Typography>
        </Box>
        <Box
          sx={{
            margin: "15px",
          }}
        >
          <Typography
            variant="body2"
            component="p"
            sx={{
              display: "inline-block",
              borderBottom: "2px solid #0081C9",
              width: "40%",
              fontWeight: "bold",
            }}
          >
            Signature:
          </Typography>
        </Box>
        <Box
          sx={{
            margin: "15px",
          }}
        >
          <Typography
            variant="body2"
            component="p"
            sx={{
              display: "inline-block",
              width: "40%",
              textAlign: "justify",
            }}
          >
            Note: Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
            quidem dignissimos fugiat perspiciatis tempora minima libero animi
            illum similique.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default BillDetails;
