import pinData from '../../helpers/data/pinData';
import card from '../cards/pins';

const pinsView = (boardUid) => {
  $('#app').append('<button type="button" class="btn btn-warning back" id="back">Back</button>');
  pinData.getBoardPins(boardUid).then((response) => {
    if (response.length) {
      response.forEach((pin) => {
        $('#app').append(card.pinMaker(pin));
      });
    } else {
      $('#app').append('<h2>NO PINS</h2>');
    }
  });
};

export default { pinsView };
