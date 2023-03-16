import * as React from "react";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BarChartIcon from "@mui/icons-material/BarChart";
import LogoutIcon from "@mui/icons-material/Logout";
import SchoolIcon from "@mui/icons-material/School";
import { Link, Outlet } from "react-router-dom";
import { ListItem } from "@mui/material";


export default function ListItems() {
  return (
    <>
      <ListItem component={Link} to="/dashboard/overview">
        <ListItemButton>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Overview" />
        </ListItemButton>
      </ListItem>

      <ListItem component={Link} to="/dashboard/courses">
        <ListItemButton>
          <ListItemIcon>
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText primary="Courses" />
        </ListItemButton>
      </ListItem>

      <ListItem component={Link} to="/dashboard/certificates">
        <ListItemButton>
          <ListItemIcon>
            <WorkspacePremiumIcon />
          </ListItemIcon>
          <ListItemText primary="Certificates" />
        </ListItemButton>
      </ListItem>

      <ListItem>
        <ListItemButton>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </ListItem>
    </>
  );
}
