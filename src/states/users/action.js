import { api } from '../../utils/api';

const ActionType = {
  RECEIVE_ALL_USERS: 'RECEIVE_ALL_USERS',
};

function receiveAllUsersActionCreator(users) {
  return {
    type: ActionType.RECEIVE_ALL_USERS,
    payload: {
      users,
    },
  };
}

function asyncRegisterNewUser({ name, email, password }) {
  return async () => {
    if (!name || !email || !password) {
      throw new Error('Semua field harus diisi!');
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      throw new Error('Format email tidak valid!');
    }

    if (password.length < 8) {
      throw new Error('Password minimal 8 karakter!');
    }

    try {
      await api.register({ name, email, password });
      console.log('user Registered');
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

export {
  ActionType,
  receiveAllUsersActionCreator,
  asyncRegisterNewUser
};