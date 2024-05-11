import css from "../css/Modal.module.css";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className={css.Overlay}>
      <div className={css.Modal}>
        <button className={css.btnCloseModal} onClick={onClose}>
          x
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
