import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
  import InputLabel from '@material-ui/core/InputLabel';
  import MenuItem from '@material-ui/core/MenuItem';
  import FormControl from '@material-ui/core/FormControl';
  import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { Paper, Card, CardActions, Typography, CardActionArea, FormHelperText } from '@material-ui/core';

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

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
