import userData from '../../helpers/data/userData';
import boardData from '../../helpers/data/boardData';

const updateBoardForm = (boardObject) => {
  $('#update-board-form').html(`
      <h2>Add A board to Your ap</h2>
      <div id="success-message"></div>
      <form>
        <div id="error-message"></div>
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" class="form-control" id="name" value="${boardObject.name}" placeholder="Example: Betsy">
        </div>
        <div class="form-group">
          <label for="breed">Breed</label>
          <input type="text" class="form-control" value="${boardObject.breed}" id="breed" placeholder="Example: Angus">
        </div>
        <div class="form-group">
          <label for="location">Location</label>
          <input type="text" class="form-control" id="location" value="${boardObject.location}" placeholder="Example: Nashville">
        </div>
        <div class="form-group">
          <label for="weight">Weight</label>
          <input type="number" class="form-control" id="weight" value="${boardObject.weight}" placeholder="Example: 5000">
        </div>
        <div class="form-group">
          <label for="user">User</label>
            <select class="form-control" id="user">
              <option value="">Select a user</option>
            </select>
        </div>
        <button id="update-board-btn" type="submit" class="btn btn-info"><i class="fas fa-plus-circle"></i> Update Board</button>
      </form>
  `);

  userData.getAllUsers().then((response) => {
    response.forEach((item) => {
      $('select').append(`<option value="${item.uid}" ${boardObject.userUid === item.uid ? "selected='selected'" : ''}>${item.name}</option>`);
    });
  });

  $('#update-board-btn').on('click', (e) => {
    e.preventDefault();

    const data = {
      breed: $('#breed').val() || false,
      location: $('#location').val() || false,
      name: $('#name').val() || false,
      weight: $('#weight').val() || false,
      userUid: $('#user').val() || false
    };

    if (Object.values(data).includes(false)) {
      $('#error-message').html('<div class="alert alert-danger" role="alert">Please complete all fields</div>');
    } else {
      $('#error-message').html('');

      boardData.updateBoard(boardObject.firebaseKey, data)
        .then(() => {
          $('#success-message').html('<div class="alert alert-success" role="alert">Your Board Was Updated!</div>');

          setTimeout(() => {
            $('#success-message').html('');
          }, 3000);
        }).catch((error) => console.warn(error));
    }
  });
};

export default { updateBoardForm };
