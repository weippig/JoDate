import { Box, CircularProgress } from "@mui/material"

const Loading = () => {
  return(
    <Box display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="70vh">
        <CircularProgress size="5rem" />
      </Box>
  )
}

export default Loading