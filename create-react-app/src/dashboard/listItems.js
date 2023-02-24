import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import ListIcon from '@mui/icons-material/List';

export const mainListItems = (
  <React.Fragment>
    {/* Overview */}
    <ListItemButton>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Overview" />
    </ListItemButton>
    {/* Overview */}

    {/* Courses */}
    <ListSubheader component="div" inset>
      Manage Courses
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <ListIcon />
      </ListItemIcon>
      <ListItemText primary="View Courses" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <NoteAddIcon />
      </ListItemIcon>
      <ListItemText primary="Add Course" />
    </ListItemButton>
    {/* Courses */}

    {/* Certificates */}
    <ListSubheader component="div" inset>
      Manage Certificates
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <ListIcon />
      </ListItemIcon>
      <ListItemText primary="View Certificates" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentTurnedInIcon />
      </ListItemIcon>
      <ListItemText primary="Add Certificate" />
    </ListItemButton>
    {/* Certificates */}
  </React.Fragment>
);
