import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { FormControl } from "@mui/material";
import { useState } from "react";

const QuizOption = (props) => {
  const [value, setValue] = useState("");
  const menuItems = [];

  const handleChange = (event) => {
    setValue(event.target.value);
    props.onOptionSelect(props.name, event.target.value);
  };

  props.options.map((option) => {
    return menuItems.push(
      <MenuItem value={option.val} key={Math.random()}>
        {option.name}
      </MenuItem>
    );
  });

  return (
    <FormControl sx={{ minWidth: "50%", m: 1 }}>
      <InputLabel id="value">{props.name}</InputLabel>
      <Select
        labelId="value"
        id="value"
        value={value}
        label={props.name}
        onChange={handleChange}
      >
        {menuItems}
      </Select>
    </FormControl>
  );
};

export default QuizOption;
