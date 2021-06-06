const initialState = {
  app: {
    loading: false,
    isModalOpen: false,
    selectedModal: '',
  },
  users: {
    usersList: [],
  },
  tasks: {
    tasksList: [],
  },
  menu: {
    isOpen: false,
  },
  progress: {
    userFullName: '',
    allTracks: [],
  },
};

export default initialState;
