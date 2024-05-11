import React, { useState } from "react";
import css from "../css/Modal.module.css";
import { setTeamData } from "../redux/teamReducer";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import Modal from "./Modal";

const TeamModal = ({ handleCloseModal, isOpen }) => {
  const [formData, setFormData] = useState(null);
  const dispatch = useDispatch();

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSumbitForm = (event) => {
    event.preventDefault();

    const myForm = {
      ...formData,
      id: nanoid(),
      created: new Date().toISOString(),
      members: [],
    };

    dispatch(setTeamData(myForm));

    handleCloseModal();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal}>
      <form onSubmit={handleSumbitForm} className={css.form}>
        <label className={css.labelName}>Team Name</label>
        <input
          type="text"
          name="teamName"
          className={css.inputName}
          required
          onChange={onInputChange}
        />
        <label className={css.labelOwner}>Owner (gmail)</label>
        <input
          type="email"
          name="owner"
          className={css.inputOwner}
          required
          onChange={onInputChange}
        />
        <button type="submit" className={css.modalBtn}>
          Add
        </button>
      </form>
    </Modal>
  );
};

export default TeamModal;
