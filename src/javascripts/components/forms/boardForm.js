import userData from '../../helpers/data/userData';
import boardData from '../../helpers/data/boardData';

const boardForm = () => {
  $('#board-form').html(
    ` <h2>Add A Board to Your Pinterest</h2>
    <div id="success-message"></div>
    <form>
      <div id="error-message"></div>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name" placeholder="Example: Lisa">
      </div>
      <div class="form-group">
        <label for="breed">Breed</label>
        <input type="text" class="form-control" id="breed" placeholder="Example: Golden Retriever">
      </div>
      <div class="form-group">
        <label for="location">Location</label>
        <input type="text" class="form-control" id="location" placeholder="Example: Nashville">
      </div>
      <div class="form-group">
        <label for="weight">Weight</label>
        <input type="number" class="form-control" id="weight" placeholder="Example: 50">
      </div>
      <div class="form-group">
        <label for="user">User</label>
          <select class="form-control" id="user">
            <option value="">Select a User</option>
          </select>
      </div>
      <button id="add-board-btn" type="submit" class="btn btn-info"><i class="fas fa-plus-circle"></i> Add Board</button>
    </form>`
  );

  userData.getAllUsers().then((response) => {
    console.warn(response);
    response.forEach((item) => {
      $('select').append(`<option value="${item.uid}">${item.name}</option>`);
    });
  });

  $('#add-board-btn').on('click', (e) => {
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
      console.warn(data);
      boardData.addBoard(data)
        .then(() => {
          $('#success-message').html('<div class="alert alert-success" role="alert">Your Board Was Added!</div>');

          setTimeout(() => {
            $('#success-message').html('');
          }, 3000);
        }).catch((error) => console.warn(error));

      $('#breed').val('');
      $('#location').val('');
      $('#name').val('');
      $('#weight').val('');
      $('#user').val('');
    }
  });
};

export default { boardForm };
