import React from "react";
import PropTypes from "prop-types";
import { Avatar, Select, MenuItem, Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  menuItem: {
    display: "flex",
    flexDirection: "row",
  },
  avatar: {
    fontSize: "12px",
    fontWeight: "bold",
    backgroundColor: "#1a76d2",
  },
  menuText: {
    padding: "10px",
  },
});

export function Dropdown(props) {
  const { data, withQuote, onSelect } = props;
  const classes = useStyles();
  return (
    <Box display="flex" justifyContent="center">
      <Select value="label">
        <MenuItem value="label">Select Cryptocurrency to add quote</MenuItem>
        {data?.map((curr) => {
          return !withQuote?.includes(curr.id) ? (
            <MenuItem
              onClick={() => onSelect(curr.id)}
              key={`curr-${curr.id}`}
              value={curr.id}
            >
              <span className={classes.menuItem}>
                <Avatar className={classes.avatar}>{curr.symbol}</Avatar>
                <span className={classes.menuText}>{curr.name}</span>
              </span>
            </MenuItem>
          ) : null;
        })}
      </Select>
    </Box>
  );
}

Dropdown.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      symbol: PropTypes.string,
    })
  ),
  withQuote: PropTypes.arrayOf(PropTypes.number),
  onSelect: PropTypes.func,
};
