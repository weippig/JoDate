import styled from "@emotion/styled";
import { Box } from "@mui/material";

const GroupItem = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#FBF8F1',
  color: theme.palette.text.secondary,
  padding: '8px',
  borderRadius: '10px',
  '&:hover': {
      color: "grey"
  },
}));

export default GroupItem