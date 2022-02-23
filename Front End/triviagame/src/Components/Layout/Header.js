import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import HeaderItems from "./Header-Items";
import { useHistory } from "react-router-dom";
import MenuItems from "./MenuItem";
import {useDispatch} from 'react-redux'
import { authActions } from "../../Store/auth-store";

const pages = ["Global Ranks", "History", "Take a quiz", "Sign up"];

const ResponsiveAppBar = () => {
  // const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openMenu,setOpenMenu] = React.useState(false);
  const isAuthenticated = localStorage.getItem("isLoggedIn")

  let authentication = "Sign in";
  if (isAuthenticated) authentication = "Sign out";
  else authentication = "Sign in";
  
  const settings = [authentication];
  const history = useHistory();
  const dispatch = useDispatch();

  const handleOpenUserMenu = (event) => {
    setOpenMenu(state => !state);
    // setAnchorElUser((event.currentTarget));
  };

  const menuLogoClickHandler = () => {
    setOpenMenu(state => !state);
  };

  const menuItemClickHandler = (menuName) =>{
    if(menuName === "Sign in")
      history.push("/login");
    else if (menuName === 'Sign out'){
      dispatch(authActions.logout())
      history.push("/")
    }
      
  }

  const logoClickHandler = () => {
    history.push("/");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            onClick={logoClickHandler}
          >
            Trivia
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <HeaderItems page={page} key={Math.random()} />
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={menuLogoClickHandler} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              // anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(openMenu)}
              onClose={menuLogoClickHandler}
            >
              {settings.map((setting) => (
                <MenuItems key={setting}  setting ={setting} onClickHandler = {menuItemClickHandler}/>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
