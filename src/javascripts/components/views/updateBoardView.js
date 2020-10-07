import boardData from '../../helpers/data/boardData';
import form from '../forms/updateBoardForm';

const updateBoardView = (boardFirebaseKey) => {
  $('#app').html('<div id="update-board-form"></div>');

  boardData.getUsersBoards(boardFirebaseKey).then((response) => {
    form.updateBoardForm(response);
  });
};

export default { updateBoardView };
