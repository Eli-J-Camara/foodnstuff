import { PropsWithChildren } from 'react';
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const BackDrop = (props: {click: () => void;}) => {
  return <div className={classes.backdrop} onClick={props.click} />;
};

const ModalOverlay = (props: PropsWithChildren) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

interface modalPropTypes extends PropsWithChildren {
  onBackdropClick: () => void;
}

const Modal = (props: modalPropTypes) => {
  return (
    <>
      {portalElement && ReactDOM.createPortal(<BackDrop click={props.onBackdropClick} />, portalElement)}
      {portalElement && ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
