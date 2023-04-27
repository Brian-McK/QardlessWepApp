import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "../Title"; 

function preventDefault(event) {
  event.preventDefault();
}

export default function ActiveCerts({ certData }) {
  const activeCerts = certData.filter((c) => c.isFrozen === false).length;

  console.log(activeCerts);

  return (
    <>
      <Title>Total Active Certs</Title>
      <Typography component="p" variant="h4">
        {certData.length}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 15 March, 2019
      </Typography>
      <div>
        <Link color="primary" href="certificates">
          View certificates
        </Link>
      </div>
    </>
  );
}
