export const getColorForTransactionApproveStatus = (status) => {
  switch (status) {
    case "pending":
      return "#fd8700";
    case "approved":
      return "#2ebb00";
    case "declined":
    case "canceled":
      return "#B10040";
    default:
      return "inherit"; // Default color if status is unrecognized
  }
};
