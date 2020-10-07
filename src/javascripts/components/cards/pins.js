import pinData from '../../helpers/data/pinData';

const pinMaker = (pinObject) => {
  console.warn(pinObject);
  const domString = `<div class="card" style="width: 18rem;" id="${pinObject.uid}">
                     <a href="${pinObject.url}" target="_blank">
                      <img src="${pinObject.imageUrl}" class="card-img-top" alt="${pinObject.name}">
                    </a>
                   <div class="card-body">
                    <h5 class="card-title">${pinObject.name}</h5>
                    <a href="#" id="${pinObject.uid}" class="btn btn-success update-pin"><i class="fas fa-edit-alt"></i> Update Pin</a>
                    <a href="#" id="${pinObject.uid}" class="btn btn-danger delete-pin"><i class="fas fa-trash-alt"></i> Delete Pin</a>
                  </div>
                  </div>`;
  $('body').on('click', '.delete-pin', (e) => {
    e.stopImmediatePropagation();
    const firebaseKey = e.currentTarget.id;
    $(`.card#${firebaseKey}`).remove();
    pinData.deletePin(firebaseKey);
  });
  return domString;
};

export default { pinMaker };
