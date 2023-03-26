import React, { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import DashboardCard from "./DashboardCard";
import BarChart from "./BarChart";
import useQuery from "../utils/useMediaQuery";

const Dashboard = ({ bills }) => {
  const query = useQuery();
  const [value, setValue] = useState(dayjs(new Date()));

  const filterByYear = bills.filter((bill) =>
    bill.date.includes(`${value.$y}`)
  );
  const m = `${value.$M + 1}`;
  const mon = m.length === 1 ? `0${m}` : m;

  const data = filterByYear.filter((bill) => bill.date.slice(3, 5) === mon);

  // for tax in month
  const taxData = data.filter((val) => val.tax === 5);
  const funcTax = (sum, bill) => {
    const b = bill.tripHours * bill.rate;
    const tax = b * 0.05;
    sum += tax;
    return sum;
  };
  const taxx = taxData.reduce(funcTax, 0);

  // for total bills in months
  const func = (sum, bill) => {
    const b = bill.tripHours * bill.rate;
    const tax = b * 0.05;
    const bil = bill.tax === 5 ? b + tax : b;
    sum += bil;
    return sum;
  };
  const totalBil = data.reduce(func, 0);
  const discount = data.reduce((sum, d) => sum + d.discount, 0);
  const totalAmount = totalBil - discount;

  // for paid bills in month
  const dataOfPaid = data.filter((val) => val.paid === true);
  const funcForPaid = (sum, bill) => {
    const b = bill.tripHours * bill.rate;
    const tax = b * 0.05;
    const bil = bill.tax === 5 ? b + tax : b;
    sum += bil;
    return sum;
  };
  const totalBilForPaid = dataOfPaid.reduce(funcForPaid, 0);
  const discountForPaid = dataOfPaid.reduce((sum, d) => sum + d.discount, 0);
  const totalAmountForPaid = totalBilForPaid - discountForPaid;

  // for unpaid bills in month
  const dataOfUnPaid = data.filter((val) => val.paid === false);
  const funcForUnPaid = (sum, bill) => {
    const b = bill.tripHours * bill.rate;
    const tax = b * 0.05;
    const bil = bill.tax === 5 ? b + tax : b;
    sum += bil;
    return sum;
  };
  const totalBilForUnPaid = dataOfUnPaid.reduce(funcForUnPaid, 0);
  const discountForUnPaid = dataOfUnPaid.reduce(
    (sum, d) => sum + d.discount,
    0
  );
  const totalAmountForUnPaid = totalBilForUnPaid - discountForUnPaid;

  // for total bills in Year
  const funcYear = (sum, bill) => {
    const b = bill.tripHours * bill.rate;
    const tax = b * 0.05;
    const bil = bill.tax === 5 ? b + tax : b;
    sum += bil;
    return sum;
  };
  const totalBilYear = filterByYear.reduce(funcYear, 0);
  const discountYear = filterByYear.reduce((sum, d) => sum + d.discount, 0);
  const totalAmountYear = totalBilYear - discountYear;

  // for paid bills in Year
  const dataOfPaidYear = filterByYear.filter((val) => val.paid === true);
  const funcForPaidYear = (sum, bill) => {
    const b = bill.tripHours * bill.rate;
    const tax = b * 0.05;
    const bil = bill.tax === 5 ? b + tax : b;
    sum += bil;
    return sum;
  };
  const totalBilForPaidYear = dataOfPaidYear.reduce(funcForPaidYear, 0);
  const discountForPaidYear = dataOfPaidYear.reduce(
    (sum, d) => sum + d.discount,
    0
  );
  const totalAmountForPaidYear = totalBilForPaidYear - discountForPaidYear;

  // for unpaid bills in Year
  const dataOfUnPaidYear = filterByYear.filter((val) => val.paid === false);
  const funcForUnPaidYear = (sum, bill) => {
    const b = bill.tripHours * bill.rate;
    const tax = b * 0.05;
    const bil = bill.tax === 5 ? b + tax : b;
    sum += bil;
    return sum;
  };
  const totalBilForUnPaidYear = dataOfUnPaidYear.reduce(funcForUnPaidYear, 0);
  const discountForUnPaidYear = dataOfUnPaidYear.reduce(
    (sum, d) => sum + d.discount,
    0
  );
  const totalAmountForUnPaidYear =
    totalBilForUnPaidYear - discountForUnPaidYear;

  // function for getting month names
  function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString("en-US", { month: "long" });
  }
  const arr = Array(12).fill(0, 0);
  const monthNames = arr.map((val, index) => getMonthName(index + 1));
  // Data Month by month
  const monthData = arr.map((val, index) => {
    const data1 = filterByYear.filter((bill) => {
      const mon1 =
        bill.date.slice(3, 4) === "0" ? `0${index + 1}` : `${index + 1}`;
      return bill.date.slice(3, 5) === mon1;
    });
    const func1 = (sum, bill) => {
      const b = bill.tripHours * bill.rate;
      const tax = b * 0.05;
      const bil = bill.tax === 5 ? b + tax : b;
      sum += bil;
      return sum;
    };
    const totalBi = data1.reduce(func1, 0);
    const discountt = data1.reduce((sum, d) => sum + d.discount, 0);
    const totalAmountt = totalBi - discountt;
    return totalAmountt;
  });
  // Tax Data Month by month
  const monthTaxtData = arr.map((val, index) => {
    const taxData1 = filterByYear.filter((bill) => {
      const mon1 =
        bill.date.slice(3, 4) === "0" ? `0${index + 1}` : `${index + 1}`;
      return bill.date.slice(3, 5) === mon1;
    });
    const taxFunc1 = (sum, bill) => {
      const b = bill.tripHours * bill.rate;
      const tax = b * 0.05;
      const bil = bill.tax === 5 ? tax : 0;
      sum += bil;
      return sum;
    };
    const totalTaxBi = taxData1.reduce(taxFunc1, 0);
    return totalTaxBi;
  });

  // Chart Data
  const chartData = {
    labels: monthNames,
    datasets: [
      {
        label: "Income",
        data: monthData,
      },
    ],
  };
  // Tax Data for chart
  const taxChartData = {
    labels: monthNames,
    datasets: [
      {
        label: "Tax",
        data: monthTaxtData,
      },
    ],
  };

  return (
    <Box sx={{ display: "flex", flexDirection: query ? "row" : "column" }}>
      <Box
        sx={{
          margin: "15px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <Box sx={{ width: "50%" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              openTo="year"
              views={["year", "month"]}
              label="Year and Month"
              minDate={dayjs("01-01-2022")}
              maxDate={dayjs("12-12-2033")}
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} helperText={null} />
              )}
            />
          </LocalizationProvider>
        </Box>
        <Typography variant="h6" component={"h3"}>
          Tax of Month {getMonthName(value.$M + 1)}
        </Typography>
        <DashboardCard
          data={taxData}
          title={{ t1: "Total tax Bills", t2: "Total Tax" }}
          values={{
            v1: [...new Map(taxData.map((b) => [b.invoiceNumber, b])).values()]
              .length,
            v2: taxx,
          }}
        />
        <Typography variant="h6" component={"h3"}>
          Bills of Month {getMonthName(value.$M + 1)}
        </Typography>
        <DashboardCard
          data={data}
          title={{ t1: "Total Bills", t2: "Total Income" }}
          values={{
            v1: [...new Map(data.map((b) => [b.invoiceNumber, b])).values()]
              .length,
            v2: totalAmount,
          }}
        />
        <DashboardCard
          data={dataOfPaid}
          title={{ t1: "Paid Bills", t2: "Recieved" }}
          values={{
            v1: [
              ...new Map(dataOfPaid.map((b) => [b.invoiceNumber, b])).values(),
            ].length,
            v2: totalAmountForPaid,
          }}
        />
        <DashboardCard
          data={dataOfUnPaid}
          title={{ t1: "UnPaid Bills", t2: "Pending" }}
          values={{
            v1: [
              ...new Map(
                dataOfUnPaid.map((b) => [b.invoiceNumber, b])
              ).values(),
            ].length,
            v2: totalAmountForUnPaid,
          }}
        />
        <Typography variant="h6" component={"h3"}>
          Bills of Year {value.$y}
        </Typography>
        <DashboardCard
          data={filterByYear}
          title={{ t1: "Total Bills", t2: "Total Income" }}
          values={{
            v1: [
              ...new Map(
                filterByYear.map((b) => [b.invoiceNumber, b])
              ).values(),
            ].length,
            v2: totalAmountYear,
          }}
        />
        <DashboardCard
          data={dataOfPaidYear}
          title={{ t1: "Paid Bills", t2: "Recieved" }}
          values={{
            v1: [
              ...new Map(
                dataOfPaidYear.map((b) => [b.invoiceNumber, b])
              ).values(),
            ].length,
            v2: totalAmountForPaidYear,
          }}
        />
        <DashboardCard
          data={dataOfUnPaidYear}
          title={{ t1: "UnPaid Bills", t2: "Pending" }}
          values={{
            v1: [
              ...new Map(
                dataOfUnPaidYear.map((b) => [b.invoiceNumber, b])
              ).values(),
            ].length,
            v2: totalAmountForUnPaidYear,
          }}
        />
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BarChart chartData={chartData} />

        <BarChart chartData={taxChartData} />
      </Box>
    </Box>
  );
};

export default Dashboard;
