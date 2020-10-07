import mergedData from '../../helpers/data/mergedData';

const singleUserView = (userUid) => {
  mergedData.getSingleUserView(userUid)
    .then((response) => {
      const { user, boards } = response;

      $('#app').append(`<div id="single-view">
                          <h1>${user.name}'s Boards!</h1>
                        </div>`);

      if (boards.length) {
        boards.forEach((board) => {
          $('#single-view').append(`<h3>${board.name}</h3>`);
        });
      } else {
        $('#single-view').append('<h1>NO BOARDS!</h1>');
      }
    });
};

export default { singleUserView };
