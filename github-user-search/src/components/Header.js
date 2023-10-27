import React from "react";

function Header({ title }) {
  return (
    <header className="App-header mb-3 py-2">
      <h1 className="text-center">{title}</h1>
    </header>
  );
}

export default Header;
