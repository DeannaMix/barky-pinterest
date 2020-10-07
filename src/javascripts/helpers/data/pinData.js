import axios from 'axios';
import apiKeys from './apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getBoardPins = (boardUid) => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/pins.json?orderBy="boardUid"&equalTo="${boardUid}"`)
    .then((response) => {
      const boardPins = response.data;
      const pins = [];

      if (boardPins) {
        Object.keys(boardPins).forEach((pinId) => {
          pins.push(boardPins[pinId]);
        });
      }
      resolve(pins);
    })
    .catch((error) => reject(error));
});

const getSinglePin = (pinUid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins/${pinUid}.json`).then((response) => {
    const thisPin = response.data;
    resolve(thisPin);
  }).catch((error) => reject(error));
});

const deletePin = (firebaseKey) => axios.delete(`${baseUrl}/pins/${firebaseKey}.json`);

const addPin = (data) => axios
  .post(`${baseUrl}/pins.json`, data)
  .then((response) => {
    const update = {
      uid: response.data.name,
    };
    axios.patch(`${baseUrl}/pins/${response.data.name}.json`, update);
  })
  .catch((error) => console.warn(error));

export default {
  getBoardPins, deletePin, addPin, getSinglePin
};
