import React from "react";

const d = new Date();
let year = d.getFullYear();

function footer() {
  return (
    <footer>
      <p>Copyright{year}</p>
    </footer>
  );
}

export default footer;
