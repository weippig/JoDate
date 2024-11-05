import * as React from 'react';
import { Box } from "@mui/material";
import pagenotfound from './pagenotfound.svg';

function PageNotFound() {
  return (
    <Box sx={{ textAlign: 'center'}}>
      <img src={pagenotfound} className="Page-Not-Found-logo" alt="logo"  width="500" height="600" />
    </Box>
  );
}


export default PageNotFound;