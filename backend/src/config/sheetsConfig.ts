const sheetsConfig = {
  invoices: {
    columnMapping: {
      Name: "name",
      Amount: "amount",
      Date: "date",
      Verified: "verified",
    },

    validationRules: [
      { column: "Name", required: true },
      { columh: "Amount", required: true, type: "number" },
      { column: "Date", required: true, type: "date" },
      { column: "Verified", required: true, allowedValues: ["Yes", "No"] },
    ],

    errorResponse: {
      sheetName: "invoices",
      rowNumber: null,
      description: null,
    },
  },
};

export default sheetsConfig;
