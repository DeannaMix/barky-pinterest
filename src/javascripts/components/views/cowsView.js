import mergedData from '../../helpers/data/mergedData';
import card from '../cards/cowCard';

const cowsView = () => {
  mergedData.getDataForCowsView()
    .then((response) => {
      if (response.length) {
        response.forEach((cow) => {
          $('#app').append(card.cowMaker(cow));
        });
      } else {
        $('#app').append('<h2>NO COWS</h2>');
      }
    });
};

export default { cowsView };
