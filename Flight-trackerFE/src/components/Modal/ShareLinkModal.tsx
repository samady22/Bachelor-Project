import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LinkIcon from "@mui/icons-material/Link";
import IconButton from "@mui/material/IconButton/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Checkbox } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "5px",
  boxShadow: 24,
  p: 3,
};

export default function ShareLinkModal(props: any) {
  const handleClose = () => props.setOpen(false);
  const [checkLogin, setCheckLogin] = React.useState(false);
  return (
    <div>
      <Modal
        keepMounted
        open={props.open}
        onClose={handleClose}
        aria-labelledby="flight-detail_share-modal"
        aria-describedby="flight-detail_share-modal"
      >
        <Box sx={style}>
          <IconButton sx={{ ml: "94%", mt: "-10%" }} onClick={handleClose}>
            <CloseIcon fontSize="small"></CloseIcon>
          </IconButton>
          <Typography
            id="flight-detail_share-modal-title"
            variant="h6"
            component="h2"
          >
            {`Share flight '${props.flight.number}'`}
          </Typography>
          <Typography id="flight-detail_share-modal-description" sx={{ mt: 2 }}>
            By sharing this link you allow others to access these flight
            details.
          </Typography>
          <div>
            <b>User must be signed in </b>
            <Checkbox
              onChange={(e) => {
                setCheckLogin(e.target.checked);
              }}
            />
          </div>
          <Button
            sx={{ mt: 2 }}
            startIcon={<LinkIcon />}
            size="small"
            variant="outlined"
            onClick={() => {
              navigator.clipboard.writeText(
                `localhost:3000/flight/share/?share_id=${props.flight.share_id}`
              );
            }}
          >
            Copy link
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
