import boardData from '../../helpers/data/boardData';

const boardMaker = (boardObject) => {
  const domString = `<div class="card m-2" style="width: 18rem;" id="${boardObject.firebaseKey}">
                      <div class="card-body">
                        <h5 class="card-title">Board: 
                        ${boardObject.name}</h5>
                        <p class="card-text">
                          Breed: ${boardObject.breed}<br />
                          Location: ${boardObject.location}<br />
                          Weight: ${boardObject.weight}<br />
                        </p>
                      </div>

                      <ul class="list-group list-group-flush">
                      <li class="list-group-item"> Owner:
                        ${boardObject.userName}
                    
                      <div class="card-body">
                        <a href="#" id="${boardObject.firebaseKey}" class="btn btn-info view-pins"><i class="far fa-edit"></i> View Pins</a>
                        <a href="#" id="${boardObject.firebaseKey}" class="btn btn-danger delete-board">Delete Board</a>
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
