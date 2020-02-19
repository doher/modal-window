function _createModal(options) {
  const modalBox = document.createElement('div');
  const modalOverlay = document.createElement('div');
  const modalWindow = document.createElement('div');
  const modalHeader = document.createElement('div');
  const modalBody = document.createElement('div');
  const modalFooter = document.createElement('div');
  const modalTitle = document.createElement('span');
  const modalClose = document.createElement('span');
  const paragraph1 = document.createElement('p');
  const paragraph2 = document.createElement('p');
  const buttonOk = document.createElement('button');
  const buttonCancel = document.createElement('button');

  modalBox.classList.add('modal-box');
  modalOverlay.classList.add('modal-overlay');
  modalWindow.classList.add('modal-window');
  modalHeader.classList.add('modal-header');
  modalBody.classList.add('modal-body');
  modalFooter.classList.add('modal-footer');
  modalTitle.classList.add('modal-title');
  modalClose.classList.add('modal-close');

  modalTitle.innerHTML = 'Modal Title';
  modalClose.innerHTML = '&times;';
  paragraph1.innerHTML = 'Lorem ipsum dolor sit.';
  paragraph2.innerHTML = 'Lorem ipsum dolor sit.';
  buttonOk.innerHTML = 'Ok';
  buttonCancel.innerHTML = 'Cancel';

  modalHeader.appendChild(modalTitle);
  modalHeader.appendChild(modalClose);
  modalBody.appendChild(paragraph1);
  modalBody.appendChild(paragraph2);
  modalFooter.appendChild(buttonOk);
  modalFooter.appendChild(buttonCancel);
  modalWindow.appendChild(modalHeader);
  modalWindow.appendChild(modalBody);
  modalWindow.appendChild(modalFooter);
  modalOverlay.appendChild(modalWindow);
  modalBox.appendChild(modalOverlay);

  document.body.appendChild(modalBox);

  return modalBox;
}

$.modal = (options) => {
  const ANIMATION_SPEED = 200;
  const $modal = _createModal(options);
  let closing = false;

  return {
    open() {
      !closing && $modal.classList.add('open');
    },
    close() {
      closing = true;
      $modal.classList.remove('open');
      $modal.classList.add('hide');

      setTimeout(() => {
        $modal.classList.remove('hide');
        closing = false;
      }, ANIMATION_SPEED);
    },
    destroy() { }
  }
}