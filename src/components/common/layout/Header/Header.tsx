import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import useStyles from "./Header.styles";

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Idoven.ai Coding Challenge
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
