import HideAppBar from './components/header.js'
import { Routes, Route, BrowserRouter } from "react-router-dom"
import HomePage from "./Home"
import Register from "./Register"
import Profile from "./Profile"
import MyGroup from "./MyGroup"
import Edit from './Edit.js'
import { Box } from '@mui/material'
import PageNotFound from './PageNotFound'
import CreateGroup from './CreateGroup.js'
import GroupDetail from './GroupDetail.js'
import MessageBoard from './MessageBoard.js'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AuthWrapper from './components/authchecker.js'
import GoTop from './components/buttonToTop.js';

const theme = createTheme({
  palette: {
    primary: {
      main: "#2a9461"
    },
    secondary: {
      main: "#494c7d"
    },
    primaryLight: {
      main: "#dbece2",
      contrastText: "#616161"
    }
  }
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <Box
            sx={{
              width: 1,
              justifyContent: 'center',
            }}
          >
        <BrowserRouter>
        <HideAppBar />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="register" element={<Register />} />
            
            <Route element={<AuthWrapper />}>

              <Route path="mygroup" element={<MyGroup />} />
              <Route path="profile" element={<Profile />} />
              <Route path="edit" element={<Edit/>} />
              <Route path="creategroup" element={<CreateGroup />} />
              <Route path="groupdetail/:id" element={<GroupDetail />}/>
              <Route path="message/:id" element={<MessageBoard />} /> 
            </Route>
            
            <Route path="*" element={<PageNotFound />} /> 
        </Routes>
        <GoTop />
      </BrowserRouter>
     </Box>
     </ThemeProvider>
    </div>
  );
}

export default App;
