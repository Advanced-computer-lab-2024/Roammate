import React from "react";
import { Link } from "react-router-dom";
const AlreadyHaveAnAccount = ({ link }) => {
  return (
    <p>
      Already have an account?{"  "}
      <Link to={link} style={{ color: "blue", textDecoration: "underline" }}>
        Login
      </Link>
    </p>
  );
};

export default AlreadyHaveAnAccount;
