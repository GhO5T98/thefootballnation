import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Disclaimer = () => {
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
        Disclaimer
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
          Disclaimer
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
            <p>
              The information provided on The Football Nation website is for
              general informational purposes only. While we strive to provide
              accurate and up-to-date information, we make no representations or
              warranties of any kind, express or implied, about the
              completeness, accuracy, reliability, suitability or availability
              with respect to the website or the information, products,
              services, or related graphics contained on the website for any
              purpose. Any reliance you place on such information is therefore
              strictly at your own risk.
            </p>{" "}
            <p>
              In no event will we be liable for any loss or damage including
              without limitation, indirect or consequential loss or damage, or
              any loss or damage whatsoever arising from loss of data or profits
              arising out of, or in connection with, the use of this website.
            </p>{" "}
            <p>
              {" "}
              Through this website, you are able to link to other websites which
              are not under the control of Royal Real Estate. We have no control
              over the nature, content, and availability of those sites. The
              inclusion of any links does not necessarily imply a recommendation
              or endorse the views expressed within them.
            </p>{" "}
            <p>
              {" "}
              Every effort is made to keep the website up and running smoothly.
              However, we takes no responsibility for, and will not be liable
              for, the website being temporarily unavailable due to technical
              issues beyond our control.
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ backgroundColor: "#252525", color: "#f5f5f5" }}>
          <Button style={{ color: "#f0705a" }} onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Disclaimer;
