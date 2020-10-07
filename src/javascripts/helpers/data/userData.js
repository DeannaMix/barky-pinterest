import axios from 'axios';
import apiKeys from './apiKeys.json';
import boardData from './boardData';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllUsers = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users.json`).then((response) => {
    const demUsers = response.data;
    const users = [];
    if (demUsers) {
      Object.keys(demUsers).forEach((userId) => {
        users.push(demUsers[userId]);
      });
    }
    resolve(users);
  }).catch((error) => reject(error));
});

const checkIfUserExistsInFirebase = (user) => {
  console.warn(user);
  axios
    .get(`${baseUrl}/users.json?orderBy="uid"&equalTo="${user.uid}"`)
    .then((resp) => {
      if (Object.values(resp.data).length === 0) {
        axios.post(`${baseUrl}/users.json`, user)
          .then((response) => {
            const update = { firebaseKey: response.data.name };
            axios.patch(`${baseUrl}/users/${response.data.name}.json`, update);
          }).catch((error) => console.warn(error));
      } else {
        console.warn('User Already Exists');
      }
      // NOTE FOR STUDENTS
      // Set session storage after we know that user is in DB so that we do not hit the API again during this session. Limit hits to the API.
      window.sessionStorage.setItem('ua', true);
    })
    .catch((error) => console.error(error));
};

const setCurrentUser = (userObj) => {
  const user = {
    image: userObj.photoURL,
    uid: userObj.uid,
    name: userObj.displayName,
    email: userObj.email,
    lastSignInTime: userObj.metadata.lastSignInTime,
  };
  const loggedIn = window.sessionStorage.getItem('ua');
  if (!loggedIn) {
    checkIfUserExistsInFirebase(user);
  }
  return user;
};

const getSingleUser = (userUid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users.json?orderBy="uid"&equalTo="${userUid}"`)
    .then((response) => {
      const user = Object.values(response.data);
      const thisUser = user[0];
      resolve(thisUser);
    }).catch((error) => reject(error));
});

const deleteUser = (userUid) => {
  boardData.getUsersBoards(userUid)
    .then((response) => {
      response.forEach((item) => {
        boardData.deleteBoard(item.firebaseKey);
      });
    })
    .then(() => {
      getSingleUser(userUid)
        .then((response) => {
          axios.delete(`${baseUrl}/users/${response.firebaseKey}.json`);
        });
    });
};

export default {
  setCurrentUser,
  getAllUsers,
  deleteUser,
  getSingleUser
};
