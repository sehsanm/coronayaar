import React, { useState } from "react";
import { makeStyles, withStyles, lighten } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import { LocalHospital , Info,  SupervisorAccount } from "@material-ui/icons";
import RoomIcon from '@material-ui/icons/Room';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import PhoneIcon from '@material-ui/icons/Phone';
import LinearProgress from '@material-ui/core/LinearProgress';
import ObjectUtil from '../../components/ObjectUtil' ; 
import RequestUtil from './RequestUtil' ; 
const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 600,
    margin: theme.spacing(1),
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  },
  info: {
    textAlign: 'right',
    margin: theme.spacing(1),
    verticalAlign: 'middle',
  },
  margin: {
    margin: theme.spacing(1),
  },
  infoIcons: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  }
}));

const BorderLinearProgress = withStyles({
  root: {
    height: 10,
    backgroundColor: lighten('#ff6c5c', 0.5),
  },
  bar: {
    borderRadius: 20,
    backgroundColor: '#ff6c5c',
  },
})(LinearProgress);

export default function RequestCard(props) {
  const classes = useStyles();
  console.log('Actions:', props.actions);

  return (
    <Card className={classes.root} variant="elevation" elevation={3} >
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <LocalHospital />
          </Avatar>
        }

        title={props.request.quantity + props.request.type}
        subheader={ObjectUtil.fromNow(props.request.createdDate)}
      />
      <CardMedia>
        <BorderLinearProgress
          className={classes.margin}
          variant="determinate"
          color="secondary"
          value={((props.request.totalPledged * 100) / (props.request.quantity + 0.001))}

        />
        <Typography variant="body2" component="p" className={classes.margin}>
          تا کنون {props.request.totalPledged || 'صفر'} مورد تقبل شده است.
        </Typography>
      </CardMedia>
      <CardContent>
          
          <Typography variant="body2" component="p" className={classes.info}>
          <RoomIcon  className={classes.infoIcons}/> {props.request.org.orgProvince} - {props.request.org.orgCity}
          </Typography>

        <Typography variant="body2" component="p" className={classes.info}>
          <LocationCityIcon className={classes.infoIcons}/> مرکز درمانی: {props.request.org.orgName}
        </Typography>
        <Typography variant="body2" component="p" className={classes.info}>
          <HourglassEmptyIcon className={classes.infoIcons}/> مورد نیاز تا: {ObjectUtil.fromNow(props.request.requiredBy)}
        </Typography>
        <Typography variant="body2" component="p" className={classes.info}>
          <PhoneIcon className={classes.infoIcons}/> شماره تماس: {props.request.org.orgPhone}
        </Typography>
        <Typography variant="body2" component="p" className={classes.info}>
        <Info className={classes.infoIcons}/> توضیحات: {props.request.description}
        </Typography>
        <Typography variant="body2" component="p" className={classes.info}>
        <SupervisorAccount className={classes.infoIcons}/>  وضعیت:  {RequestUtil.convertStatus(props.request.status)}
        </Typography>
      </CardContent>
      <CardActions >
        {props.actions}
      </CardActions>

    </Card>
  );
}
