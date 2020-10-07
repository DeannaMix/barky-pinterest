import boardData from '../../helpers/data/boardData';

const boardMaker = (boardObject) => {
  const domString = `<div class="card m-2" style="width: 18rem;" id="${boardObject.firebaseKey}">
                      <div class="card-body">
                        <h5 class="card-title">${boardObject.name}</h5>
                        <p class="card-text">
                          Breed: ${boardObject.breed}<br />
                          Location: ${boardObject.location}<br />
                          Weight: ${boardObject.weight}<br />
                        </p>
                      </div>

                      <ul class="list-group list-group-flush">
                      <li class="list-group-item">
                        ${boardObject.userName}
                      </li>
                        <li class="list-group-item"><a href="mailto:${boardObject.userEmail}" target="_blank">Email User</a></li>
                      </ul>

                      <div class="card-body">
                        <a href="#" id="${boardObject.firebaseKey}" class="btn btn-info update-board"><i class="far fa-edit"></i> View Pins</a>
                        <a href="#" id="${boardObject.firebaseKey}" class="btn btn-danger delete-">Delete Board</a>
                      </div>
                    </div>`;

  $('body').on('click', '.delete-board', (e) => {
    e.stopImmediatePropagation();
    const firebaseKey = e.currentTarget.id;
    $(`.card#${firebaseKey}`).remove();
    boardData.deleteBoard(firebaseKey);
  });

  return domString;
};

export default { boardMaker };
