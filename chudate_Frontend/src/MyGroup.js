import { Grid, Box, Link, Stack } from "@mui/material";
import GroupItem from "./components/groupItem";
import axios from 'axios';
import React from 'react'; 
import Swal from "sweetalert2";

function MyGroup() {
  const url = process.env.REACT_APP_BACKEND_URL
  const [Data, setData] = React.useState([])

  function getCookieValue(cookieName) {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim(); // 移除空格
      if (cookie.startsWith(cookieName + "=")) {
        return cookie.substring(cookieName.length + 1);
      }
    }
    return null;
  }
  
  function axios_ask_by_uid() {
    axios.post(url+'/user/groups', {"uid":getCookieValue('Log_in_ID')})
    .then(function (response) {
      setData(response.data.groups);
    })
    .catch(function (error) {
      Swal.fire({
        icon: 'error',
        text: '系統出現錯誤',
        confirmButtonColor: 'grey',
      })
    });
  }

  function convert(str) {
    if(str==="A") {
      return "尚有餘額"
    } else if (str==="C") {
      return  "已經結束"
    } else if (str==="FA") {
      return "未成團"
    } else if (str==="FU") {
      return "目前額滿"
    } else {
      return "已被刪除"
    }
  }

  function convertType(str) {
    if (str==="A"){
        return "聯誼"
    } else if (str==="B") {
      return "打球"
    } else if (str==="C") {
      return "拼車"
    } else if (str==="D") {
      return "叫外送"
    } else if (str==="O") {
      return "其他"
    } else{
      return "其他"
    }
  }


  React.useEffect(() => {
    axios_ask_by_uid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
          sx={{
            display: 'flex',
            textAlign: 'center',
            marginRight: "20%",
            marginLeft: "20%",
            marginTop: "3%", marginBottom:"5%"
          }}
        >
        <Stack sx={{ width: "100%", }} spacing={2}>

            <Box>
              <Grid container >
                <Grid item xs={4} >
                  活動名稱
                </Grid>
                <Grid item xs={2}>
                  類型
                </Grid>
                <Grid item xs={4}>
                  時間
                </Grid>
                <Grid item xs={2}>
                  狀態
                </Grid>
              </Grid>
            </Box>
              
            
            {
              Data?.map((data) => {
                return(
                  <GroupItem>
                  <Grid container 
                        spacing={2} 
                        direction="row"
                        justify="flex-end"
                        alignItems="center">
                    <Grid item xs={4}  >
                      {data.title}
                    </Grid>
                    <Grid item xs={2}>
                      {convertType(data.type)}
                    </Grid>
                    <Grid item xs={4}>
                      {data.date.replace(/T/g, "/").replace(/Z/g, "")}
                    </Grid>
                    <Grid item xs={2}>
                      <Link underline="hover" href={"/groupdetail/"+data.id} target="_blank" rel="noreferrer noopenner">
                          { convert(data.status) }
                      </Link>
                    </Grid>
                  </Grid>
                </GroupItem>
                )
              })
            }
        </Stack>
    </Box>
  );
}
 export default MyGroup;