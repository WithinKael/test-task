import React, { useState } from "react";
import sprite from "../images/sprite.svg";
import css from "../css/Team.module.css";
import TeamModal from "../components/TeamModal";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTeamsData,
  sortByDate,
  sortByMembers,
  sortByTeamName,
} from "../redux/teamReducer";
import MembersTable from "../components/MembersTable";
import MyPopover from "../components/MyPopover";

const Team = () => {
  const [isOpen, setIsOpen] = useState(-1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [sortDirections, setSortDirections] = useState({
    byName: "asc",
    byMembers: "asc",
    byDate: "asc",
  });

  const arrayOfTeams = useSelector(selectTeamsData);

  const dispatch = useDispatch();

  const handleOpenTable = (team, index) => {
    setIsOpen((prevValue) => (team.id === prevValue ? -1 : team.id));
  };

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleSortingClick = (key) => {
    const currentDirection = sortDirections[key];
    const nextDirection = currentDirection === "asc" ? "desc" : "asc";
    setSortDirections((prevSortDirections) => ({
      ...prevSortDirections,
      [key]: nextDirection,
    }));

    switch (key) {
      case "byName":
        dispatch(sortByTeamName(nextDirection));
        break;
      case "byMembers":
        dispatch(sortByMembers(nextDirection));
        break;
      case "byDate":
        dispatch(sortByDate(nextDirection));
        break;
      default:
        console.log("Nothing");
    }
  };

  return (
    <div className={css.mainWrapper}>
      <div className={css.btnAddTeamWrapper}>
        <h2 className={css.teamTitle}>Team</h2>
        <button onClick={handleOpenModal} className={css.btnModal}>
          Add a new team
        </button>
      </div>

      <div style={{ overflowX: "auto", width: "100%" }}>
        <table className={css.mainTable}>
          <thead>
            {arrayOfTeams.length > 0 ? (
              <tr>
                <th></th>
                <th className={css.headerCell}>
                  Team Name
                  <svg
                    className={css.svgSorting}
                    onClick={() => handleSortingClick("byName")}
                  >
                    <use href={`${sprite}#icon-arrow-sort`} />
                  </svg>
                </th>
                <th className={css.headerCell}>
                  Members
                  <svg
                    className={css.svgSorting}
                    onClick={() => handleSortingClick("byMembers")}
                  >
                    <use href={`${sprite}#icon-arrow-sort`} />
                  </svg>
                </th>
                <th className={css.headerCell}>Team owner</th>
                <th className={css.headerCell}>
                  Created
                  <svg
                    className={css.svgSorting}
                    onClick={() => handleSortingClick("byDate")}
                  >
                    <use href={`${sprite}#icon-arrow-sort`} />
                  </svg>
                </th>
              </tr>
            ) : null}
          </thead>
          <tbody>
            {arrayOfTeams.length > 0
              ? arrayOfTeams.map((team, index) => (
                  <React.Fragment key={index}>
                    <tr className={css.teamTable}>
                      <td>
                        {team.members.length > 0 && (
                          <button
                            className={
                              isOpen === team.id
                                ? css.openBtnTable
                                : css.arrowBtn
                            }
                            onClick={() => handleOpenTable(team)}
                          >
                            <svg className={css.svgArrow}>
                              <use href={`${sprite}#icon-arrow`} />
                            </svg>
                          </button>
                        )}
                      </td>
                      <td>{team.teamName}</td>
                      <td>{team.members.length} members</td>
                      <td>{team.owner}</td>
                      <td>
                        {new Date(team.created)
                          .toLocaleDateString()
                          .replaceAll(".", "/")}
                      </td>
                      <td>
                        <MyPopover team={team} />
                      </td>
                    </tr>
                    {isOpen === team.id && team.members.length > 0 && (
                      <tr className={css.trTeamMembers}>
                        <td colSpan={6} className={css.tdTeamMembers}>
                          <MembersTable
                            arrayOfMembers={team.members}
                            teamId={team.id}
                          />
                        </td>
                      </tr>
                    )}
                    <div className={css.rowSpace}></div>
                  </React.Fragment>
                ))
              : null}
          </tbody>
        </table>
      </div>
      {modalIsOpen ? (
        <TeamModal handleCloseModal={handleCloseModal} isOpen={isOpen} />
      ) : null}
    </div>
  );
};

export default Team;
