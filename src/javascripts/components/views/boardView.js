import mergedData from '../../helpers/data/mergedData';
import card from '../cards/boardCard';

const boardsView = () => {
  mergedData.getDataForBoardsView()
    .then((response) => {
      if (response.length) {
        response.forEach((boardCard) => {
          $('#app').append(card.boardMaker(boardCard));
        });
      } else {
        $('#app').append('<h2>NO BOARDS</h2>');
      }
    });
};

export default { boardsView };
