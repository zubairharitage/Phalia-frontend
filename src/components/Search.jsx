import React, { useState } from "react";
import {
  Box,
  Button,
  InputAdornment,
  Pagination,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import BillPaper from "./BillPaper";
import { useNavigate } from "react-router-dom";
import useQuery from "../utils/useMediaQuery";

const Search = ({ bills }) => {
  const nevigate = useNavigate();
  const query = useQuery();
  const [searchName, setSearchName] = useState("");
  const [searchInvoice, setSearchInvoice] = useState("");
  const [offSet, setOffSet] = useState(0);

  const data = bills.filter(
    (bill) =>
      bill.invoiceNumber.toString().includes(searchInvoice) &&
      bill.name.toLowerCase().includes(searchName.toLowerCase())
  );

  const perPage = 12;
  const dataLength = data.length;
  const count = Math.ceil(dataLength / perPage);

  const slice = data.slice(offSet, offSet + perPage);

  const handleChangeName = (e) => {
    setSearchName(e.target.value);
  };
  const handleChangeNumber = (e) => {
    setSearchInvoice(e.target.value);
  };
  const handleBack = () => {
    nevigate(-1);
  };
  const handleChange = (e, value) => {
    const selectedPage = value - 1;
    setOffSet(selectedPage * perPage);
  };

  return (
    <>
      <Box sx={{ width: "60%" }}>
        <TextField
          placeholder="Name..."
          label="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          size="small"
          value={searchName}
          onChange={handleChangeName}
          sx={{ margin: "10px", width: query ? "46%" : "96%" }}
        />
        <TextField
          placeholder="Invoice number..."
          label="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          size="small"
          value={searchInvoice}
          onChange={handleChangeNumber}
          sx={{ margin: "10px", width: query ? "46%" : "96%" }}
        />
        <Button
          variant="contained"
          onClick={handleBack}
          sx={{
            backgroundColor: "#0081C9",
            marginLeft: "8px",
            border: `1px solid #0081C9`,
            ":hover": {
              boxShadow: `0px 4px 8px rgba(38, 38, 38, 0.2)`,
              backgroundColor: "#c9e4fe",
              color: "black",
              border: `1px solid #cccccc`,
            },
          }}
        >
          Back
        </Button>
      </Box>
      <Box>
        {slice.map((bill) => (
          <BillPaper bill={bill} key={bill._id} />
        ))}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Pagination
            count={count}
            color="primary"
            size="large"
            onChange={handleChange}
          />
        </Box>
      </Box>
    </>
  );
};

export default Search;
