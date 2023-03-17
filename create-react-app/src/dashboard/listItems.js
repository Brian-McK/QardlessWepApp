import * as React from "react";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BarChartIcon from "@mui/icons-material/BarChart";
import LogoutIcon from "@mui/icons-material/Logout";
import SchoolIcon from "@mui/icons-material/School";
import { Link } from "react-router-dom";
import { ListItem } from "@mui/material";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/Auth.context";
import { useLogoutEmployeeMutation } from "../api/services/employees";
import { SharedSnackbarContext } from "../providers/SharedSnackbar.context";

export default function ListItems() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const snackBarContext = React.useContext(SharedSnackbarContext);

  const [logoutEmployee, { data, status, isLoading }] =
    useLogoutEmployeeMutation();

  const logout = useCallback(
    (e) => {
      e.preventDefault();

      const userId = {
        id: user.id,
      };

      logoutEmployee(userId)
        .unwrap()
        .then((data) => {
          if (data.isLoggedIn == false) {
            setUser(null);
            navigate("/");
            snackBarContext.openSnackbar(`Bye bye, Logged out successfully!`);
          }
        })
        .catch((error) => {
          snackBarContext.openSnackbar(
            `Ooops, something went wrong with logging out!`
          );
        });
    },
    [setUser]
  );

  return (
    <>
      <ListItem button={true} component={Link} to="/dashboard/overview">
        <ListItemButton>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Overview" />
        </ListItemButton>
      </ListItem>

      <ListItem button={true} component={Link} to="/dashboard/courses">
        <ListItemButton>
          <ListItemIcon>
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText primary="Courses" />
        </ListItemButton>
      </ListItem>

      <ListItem button={true} component={Link} to="/dashboard/certificates">
        <ListItemButton>
          <ListItemIcon>
            <WorkspacePremiumIcon />
          </ListItemIcon>
          <ListItemText primary="Certificates" />
        </ListItemButton>
      </ListItem>

      <ListItem button={true} component={Link} to="/dashboard/manage-certificates">
        <ListItemButton>
          <ListItemIcon>
            <WorkspacePremiumIcon />
          </ListItemIcon>
          <ListItemText primary="Manage Certificates" />
        </ListItemButton>
      </ListItem>

      <ListItem button={true} onClick={logout}>
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
