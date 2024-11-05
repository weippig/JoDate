import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import { Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

export default function HideAppBar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  function handleClick(event) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  }

  function handleClose() {
    setAnchorEl(null);
  }
  function deleteCookie(cookieName) {
    document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  function logout() {
    deleteCookie("Log_in_ID");
    //localStorage.clear()
    window.location.reload(true)
  }

  const MyMenuItem = ({ to, name }) => {
  
    const navigate = useNavigate();
  
    return (
        <MenuItem onClick={() => 
            { navigate(`/${to}`) }}>
            {name}
        </MenuItem>
    )
  }

  function CreateGroupButton() {
    //const isLoggedIn = localStorage.getItem('login')
    const isLoggedIn = (Cookies.get('Log_in_ID')!=null)
    if (isLoggedIn) {
      return (
        <Button onClick={() => { navigate('/creategroup') }}>
            發起揪團
        </Button>
      )
    }
    return <div></div>;
  }

  function Drawer() {
    //const isLoggedIn = localStorage.getItem('login')
    const isLoggedIn = (Cookies.get('Log_in_ID')!=null)
    if (isLoggedIn) {
      return (
        <div>
              <Button onClick={handleClick} onMouseOver={handleClick} >
                我的個人檔案
              </Button>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                MenuListProps={{ onMouseLeave: handleClose }}
              >
                <MyMenuItem to='profile' name='個人檔案' />
                <MyMenuItem to='mygroup' name='我的揪團'/>
                <MyMenuItem to='edit' name='修改資料'/>
                <MenuItem onClick={logout}>登出</MenuItem>
              </Menu>
            </div>
      )
    }
    return <div></div>;
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar color="primaryLight">
          <Toolbar sx={{ justifyContent: "space-between" }}>

            { CreateGroupButton() }
            
            <Typography variant="h5"  sx={{fontWeight: 'bold',cursor:'pointer', userSelect:'none'}} onClick={() => { navigate('/') }} >
              揪 Date
            </Typography>


            { Drawer() }
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </React.Fragment>
  );
}

