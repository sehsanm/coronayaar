import React from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  FormHelperText,
  MenuItem,
  Container
} from "@material-ui/core";
import ErrorDisplay from "./ErrorDisplay";
import moment from "moment";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import JalaliUtils from "@date-io/jalaali";
import jMoment from "moment-jalaali";
import NumberUtil from './NumberUtil' ; 
jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%" // Fix IE 11 issue.
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  elements: {
    margin: theme.spacing(2)
  }
}));

function StaticForm(props) {
  const classes = useStyles();

  function getFieldGrid(field) {
    let controls = getFieldInput(field);
    return (
      <Grid item xs={12}>
        {controls}
      </Grid>
    );
  }

  function getSelectItems(field) {
    let ops = [];
    if (field.options) ops = field.options;
    if (field.dynamicOptions) {
      ops = props.optionProvider(field.name);
      console.log("dynamic options:", ops);
    }
    let ret = ops.map(i => (
      <MenuItem key={field.name + i.value} value={i.value}>
        {i.label}
      </MenuItem>
    ));
    console.log(ret);
    return ret;
  }

  function getFieldInput(field) {
    if (field.options || field.dynamicOptions) {
      return (
        <FormControl className={classes.formControl} fullWidth>
          <InputLabel>{field.label}</InputLabel>
          <Select
            value={props.value[field.name] || ""}
            onChange={e => props.onChange(field.name, e.target.value)}
          >
            {getSelectItems(field)}
          </Select>
          <FormHelperText>{field.helper}</FormHelperText>
        </FormControl>
      );
    } else {
      if (field.type === "text") {
        return (
          <TextField
            className={classes.elements}
            required
            fullWidth
            label={field.label}
            autoFocus
            value={props.value[field.name]}
            onChange={e => props.onChange(field.name, e.target.value)}
          />
        );
      }
      if (field.type === "number") {
        return (
          <TextField
            className={classes.elements}
            required
            fullWidth
            label={field.label}
            autoFocus
            value={props.value[field.name]}
            onChange={e => {
              let fixed = NumberUtil.fixNumbers(e.target.value) ; 
              if (isFinite(parseInt(fixed)))
                props.onChange(field.name, parseInt(fixed));
            }}
          />
        );
      }
      if (field.type === "longtext") {
        return (
          <TextField
            className={classes.elements}
            required
            fullWidth
            label={field.label}
            autoFocus
            multiline
            rows="4"
            value={props.value[field.name]}
            onChange={e => props.onChange(field.name, e.target.value)}
          />
        );
      }

      if (field.type === "date") {
        return (
          <DatePicker
            clearable
            fullWidth
            label={field.label}
            okLabel="تأیید"
            cancelLabel="لغو"
            clearLabel="پاک کردن"
            labelFunc={date => (date ? date.format("jYYYY/jMM/jDD") : "")}
            value={props.value[field.name] || moment()}
            onChange={e => props.onChange(field.name, e)}
          />
        );
      }
    }
  }

  function getFormBody() {
    let components = props.form.fields.map(field => {
      return getFieldGrid(field);
    });
    return components;
  }
  console.log("Latest value:", props.value);
  return (
    <Container component="main" maxWidth="xs">
      <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
        <CssBaseline />
        <div className={classes.paper}>
          {props.avatar && <Avatar className={classes.avatar}></Avatar>}
          {props.title && <Typography variant="h6" className={classes.elements}>{props.title}</Typography>}
          {props.subTitle && <Typography variant="h7" className={classes.elements}>{props.subTitle}</Typography>}
          <ErrorDisplay errors={props.errors} />
          <Grid container spacing={2}>
            {getFormBody()}
          </Grid>
        </div>
      </MuiPickersUtilsProvider>
    </Container>
  );
}

export default StaticForm;
