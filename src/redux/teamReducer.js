import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teamsMainData: [
    {
      id: 1,
      teamName: "Cool team",
      owner: "oleg@gmail.com",
      created: new Date().toISOString(),
      members: [
        {
          id: "1",
          name: "Oleg Vinnik",
          email: "olegvinnik@gmail.com",
          role: "Owner",
          productFeatures: "Full access",
          accounts: 5,
        },
        {
          id: "2",
          name: "Kyrill Shevchenko",
          email: "kyrill@gmail.com",
          role: "Member",
          productFeatures: "Limited access",
          accounts: 3,
        },
        {
          id: "3",
          name: "Serhii Anubis",
          email: "serhii@gmail.com",
          role: "Member",
          productFeatures: "Limited access",
          accounts: 7,
        },
      ],
    },
    {
      id: 2,
      teamName: "The best team",
      owner: "taras@gmail.com",
      created: new Date().toISOString(),
      members: [
        {
          id: "4",
          name: "Taras Shevchenko",
          email: "taras@gmail.com",
          role: "Owner",
          productFeatures: "Full access",
          accounts: 1,
        },
        {
          id: "5",
          name: "Valeriy Chyzhov",
          email: "valeriy@gmail.com",
          role: "Member",
          productFeatures: "Limited access",
          accounts: 2,
        },
      ],
    },
  ],
};

const teamSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    setTeamData: (state, action) => {
      state.teamsMainData = [...state.teamsMainData, action.payload];
    },
    sortByTeamName: (state, action) => {
      state.teamsMainData.sort((a, b) => {
        const x = a.teamName.toLowerCase();
        const y = b.teamName.toLowerCase();

        if (action.payload === "asc") {
          return x > y ? 1 : x < y ? -1 : 0;
        } else {
          return x < y ? 1 : x > y ? -1 : 0;
        }
      });
    },
    sortByMembers: (state, action) => {
      state.teamsMainData.sort((a, b) => {
        const membersA = a.members.length;
        const membersB = b.members.length;

        if (action.payload === "asc") {
          return membersA - membersB;
        }

        return membersB - membersA;
      });
    },
    sortByDate: (state, action) => {
      state.teamsMainData.sort((a, b) => {
        const dateA = a.created;
        const dateB = b.created;

        if (action.payload === "asc") {
          return dateA - dateB;
        }

        return dateB - dateA;
      });
    },
    deleteMember: (state, { payload }) => {
      const currentTeam = state.teamsMainData.find(
        (team) => team.id === payload.teamId
      );

      currentTeam.members = currentTeam.members.filter(
        (member) => member.id !== payload.id
      );
    },

    editMember: (state, { payload }) => {
      const currentTeam = state.teamsMainData.find(
        (team) => team.id === payload.teamId
      );

      const member = currentTeam.members.find(
        (member) => member.id === payload.id
      );

      member.name = payload.newName;
    },
    sortByMemberName: (state, { payload }) => {
      const currentTeam = state.teamsMainData.find(
        (team) => team.id === payload.teamId
      );

      currentTeam.members.sort((a, b) => {
        const x = a.name.toLowerCase();
        const y = b.name.toLowerCase();

        if (payload.nextDirection === "asc") {
          return x > y ? 1 : x < y ? -1 : 0;
        } else {
          return x < y ? 1 : x > y ? -1 : 0;
        }
      });
    },
    addNewMember: (state, { payload }) => {
      const currentTeam = state.teamsMainData.find(
        (team) => team.id === payload.teamId
      );

      currentTeam.members = [...currentTeam.members, payload.memberData];
    },
    deleteTeam: (state, { payload }) => {
      state.teamsMainData = state.teamsMainData.filter(
        (team) => team.id !== payload.team.id
      );
    },
  },
});

///Actions
export const {
  setTeamData,
  deleteMember,
  editMember,
  sortByDate,
  sortByMembers,
  sortByTeamName,
  sortByMemberName,
  addNewMember,
  deleteTeam,
} = teamSlice.actions;

///Selectors
export const selectTeamsData = (state) => state.teamStore.teamsMainData;
export const selectMembersData = (state) => state.teamStore.membersTeamData;

//Reducers
export const teamTestReducer = teamSlice.reducer;
