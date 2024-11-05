import * as React from "react";
import dayjs from './utils/dayjs'
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Tooltip from '@mui/material/Tooltip';
import SubTitle from "./components/subtitle";
import { Typography } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';
import axios from 'axios';
import Swal from 'sweetalert2'


export default function CreateGroup() {
  const url = process.env.REACT_APP_BACKEND_URL

  const [groupName, setGroupName] = React.useState("")
  const [describe, setDesceibe] = React.useState("")
  const [place, setPlace] = React.useState("")
  const [category, setCategory] = React.useState("")
  const [minnum, setMinNum] = React.useState("")
  const [maxnum, setMaxNum] = React.useState("")
  const [time, setTime] = React.useState(dayjs())
  const [warning, setWarning] = React.useState("")

  let CreateGroup_Data=
  {
    "uid":"",
    "title":"",
    "type":"",
    "location":"",
    "info":"",
    "date":"",
    "min_require":"",
    "max_require":""
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


  const handleSubmit = () => {
    console.log(time.add(8, 'hours').utc().format('YYYY-MM-DD HH:mm:ss'))
    CreateGroup_Data.uid=getCookie("Log_in_ID");
    CreateGroup_Data.title=groupName;
    CreateGroup_Data.type=category;
    CreateGroup_Data.location=place;
    CreateGroup_Data.info=describe;
    CreateGroup_Data.date=time.add(8, 'hours').utc().format('YYYY-MM-DD HH:mm:ss');
    CreateGroup_Data.min_require=minnum.toString();
    CreateGroup_Data.max_require=maxnum.toString();

    if (CreateGroup_Data.type==="聯誼")
    {
      CreateGroup_Data.type="A";
    }
    else if (CreateGroup_Data.type==="打球")
    {
      CreateGroup_Data.type="B";
    }
    else if (CreateGroup_Data.type==="拼車")
    {
      CreateGroup_Data.type="C";
    }
    else if (CreateGroup_Data.type==="拼外送")
    {
      CreateGroup_Data.type="D";
    }
    else if (CreateGroup_Data.type==="其他")
    {
      CreateGroup_Data.type="O";
    }
    else
    {
      Swal.fire({
        icon: 'warning',
        text: '類別格式有誤',
        confirmButtonColor: 'grey',
      })
    }


    if( groupName.length===0 || describe.length===0 || place.length===0 || category.length===0 ) {
      setWarning("欄位不得為空")
    } else if (minnum>maxnum) {
      setWarning("人數下限不得大於人數上限")
    } else if (time.diff(dayjs(), "minute") <= 30) {
      setWarning("揪團時間至少半小時後")
    } else {
      setWarning("")
      axios.post(url + '/group/create', CreateGroup_Data)
      .then(function (response) {
        Swal.fire({
          icon: 'success',
          text: '創建活動完成',
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

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value)
  }

  const handleDescribeChange = (event) => {
    setDesceibe(event.target.value)
  }

  const handlePlaceChange = (event) => {
    setPlace(event.target.value)
  }

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleMinNumChange = (event) => {
    setMinNum(event.target.value);
  };

  const handleMaxNumChange = (event) => {
    setMaxNum(event.target.value);
  };


  const categories = [
    "聯誼",
    "打球",
    "拼車",
    "拼外送",
    "其他",
  ];

  return (
    <React.Fragment>
      <SubTitle name="發起揪團"/>
      <Paper elevation={3} sx={{ marginRight: "20%", marginLeft: "20%", borderRadius: "10px"  }}>
        <Box sx={{ padding: 5 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <Tooltip title="最多30個字" arrow placement="bottom-end">
                <TextField
                  fullWidth
                  size="small"
                  label="揪團名稱" variant="outlined"
                  onChange={handleGroupNameChange}
                  inputProps={{ maxLength: 30 }}
                />
              </Tooltip>
            </Grid>
            
            <Grid item xs={12} sm={12}>
              <Tooltip title="最多300個字" arrow placement="bottom-end">
                <TextField
                  multiline
                  fullWidth
                  size="small"
                  rows={3}
                  label="描述" variant="outlined"
                  onChange={handleDescribeChange}
                  inputProps={{ maxLength: 300 }}
                />
              </Tooltip>
            </Grid>

            <Grid item xs={12} sm={12}>
              <Tooltip title="最多50個字" arrow placement="bottom-end">
                <TextField
                  fullWidth
                  size="small"
                  label="地點" variant="outlined"
                  onChange={handlePlaceChange}
                  inputProps={{ maxLength: 50 }}
                />
              </Tooltip>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">類別</InputLabel>
                <Select
                  label="類別"
                  value={category}
                  onChange={handleCategoryChange}
                >
                  {categories.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={3}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">人數下限</InputLabel>
                <Select
                  label="人數下限"
                  value={minnum}
                  onChange={handleMinNumChange}
                >
                  {[...Array(30).keys()].map((item) => (
                    <MenuItem value={item+1}>{item+1}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={3}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">人數上限</InputLabel>
                <Select
                  label="人數上限"
                  value={maxnum}
                  onChange={handleMaxNumChange}
                >
                  {[...Array(30).keys()].map((item) => (
                    <MenuItem value={item+1}>{item+1}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimeField
                  label="時間"
                  fullWidth
                  size="small"
                  value={time}
                  onChange={(newValue) => setTime(newValue)}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={12} sx={{ textAlign: 'center'}}>
              <Typography variant="caption" display="block" sx={{ color: "red" }}>
                {warning}
              </Typography>
              <Button variant="contained" sx={{ color: "white" }} onClick={handleSubmit}>
                建立揪團
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </React.Fragment>
  );
}
