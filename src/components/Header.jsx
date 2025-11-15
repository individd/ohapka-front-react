import React from "react";

export function Header() {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>Просто Охапка</h1>
    </header>
  );
}

const styles = {
  header: {
    padding: "16px",
    background: "#ffffff",
    borderBottom: "1px solid #eee",
    textAlign: "center"
  },
  title: {
    margin: 0,
    fontSize: "20px",
    fontWeight: 600
  }
};