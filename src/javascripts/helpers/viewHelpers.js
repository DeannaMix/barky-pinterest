import usersView from '../components/views/usersView';
import boardsView from '../components/views/boardView';
import addBoardView from '../components/views/addBoardView';
import updateBoardView from '../components/views/updateBoardView';
import singleUserView from '../components/views/singleUserView';
import pinsView from '../components/views/pinView';
import addPinView from '../components/views/addPins';

const viewHelper = (id, arg) => {
  $('#app').html('');

  switch (id) {
    case 'boards-link':
      return boardsView.boardsView();
    case 'single-board':
      return pinsView.pinsView(arg);
    case 'users-link':
      return usersView.usersView();
    case 'add-board-link':
      return addBoardView.addBoardView();
    case 'add-pin-link':
      return addPinView.addPinView();
    case 'view-pins':
      return pinsView.pinsView(arg);
    case 'update-board-link':
      return updateBoardView.updateBoardView(arg);
    case 'single-user':
      return singleUserView.singleUserView(arg);
    default:
      return console.warn('nothing clicked');
  }
};

const viewListener = (view) => {
  viewHelper(view);

  $('body').on('click', 'li.nav-item', (e) => {
    viewHelper(e.currentTarget.id);
  });

  $('body').on('click', '.update-board', (e) => {
    const boardFirebaseKey = e.currentTarget.id;
    viewHelper('update-board-link', boardFirebaseKey);
  });

  $('body').on('click', '.view-pins', (e) => {
    const userUid = e.currentTarget.id;
    viewHelper('view-pins', userUid);
  });
};

export default { viewListener };
