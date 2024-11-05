import { Box, TextField, Button, Accordion, AccordionSummary , AccordionDetails } from "@mui/material";
import SubTitle from "./components/subtitle";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as React from 'react';
import axios from "axios";
import Swal from 'sweetalert2'

function Edit() {
  const url = process.env.REACT_APP_BACKEND_URL

  const [oldPassword, setOldPassword] = React.useState("")
  const [newPassword, setNewPassword] = React.useState("")
  const [checkPassword, setCheckPassword] = React.useState("")

  const [name, setName] = React.useState("")
  const [intro, setIntro] = React.useState("")

  const handleOldPasswordChange = (event) => {
    setOldPassword(event.target.value)
  }

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value)
  }

  const handleCheckPasswordChange = (event) => {
    setCheckPassword(event.target.value)
  }

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleIntroChange = (event) => {
    setIntro(event.target.value)
  }

  function getCookie(cookieName) {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim(); // 移除空格
      if (cookie.startsWith(cookieName + "=")) {
        return cookie.substring(cookieName.length + 1);
      }
    }
    return null;
  }

  const handleUpdatePassword = () => {
    if(newPassword !== checkPassword) { 
      Swal.fire({
        icon: 'warning',
        text: '新密碼與再次輸入密碼不一致',
        confirmButtonColor: 'grey',
      })
    } else if(newPassword === ""|| checkPassword === "" || oldPassword ==="") {
      Swal.fire({
        icon: 'warning',
        text: '欄位不可為空',
        confirmButtonColor: 'grey',
      })
    } else {
      axios.post(url + '/user/password', {
        "uid": getCookie("Log_in_ID"),
        "origin_password":oldPassword,
        "password": newPassword,
      })
      .then(function (response) {
        if(response.data.Error !== undefined) {
          Swal.fire({
            icon: 'error',
            text: response.data.Error,
            confirmButtonColor: 'grey',
          })
        } else {
          Swal.fire({
            icon: 'success',
            text: '更改密碼成功',
            confirmButtonColor: 'grey',
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload(false)
            }
          })
        }
       
      })
      .catch(function (error) {
        Swal.fire({
          icon: 'error',
          text: '系統出現錯誤',
          confirmButtonColor: 'grey',
        })
      });

    }
  }

  const handleUpdateProfile = () => {
    if(intro===""||name==="") {
      Swal.fire({
        icon: 'warning',
        text: '欄位不可為空',
        confirmButtonColor: 'grey',
      })
    } else {
      axios.post(url + '/user/update',{
        "uid": getCookie("Log_in_ID"),
        "username": name,
        "intro": intro,
        "url": "https://i.imgur.com/boT6QuE.png",
      })
      .then(function (response) {
        if(response.data.Error !== undefined) {
          Swal.fire({
            icon: 'error',
            text: response.data.Error,
            confirmButtonColor: 'grey',
          })
        } else {
          Swal.fire({
            icon: 'success',
            text: '更改個人資料成功',
            confirmButtonColor: 'grey',
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload(false)
            }
          })
        }
      })
      .catch(function (error) {
        Swal.fire({
          icon: 'error',
          text: '系統出現錯誤',
          confirmButtonColor: 'grey',
        })
      });

    }
  }

  return(
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
           <Accordion sx={{width: "50%"}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <SubTitle name="修改密碼"/>
            </AccordionSummary>
            <AccordionDetails>
              <Box component="form" noValidate >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="oldPassword"
                  label="舊密碼"
                  type="password"
                  name="old password"
                  onChange={handleOldPasswordChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="newPassword"
                  label="新密碼"
                  type="password"
                  id="password"
                  onChange={handleNewPasswordChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="newPassword2"
                  label="再次輸入新密碼"
                  type="password"
                  id="password2"
                  onChange={handleCheckPasswordChange}
                />
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleUpdatePassword}
                >
                  提交
                </Button>
              </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{width: "50%"}} >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <SubTitle name="修改資料"/>
            </AccordionSummary>

            <AccordionDetails>
              <Box component="form" noValidate >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="userName"
                  label="修改用戶名稱"
                  name="user name"
                  onChange={handleNameChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="intro"
                  label="修改自我介紹"
                  id="intro"
                  multiline
                  rows={3}
                  onChange={handleIntroChange}
                />
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleUpdateProfile}
                >
                  提交
                </Button>
              </Box>
          </AccordionDetails>
        </Accordion>
    </Box>
  )
}

export default Edit