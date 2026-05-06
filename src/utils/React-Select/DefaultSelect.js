const DefaultStyle = {
  control: (base) => ({
    ...base,
    background: "transparent",
    border: "none",
    boxShadow: "none",
    height: "100%",
    minWidth: "150px",
    cursor: "pointer",
    alignSelf: "center"
  }),

  singleValue: (base) => ({
    ...base,
    color: "white",
    fontSize: "1.5rem",  // Simulates H2
    fontWeight: "600",
    justifySelf: "end",
    margin: 0,
  }),

};

export default DefaultStyle;