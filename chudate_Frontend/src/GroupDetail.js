import * as React from 'react';
import { Box, Paper, Stack, Typography, Link, Button, Grid } from "@mui/material";
import { useParams } from 'react-router-dom';
import SubTitle from "./components/subtitle";
import Loading from "./components/loading"
import axios from 'axios';
import Swal from 'sweetalert2'

const GroupDetail = () => {
  const url = process.env.REACT_APP_BACKEND_URL
  const [isLoading, setIsLoading] = React.useState("")
  const [data, setData] = React.useState("")
  const [groupAttendance, setGroupAttendance] = React.useState("")
  const [date, setDate] = React.useState("")
  const [amount, setAmount] = React.useState(0)
  let { id } = useParams(); 

  function checkIfInGroup() {
    return groupAttendance.includes(getCookieValue('Log_in_ID'))
  }

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

  function judge_type(type) {
    if (type==="A")
    {
      return "聯誼";
    }
    else if (type==="B")
    {
      return "打球";
    }
    else if (type==="C")
    {
      return "拼車";
    }
    else if (type==="D")
    {
      return "拼外送";
    }
    else if (type==="O")
    {
      return "其他";
    }
    else
    {
      return "類別格式有誤";
    }
  } 

  function replace_date(date) {
    if (date!==null)
    {
      return date.replace(/T/g, "/").replace(/Z/g, "");
    }
    else
    {
      return date;
    }
  }

  function join() {
    if(getCookieValue('Log_in_ID') === data.creator){
      Swal.fire({
        icon: 'warning',
        text: '創辦人已在揪團內',
        confirmButtonColor: 'grey',
      })
    } else if (checkIfInGroup()) {
      Swal.fire({
        icon: 'warning',
        text: '已在揪團內',
        confirmButtonColor: 'grey',
      })
    } else {
      axios.post(url+ '/group/update/attendance', {"uid":getCookieValue('Log_in_ID'),"group_id":id,"operation":"add"})
      .then(function (response) {
        Swal.fire({
          icon: 'success',
          text: '已加入此活動',
          confirmButtonColor: 'grey',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload(false)
          }
        })
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

  function leave() {
    if(getCookieValue('Log_in_ID') === data.creator){
      Swal.fire({
        icon: 'warning',
        text: '創辦人不可退出揪團',
        confirmButtonColor: 'grey',
      })
    } else if (!checkIfInGroup()) {
      Swal.fire({
        icon: 'warning',
        text: '尚未加入揪團',
        confirmButtonColor: 'grey',
      })
    } else {
      axios.post(url + '/group/update/attendance', {"uid":getCookieValue('Log_in_ID'),"group_id":id,"operation":"remove"})
    .then(function (response) {
      Swal.fire({
        icon: 'success',
        text: '已離開此活動',
        confirmButtonColor: 'grey',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload(false)
        }
      })
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

  React.useEffect(() => {

    async function fetchData() {
       setIsLoading(true);
       try {
          axios.post(url+'/group/get', {"gid":id})
          .then(function (response) {
            console.log(response)
            setData(response.data.Group[0])
            setDate(replace_date(response.data.Group[0].date))
            setGroupAttendance(response.data.GroupAttendance)
            setAmount(response.data.Group[0].max_require - response.data.Group[0].actual)
          })
          .catch(function (error) {
            Swal.fire({
              icon: 'error',
              text: '系統出現錯誤',
              confirmButtonColor: 'grey',
            })
          });
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
  
  return (
    <Box>
      <SubTitle name="揪團細節"/>
      <Paper elevation={3} sx={{ marginRight: "20%", marginLeft: "20%", borderRadius: "10px" }}>
        <Box
          sx={{
            //display: 'flex',
            marginRight: "5%",
            marginLeft: "5%",
            marginBottom:"3%",
            padding: "3%",
            textAlign: "center",
          }}
        >
          
          
          <Stack sx={{ width: "100%", }} spacing={2}>
         
            <div>
              <Typography sx={{color: "grey"}} variant="h6" >活動名稱</Typography>
              <Typography>{data.title}</Typography>
            </div>
            
            <div>
              <Typography sx={{color: "grey"}} variant="h6" >活動種類</Typography>
              <Typography>{judge_type(data.type)}</Typography>
            </div>

            <div>
              <Typography sx={{color: "grey"}} variant="h6">活動描述</Typography>
              <Typography>
              {data.info}
              </Typography>
            </div>

            <div>
              <Typography sx={{color: "grey"}} variant="h6" >活動目前人數</Typography>
              <Typography>{data.actual}</Typography>
            </div>

            <div>
              <Typography sx={{color: "grey"}} variant="h6" >活動人數餘額</Typography>
              <Typography>{amount}</Typography>
            </div>

            <div>
              <Typography sx={{color: "grey"}} variant="h6" >活動時間</Typography>
              <Typography>{date}</Typography>
            </div>

            <div>
              <Typography sx={{color: "grey"}} variant="h6" >活動地點</Typography>
              <Link href={`http://maps.google.com/?q=${data.location}`} target="_blank" rel="noreferrer noopenner" >{data.location}</Link>
            </div>
            <br />
            <Grid container spacing={2}>
              <Grid item xs={4}>
                  <Button variant="contained" href={"/message/"+id} target="_blank" rel="noreferrer noopenner">
                        留言板
                  </Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" type="button"  onClick={join}>加入</Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" type="button"  onClick={leave}>退出</Button>
              </Grid>
            </Grid>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}

export default GroupDetail