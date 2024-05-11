import React, { useState } from "react";
import css from "../css/Team.module.css";
import style from "../css/Modal.module.css";
import sprite from "../images/sprite.svg";
import profileImage from "../images/3135715.png";
import { useDispatch } from "react-redux";
import {
  deleteMember,
  editMember,
  sortByMemberName,
} from "../redux/teamReducer";
import Modal from "./Modal";

const MembersTable = ({ arrayOfMembers, teamId }) => {
  const [selectedMember, setSelectedMember] = useState(null);
  const dispatch = useDispatch();
  const [sortDirections, setSortDirections] = useState({
    byName: "asc",
  });

  const handleDeleteMember = (id) => {
    dispatch(deleteMember({ id, teamId }));
  };

  const handleEditMember = (id) => {
    setSelectedMember(id);
  };

  const handleClickSortMember = () => {
    const currentDirection = sortDirections["byName"];
    const nextDirection = currentDirection === "asc" ? "desc" : "asc";
    setSortDirections((prevSortDirections) => ({
      ...prevSortDirections,
      byName: nextDirection,
    }));
    dispatch(sortByMemberName({ teamId, nextDirection }));
  };

  const handleSumbitForm = (event) => {
    event.preventDefault();
    const newName = event.target.elements.newName.value;

    dispatch(editMember({ id: selectedMember, newName, teamId }));
    setSelectedMember(null);
  };

  return (
    <>
      <table className={css.membersTable} border={1} frame="void" rules="rows">
        <thead>
          <tr>
            <th className={css.headerCell}>
              Team member
              <svg className={css.svgSorting} onClick={handleClickSortMember}>
                <use href={`${sprite}#icon-arrow-sort`} />
              </svg>
            </th>
            <th className={css.headerCell}>Role</th>
            <th className={css.headerCell}>Product features</th>
            <th className={css.headerCell}>Accounts</th>
          </tr>
        </thead>
        <tbody>
          {arrayOfMembers.length > 0
            ? arrayOfMembers.map((member, index) => (
                <tr key={index}>
                  <td>
                    <div className={css.profileWrapper}>
                      <img
                        src={profileImage}
                        alt=""
                        className={css.profileImage}
                      />
                      <div className={css.wrapperName}>
                        <span>{member.name}</span>
                        <span className={css.memberEmail}>{member.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{member.role}</td>
                  <td>{member.productFeatures}</td>
                  <td>{member.accounts}</td>
                  <td>
                    <svg
                      className={css.svgEditMember}
                      onClick={() => handleEditMember(member.id)}
                    >
                      <use href={`${sprite}#icon-pen`} />
                    </svg>
                  </td>
                  <td>
                    <svg
                      className={css.svgDeleteMember}
                      onClick={() => handleDeleteMember(member.id)}
                    >
                      <use href={`${sprite}#icon-trash`} />
                    </svg>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
      <Modal
        isOpen={selectedMember}
        onClose={() => {
          setSelectedMember(null);
        }}
      >
        <form className={style.form} onSubmit={handleSumbitForm}>
          <label className={style.labelOwner}>Enter new name</label>
          <input
            type="text"
            name="newName"
            className={style.inputOwner}
            required
          />
          <button type="submit" className={style.modalBtn}>
            Change name
          </button>
        </form>
      </Modal>
    </>
  );
};

export default MembersTable;
