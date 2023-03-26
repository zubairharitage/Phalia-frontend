import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

const BillDetails = ({ bill }) => {
  const conponentRef = useRef();
  const nevigate = useNavigate();

  const billl = bill[0];

  const arrayForBoxes = [1, 2, 3, 4, 5, 6];
  bill.forEach(() => arrayForBoxes.pop());
  let discount;
  let vat;
  let totalBill;
  let totalBil;
  let pendingBalance;

  try {
    totalBil = bill.reduce((sum, b) => sum + b.tripHours * b.rate, 0);
    discount = bill.reduce((sum, d) => sum + d.discount, 0);
    vat = (totalBil * billl.tax) / 100;
    totalBill = totalBil + vat - discount;
    pendingBalance = billl.left === 0 ? totalBill : billl.left;
  } catch (err) {
    window.location.reload(false);
  }
  const handlePrint = useReactToPrint({
    content: () => conponentRef.current,
    onAfterPrint: () => nevigate(`/billdetail/${billl._id}`),
    documentTitle: `${billl.name}-${billl.invoiceNumber}`,
  });

  setTimeout(() => handlePrint(), 1000);

  return (
    <Box>
      <Box
        ref={conponentRef}
        sx={{
          padding: "9px",
          color: "white",
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
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Typography>
          <Typography component="h4" variant="h6" sx={{ fontWeight: "bold" }}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography component="h2" variant="h6" sx={{ fontWeight: "bold" }}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Typography>
          <Typography component="p" variant="body1">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Typography>
          <Typography
            component="p"
            variant="body2"
            sx={{
              border: "2px solid white",
              display: "inline-block",
              padding: "2px",
              margin: "5px",
            }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Typography>
          <Box sx={{ textAlign: "center" }}>
            <Typography
              component="p"
              variant="body1"
              sx={{ fontWeight: "bold" }}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Typography>
            <Typography
              component="p"
              variant="body1"
              sx={{
                borderTop: "2px solid white",
                display: "inline-block",
                color: "black",
              }}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
            border: "2px solid white",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Typography>
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
            <Typography>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Typography>
            <Typography sx={{ color: "black" }}>{billl.date}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            border: "2px solid white",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Typography>
            <Typography sx={{ color: "black" }}>{billl.name}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Typography>
            <Typography sx={{ color: "black" }}>
              {billl.equipmentType}
            </Typography>
          </Box>
        </Box>
        <TableContainer>
          <Table>
            <TableHead
              sx={{ backgroundColor: "white", border: "2px solid white" }}
            >
              <TableRow sx={{ border: "2px solid white" }}>
                <TableCell sx={{ color: "white", border: "2px solid white" }}>
                  Starting Time
                </TableCell>
                <TableCell sx={{ color: "white", border: "2px solid white" }}>
                  Closing Time
                </TableCell>
                <TableCell sx={{ color: "white", border: "2px solid white" }}>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Job
                  Description&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </TableCell>
                <TableCell sx={{ color: "white", border: "2px solid white" }}>
                  Trip Hours
                </TableCell>
                <TableCell sx={{ color: "white", border: "2px solid white" }}>
                  Rate
                </TableCell>
                <TableCell sx={{ color: "white", border: "2px solid white" }}>
                  Amount
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bill.map((b) => (
                <TableRow sx={{ border: "2px solid white" }} key={b._id}>
                  <TableCell sx={{ border: "2px solid white" }}>
                    {b.startingTime}
                  </TableCell>
                  <TableCell sx={{ border: "2px solid white" }}>
                    {b.closingTime}
                  </TableCell>
                  <TableCell sx={{ border: "2px solid white" }}>
                    {b.jobDescription}
                  </TableCell>
                  <TableCell sx={{ border: "2px solid white" }}>
                    {b.tripHours}
                  </TableCell>
                  <TableCell sx={{ border: "2px solid white" }}>
                    {b.rate}
                  </TableCell>
                  <TableCell sx={{ border: "2px solid white" }}>
                    {b.tripHours * b.rate}
                  </TableCell>
                </TableRow>
              ))}
              {arrayForBoxes.map((val) => (
                <TableRow sx={{ border: "2px solid white" }} key={val}>
                  <TableCell sx={{ border: "2px solid white" }}>
                    <br />
                    {""}
                  </TableCell>
                  <TableCell sx={{ border: "2px solid white" }}>
                    <br />
                    {""}
                  </TableCell>
                  <TableCell sx={{ border: "2px solid white" }}>
                    <br />
                    {""}
                  </TableCell>
                  <TableCell sx={{ border: "2px solid white" }}>
                    <br />
                    {""}
                  </TableCell>
                  <TableCell sx={{ border: "2px solid white" }}>
                    <br />
                    {""}
                  </TableCell>
                  <TableCell sx={{ border: "2px solid white" }}>
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
            borderBottom: "2px solid white",
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
            borderBottom: "2px solid white",
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
            borderBottom: "2px solid white",
          }}
        >
          <Typography sx={{ color: discount === 0 ? "white" : "#0081C9" }}>
            Discount
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
            borderBottom: "2px solid white",
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
            borderBottom: "2px solid white",
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
              borderBottom: "2px solid white",
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
              borderBottom: "2px solid white",
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
              borderBottom: "2px solid white",
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
