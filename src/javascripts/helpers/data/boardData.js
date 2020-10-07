import axios from 'axios';
import apiKeys from './apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllBoards = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json`).then((response) => {
    const demBoards = response.data;
    const boards = [];
    if (demBoards) {
      Object.keys(demBoards).forEach((boardsId) => {
        boards.push(demBoards[boardsId]);
      });
    }
    resolve(boards);
  }).catch((error) => reject(error));
});

const deleteBoard = (firebaseKey) => axios.delete(`${baseUrl}/boards/${firebaseKey}.json`);

const addBoard = (data) => axios.post(`${baseUrl}/boards.json`, data)
  .then((response) => {
    const update = { firebaseKey: response.data.name };
    axios.patch(`${baseUrl}/boards/${response.data.name}.json`, update);
  }).catch((error) => console.warn(error));

const getUsersBoards = (userUid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json?orderBy="userUid"&equalTo="${userUid}"`)
    .then((response) => {
      const usersBoards = response.data;
      const boards = [];
      if (usersBoards) {
        Object.keys(usersBoards).forEach((boardId) => {
          boards.push(usersBoards[boardId]);
        });
      }
      resolve(boards);
    }).catch((error) => reject(error));
});

const getSingleBoard = (boardFirebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards/${boardFirebaseKey}.json`).then((response) => {
    const thisBoard = response.data;
    resolve(thisBoard);
  }).catch((error) => reject(error));
});

const updateBoard = (firebaseKey, boardObject) => axios.patch(`${baseUrl}/boards/${firebaseKey}.json`, boardObject);

export default {
  getAllBoards,
  deleteBoard,
  addBoard,
  getUsersBoards,
  getSingleBoard,
  updateBoard
};
