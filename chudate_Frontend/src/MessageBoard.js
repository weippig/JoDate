import { useParams } from 'react-router-dom';
import { Box, Button, Paper, TextField, Stack } from "@mui/material";
import SubTitle from "./components/subtitle";
import styled from "@emotion/styled";
import * as React from 'react';
import Loading from "./components/loading"
import { write, read } from './utils/firebase';
import axios from 'axios';
import Swal from 'sweetalert2';

const MessageItem = styled(Box)(({ theme }) => ({
  backgroundColor: '#FFF8D6',
  color: theme.palette.text.secondary,
  padding: '8px',
  borderRadius: '10px',
  '&:hover': {
    backgroundColor: "#F9FBE7"
  },
}));

const MessageBoard = () => {
  const url = process.env.REACT_APP_BACKEND_URL

  let { id } = useParams()
  const [isLoading, setIsLoading] = React.useState("")
  const [data, setData] = React.useState([])
  const [textInput, setTextInput] = React.useState('')

  function getCookieValue(cookieName) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(cookieName + '=')) {
        return cookie.substring(cookieName.length + 1);
      }
    }
    return null;
  }

  React.useEffect(() => {
    
    async function fetchData() {
       setIsLoading(true);
       try {
          const data = await read(id)
          setData(data);
       } catch (error) {
          console.error(error);
       } finally {
          setIsLoading(false);
       }
    }

      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <Loading />
    )
  }

  const handleClick = async () => {
    const uid = getCookieValue('Log_in_ID')
    axios.post(url + '/user/get', {"uid": uid})
    .then(function (response) {
      write(id,uid,response.data.user[0].name,textInput)
      window.location.reload(false)
    })
    .catch(function (error) {
      Swal.fire({
        icon: 'error',
        text: '系統出現錯誤',
        confirmButtonColor: 'grey',
      })
    });
  }

  const handleTextInputChange = event => {
    setTextInput(event.target.value);
  };

  return(
    <Box>
      <SubTitle name="留言板"/>
      <Paper elevation={3} sx={{ marginRight: "20%", marginLeft: "20%", borderRadius: "10px" }}>
          <Stack sx={{
            marginRight: "3%",
            marginLeft: "3%",
            marginBottom:"3%",
            padding: "3%",
          }}
          spacing={2}>
            <Box sx= {{display: 'flex',}}>
              <TextField
                id="filled-multiline-static"
                label="留言"
                fullWidth
                defaultValue=""
                variant="standard"
                onChange= {handleTextInputChange}
              />
              <Button onClick={handleClick}>送出</Button>
            </Box>
            {
              data.map((data)=>{
                return(
                  <MessageItem>
                    <div display="flex">
                      {data.username}
                      {", 發佈於 "}
                      {data.timestamp}
                    </div>
                      {data.message}
                  </MessageItem>
                )
              })
            }
          </Stack>
      </Paper>
      </Box>
  )
}

export default MessageBoard