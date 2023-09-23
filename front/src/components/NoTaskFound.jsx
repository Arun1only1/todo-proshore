import { Box, Typography } from "@mui/material";
import React from "react";

const NoTaskFound = () => {
  return (
    <Box sx={{ mt: "5rem" }}>
      <Typography variant="h6" sx={{ color: "grey" }}>
        There is no task currently.
      </Typography>
    </Box>
  );
};

export default NoTaskFound;
