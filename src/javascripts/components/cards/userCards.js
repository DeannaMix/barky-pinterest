import boardData from '../../helpers/data/boardData';

const userMaker = (userObject) => {
  const domString = `<div class="card user" style="width: 18rem;" id=${userObject.uid}>
                      <img class="card-img-top" src="${userObject.imageUrl}" alt="Card image cap">
                      <div class="card-body">
                        <h5 class="card-title">${userObject.name}</h5>
                        <a href="#" class="btn btn-primary see-boards" id=${userObject.uid}>See Boards</a>
                        <a href="#" id="${userObject.uid}" class="btn btn-danger delete-user">Delete User</a>
                      </div>
                    </div>`;

  $('body').on('click', '.card.user .btn.delete-user', (e) => {
    e.stopImmediatePropagation();
    $(`.card#${e.currentTarget.id}`).remove();
    boardData.deleteUser(e.currentTarget.id);
  });
  return domString;
};

export default { userMaker };
