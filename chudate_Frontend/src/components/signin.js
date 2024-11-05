import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

export default function SignIn() {
  const url = process.env.REACT_APP_BACKEND_URL

  let sign_in_Data=
  {
    "uid":"",
    "password":""
  }

  function handleSubmit() {
    sign_in_Data.uid=document.getElementById("email").value;
    sign_in_Data.password=document.getElementById("password").value;
    if (sign_in_Data.uid!=="" && sign_in_Data.password!=="")
    {
      console.log("準備向資料庫查詢");
      axios.post(url + '/user/signin', sign_in_Data)
      .then(function (response) {
        console.log(response);
        if (JSON.stringify(response).includes("User Info"))
        {
          //alert("登入成功");
          let expires = new Date();
          expires.setMinutes(expires.getMinutes() + 15);
          Cookies.set('Log_in_ID', sign_in_Data.uid , { expires });
          // window.location.reload();

          Swal.fire({
            icon: 'success',
            text: '登入成功',
            confirmButtonColor: 'grey',
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload(false)
            }
          })
        }
        else if (JSON.stringify(response).includes("Error"))
        {
          Swal.fire({
            icon: 'warning',
            text: '您輸入的帳號密碼有誤',
            confirmButtonColor: 'grey',
          })
        }
        else
        {
          Swal.fire({
            icon: 'warning',
            text: response,
            confirmButtonColor: 'grey',
          })
        }
      })
      .catch(function (error) {
        Swal.fire({
          icon: 'error',
          text: '系統出現錯誤',
          confirmButtonColor: 'grey',
        })
        console.log(error);
      });
    }
    else
    {
      Swal.fire({
        icon: 'warning',
        text: '請填入帳號/密碼',
        confirmButtonColor: 'grey',
      })
    }
  }


  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            請先登入
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="register" variant="body2" >
                  {"註冊"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}