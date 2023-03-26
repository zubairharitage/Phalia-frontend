import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        width: "100%",
        textAlign: "center",
        marginTop: "15px",
        padding: "15px 0",
        backgroundColor: "#0081C9",
        color: "white",
      }}
    >
      All rights reserved &copy; {new Date().getFullYear()}
    </footer>
  );
};

export default Footer;
