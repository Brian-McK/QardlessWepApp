import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Overview" />
    </ListItemButton>
    <ListSubheader component="div" inset>
      Manage Certificates
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <NoteAddIcon />
      </ListItemIcon>
      <ListItemText primary="Create Certificates" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentTurnedInIcon />
      </ListItemIcon>
      <ListItemText primary="Assign Certificates" />
    </ListItemButton>
  </React.Fragment>
);
