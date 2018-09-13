import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <div>
        <footer className="bg-dark text-white mt-5 p-2 text-center">
          CoppyRight &copy; {new Date().getFullYear} DevConnector
        </footer>
      </div>
    );
  }
}
