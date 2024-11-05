import React from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

const SubTitle = ({name}) => {
  return (
    <Box sx={{ padding: 2, textAlign: 'center' }}>
      <Typography variant="h5" color="#2a9461">
        {name}
      </Typography>
    </Box>
  );
}

export default SubTitle