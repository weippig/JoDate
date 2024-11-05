import SignIn from './components/signin.js'
import * as React from 'react';
import { Box, Grid, Stack, InputLabel,MenuItem, FormControl, Select, Link } from '@mui/material';
import GroupItem from './components/groupItem.js';
import Loading from './components/loading.js';
import Cookies from 'js-cookie';
import axios from 'axios';
import Swal from 'sweetalert2';


function Home() {
  const url = process.env.REACT_APP_BACKEND_URL
  const [category, setCategory] = React.useState("")
  const [allData, setAllData] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  function axios_ask(type) {
    axios.post(url + '/group/all', {"type":type})
    .then(function (response) {
      setAllData(response.data.groups)
      setIsLoading(false)
    })
    .catch(function (error) {
      Swal.fire({
        icon: 'error',
        text: '系統出現錯誤',
        confirmButtonColor: 'grey',
      })
    });
  }

  React.useEffect(() => {
    axios_ask("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <Loading />
    )
  }

  const handleChange = (event) => {
    setCategory(event.target.value);
    axios_ask(event.target.value);
  };

  return (
    <Box
          sx={{
            display: 'flex',
            textAlign: 'center',
            marginRight: "20%",
            marginLeft: "20%",
            marginTop: "3%", marginBottom:"3%"
          }}
        >
        <Stack sx={{ width: "100%", }} spacing={2}>
            <Box sx={{width: "20%"}}>
              <FormControl fullWidth size="small">
                <InputLabel>類別</InputLabel>
                <Select
                  value={category}
                  label="類別"
                  onChange={handleChange}
                >
                  <MenuItem value={""}>不分類</MenuItem>
                  <MenuItem value={"A"}>聯誼</MenuItem>
                  <MenuItem value={"C"}>拼車</MenuItem>
                  <MenuItem value={"B"}>打球</MenuItem>
                  <MenuItem value={"D"}>叫外送</MenuItem>
                  <MenuItem value={"O"}>其他</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box>
              <Grid container>
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
                  查看詳情
                </Grid>
              </Grid>
            </Box>
              
            
            {
              allData.map((data) => {
                let cat=""
                if (data.type==="A")
                {
                  cat="聯誼"
                }
                else if (data.type==="B")
                {
                  cat="打球"
                }
                else if (data.type==="C")
                {
                  cat="拼車"
                }
                else if (data.type==="D")
                {
                  cat="叫外送"
                }
                else if (data.type==="O")
                {
                  cat="其他"
                }
                else{
                  cat="其他"
                }
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
                      {cat}
                    </Grid>
                    <Grid item xs={4}>
                      {data.date.replace(/T/g, "/").replace(/Z/g, "")}
                    </Grid>
                    <Grid item xs={2}>
                      <Link underline="hover" href={"/groupdetail/"+data.id} target="_blank" rel="noreferrer noopenner">
                        查看詳情
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



function HomePage() {
  //const userLogged = localStorage.getItem('login')

  return (Cookies.get('Log_in_ID')!=null)
  ? <Home />
  : <SignIn />
}
export default HomePage;