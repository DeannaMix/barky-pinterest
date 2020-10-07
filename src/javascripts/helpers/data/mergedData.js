import boardData from './boardData';
import userData from './userData';

const getDataForBoardsView = () => new Promise((resolve, reject) => {
  boardData.getAllBoards().then((boardResponse) => {
    userData.getAllUsers().then((userResponse) => {
      const boardStuff = [];
      boardResponse.forEach((board) => {
        const userObject = userResponse.find((user) => user.uid === board.userUid);
        const userUse = {
          userName: userObject.name,
        };

        boardStuff.push({ ...board, ...userUse });
        resolve(boardStuff);
      });
    });
  }).catch((error) => reject(error));
});

const getSingleUserView = (userUid) => new Promise((resolve, reject) => {
  userData.getSingleUser(userUid)
    .then((userResponse) => {
      boardData.getUsersBoards(userResponse.uid)
        .then((boardResponse) => {
          const finalObject = { user: userResponse, boards: boardResponse };
          resolve(finalObject);
        });
    }).catch((error) => reject(error));
});

export default { getDataForBoardsView, getSingleUserView };
