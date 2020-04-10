import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Card, CardActions, Typography, CardActionArea, FormHelperText } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(2)
  }
}));

export default function Browse() {
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const handleChange = event => {
    setAge(event.target.value);
  };
  return (
    <Card>
      <CardActionArea>
        <Typography variant="h5" className={classes.margin}>
          جستجو در نیازهای اعلام شده
            </Typography>
        <Typography variant="h3">

        </Typography>
      </CardActionArea>
      <CardActions>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-helper-label">شهر</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={age}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>--</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          <FormHelperText>شهر مورد نظر را انتخاب کنید</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-helper-label">فوریت  نیاز</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={age}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>--</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          <FormHelperText>فوریت نیازهای اعلام شده </FormHelperText>
        </FormControl>
      </CardActions>
    </Card>
  );
}
