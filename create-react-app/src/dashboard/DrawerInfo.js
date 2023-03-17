import { Stack } from "@mui/system";
import { Avatar } from "@mui/material";
import Typography from "@mui/material/Typography";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © Qardless "}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function DrawerInfo({ isDrawerOpen }) {
  return (
    <>
      <Stack
        spacing={2}
        sx={{
          alignItems: "center",
          padding: "24px",
          marginTop: "auto"
        }}
      >
        {isDrawerOpen == true ? (
          <>
            <Avatar
              src="qardless_logo.png"
              sx={{ width: 170, height: 170, mb: 2 }}
            />
            <Copyright />
          </>
        ) : (
          <Avatar
            src="qardless_logo.png"
            sx={{ width: 60, height: 60, mb: 2 }}
          />
        )}
      </Stack>
    </>
  );
}
