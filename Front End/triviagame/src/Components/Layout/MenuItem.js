import { MenuItem, Typography } from "@mui/material";

const MenuItems = (props) => {
  
    const menuClickHandler = () =>{
        props.onClickHandler(props.setting);
    }
  
    return (
    <MenuItem onClick={menuClickHandler}>
      <Typography textAlign="center">{props.setting}</Typography>
    </MenuItem>
  );
};

export default MenuItems;
