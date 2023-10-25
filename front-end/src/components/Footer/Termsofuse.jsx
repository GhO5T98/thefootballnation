import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Termsofuse = () => {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType === "paper" ? "paper" : "body");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  return (
    <div>
      {" "}
      <h1
        disableripple="true"
        style={{
          textDecoration: "none",
          color: "white",
          fontSize: "1rem",
          textAlign: "center",
          cursor: "pointer",
        }}
        onClick={handleClickOpen("paper")}
      >
        Terms Of Use
      </h1>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle
          style={{ backgroundColor: "#252525", color: "#f5f5f5" }}
          id="scroll-dialog-title"
        >
          Terms Of Use
        </DialogTitle>
        <DialogContent
          style={{ backgroundColor: "#333333" }}
          dividers={scroll === "paper"}
        >
          <DialogContentText
            style={{ color: "#f5f5f5" }}
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {[...new Array(50)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
              )
              .join("\n")}
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ backgroundColor: "#252525", color: "#f5f5f5" }}>
          <Button style={{ color: "#f0705a" }} onClick={handleClose}>
            Agree
          </Button>
          <Button style={{ color: "#f0705a" }} onClick={handleClose}>
            Disagree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Termsofuse;
