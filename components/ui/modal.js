import React, { useContext } from "react";
import ReactDOM from "react-dom";
import AuthFormContext from "../../store/auth-context";
import classes from "./modal.module.css";

const Backdrop = (props) => {
  const modalCtx = useContext(AuthFormContext);
  const onClickHandler = modalCtx.isShown
    ? modalCtx.hideAuthForm
    : props.onClose;
  return <div className={classes.backdrop} onClick={onClickHandler} />;
};

const ModalOverlay = (props) => {
  const modalClasses = props.isSearch ? classes["search-modal"] : classes.modal;
  return (
    <div className={modalClasses}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  if (typeof window === "undefined") {
    return null;
  }
  const portalElement = document.getElementById("modal-overlay");
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay isSearch={props.isSearch}>{props.children}</ModalOverlay>,
        portalElement
      )}
    </React.Fragment>
  );
};

export default Modal;
