import userData from '../../helpers/data/userData';
import card from '../cards/userCards';

const usersView = () => {
  userData.getAllUsers()
    .then((response) => {
      if (response.length) {
        response.forEach((item) => {
          $('#app').append(card.userMaker(item));
        });
      } else {
        $('#app').append('<h2>NO USERS!</h2>');
      }
    });
};

export default { usersView };
