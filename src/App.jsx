import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import AllBills from "./pages/AllBills";
import PaidScreen from "./pages/PaidScreen";
import UnPaidScreen from "./pages/UnPaidScreen";
import BillDetailScreen from "./pages/BillDetailScreen";
import CreateBillScreen from "./pages/CreateBillScreen";
import EditBillScreen from "./pages/EditBillScreen";
import DashboardScreen from "./pages/DashboardScreen";
import PrintBillScreen from "./pages/PrintBillScreen";
import LoginScreen from "./pages/LoginScreen";
import DashboardDataScreen from "./pages/DashboardDataScreen";
function App() {
  const [isLogedIn, setIsLogedIn] = useState("");
  useEffect(() => {
    setIsLogedIn(localStorage.getItem("isLoged"));
  }, [isLogedIn]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginScreen />} />
        {isLogedIn === "login" && <Route path="/create" element={<Home />} />}
        {isLogedIn === "login" && <Route path="/all" element={<AllBills />} />}
        {isLogedIn === "login" && (
          <Route path="/paid" element={<PaidScreen />} />
        )}
        {isLogedIn === "login" && (
          <Route path="/unpaid" element={<UnPaidScreen />} />
        )}
        {isLogedIn === "login" && (
          <Route path="/billdetail/:id" element={<BillDetailScreen />} />
        )}
        {isLogedIn === "login" && (
          <Route path="/printbill/:id" element={<PrintBillScreen />} />
        )}
        {isLogedIn === "login" && (
          <Route path="/addbill/:id" element={<CreateBillScreen />} />
        )}
        {isLogedIn === "login" && (
          <Route path="/editbill/:id" element={<EditBillScreen />} />
        )}
        {isLogedIn === "login" && (
          <Route path="/dashboard" element={<DashboardScreen />} />
        )}
        {isLogedIn === "login" && (
          <Route path="/dashboard/data" element={<DashboardDataScreen />} />
        )}
        <Route
          path="*"
          element={
            <div>
              <h2>404 Page not found</h2>
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
