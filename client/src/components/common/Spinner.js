import React from "react";
import spinner from "../../img/spinner.gif";

export default () => {
  return (
    <img
      src={spinner}
      alt="loading..."
      style={{
        width: "150px",
        margin: "auto",
        display: "block"
      }}
    />
  );
};
