import React, { useState, useRef, useEffect } from "react";
import sprite from "../images/sprite.svg";
import Modal from "./Modal";
import css from "../css/Modal.module.css";
import { useDispatch } from "react-redux";
import { addNewMember, deleteTeam } from "../redux/teamReducer";
import { nanoid } from "nanoid";

const MyPopover = ({ team }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const popoverRef = useRef(null);
  const [popoverModalIsOpen, setPopoverModalIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    const rect = event.target.getBoundingClientRect();
    setPosition({
      x: rect.left,
      y: rect.top,
    });
    setIsVisible(!isVisible);
  };

  const handleClickOutside = (event) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOpenPopoverModal = () => {
    setPopoverModalIsOpen(!popoverModalIsOpen);
    setIsVisible(false);
  };

  const handleDeleteTeam = () => {
    dispatch(deleteTeam({ team }));
    setIsVisible(false);
  };

  const handleAddMemberSubmit = (event) => {
    event.preventDefault();

    const id = nanoid();
    const name = event.target.elements.memberName.value;
    const email = event.target.elements.memberEmail.value;
    const role = event.target.elements.role.value;
    const productFeatures = event.target.elements.features.value;
    const accounts = event.target.elements.accounts.value;

    const memberData = {
      id,
      name,
      email,
      role,
      productFeatures,
      accounts,
    };

    dispatch(addNewMember({ teamId: team.id, memberData }));
    handleOpenPopoverModal();
    setIsVisible(false);
  };

  return (
    <div ref={popoverRef} className={css.mainPopover}>
      <svg className={css.svgDots} onClick={handleClick}>
        <use href={`${sprite}#icon-dots-vertical`} />
      </svg>
      {isVisible && (
        <div
          className={css.containerPopover}
          style={{
            position: "absolute",
            left: `${position.x}px`,
            top: `${position.y + 20}px`,
            backgroundColor: "white",
          }}
        >
          <button
            type="button"
            onClick={handleOpenPopoverModal}
            className={css.popoverBtn}
          >
            <svg className={css.svgInviteMember}>
              <use href={`${sprite}#icon-profile`} />
            </svg>
            Invite member
          </button>
          <button
            type="button"
            onClick={handleDeleteTeam}
            className={`${css.destructivePopoverBtn} ${css.popoverBtn}`}
          >
            <svg className={css.svgDeleteTeam}>
              <use href={`${sprite}#icon-trash`} />
            </svg>
            Delete team
          </button>
        </div>
      )}
      {popoverModalIsOpen && (
        <Modal isOpen={popoverModalIsOpen} onClose={handleOpenPopoverModal}>
          <form className={css.form} onSubmit={handleAddMemberSubmit}>
            <label className={css.labelName}>Your name</label>
            <input
              type="text"
              name="memberName"
              className={css.inputName}
              required
            />

            <label className={css.labelName}>Your email</label>
            <input
              type="email"
              name="memberEmail"
              className={css.inputName}
              required
            />

            <div className={css.inputRadioWrapper}>
              <div>
                <label className={css.labelOwner}>Your role</label>
                <div className={css.containerInput}>
                  <input
                    type="radio"
                    name="role"
                    value="Member"
                    required
                    className={css.inputRadio}
                  />
                  <span id="radioLabel1">Member</span>
                </div>

                <div className={css.containerInput}>
                  <input
                    type="radio"
                    name="role"
                    value="Owner"
                    required
                    className={css.inputRadio}
                  />
                  <span id="radioLabel1">Owner</span>
                </div>
              </div>

              <div>
                <label className={css.labelOwner}>Product features</label>
                <div className={css.containerInput}>
                  <input
                    type="radio"
                    name="features"
                    value="Limited access"
                    required
                    className={css.inputRadio}
                  />
                  <span id="radioLabel1">Limited access</span>
                </div>

                <div className={css.containerInput}>
                  <input
                    type="radio"
                    name="features"
                    value="Full access"
                    required
                    className={css.inputRadio}
                  />
                  <span id="radioLabel1">Full access</span>
                </div>
              </div>
            </div>

            <label className={css.labelOwner}>Accounts</label>
            <input
              type="number"
              name="accounts"
              className={css.inputOwner}
              min={1}
              required
            />
            <button type="submit" className={css.modalBtn}>
              Add
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default MyPopover;
