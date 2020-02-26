Element.prototype.appendAfter = function (element) {
  element.parentNode.insertBefore(this, element.nextSibling);
}

function noop() { }

function _createModalFooter(buttons = []) {
  if (buttons.length === 0) {
    return document.createElement('div');
  }

  const $footer = document.createElement('div');

  $footer.classList.add('modal-footer');

  buttons.forEach(button => {
    const $button = document.createElement('button');

    $button.textContent = button.text;
    $button.classList.add('btn');
    $button.classList.add(`btn-${button.type || 'secondary'}`);
    $button.onclick = button.handler || noop;

    $footer.appendChild($button);
  });

  return $footer;
}

function _createModal(options) {
  const DEFAULT_WIDTH = '600px';
  const modalBox = document.createElement('div');

  modalBox.classList.add('modal-box');
  modalBox.insertAdjacentHTML('afterbegin', `
    <div class="modal-overlay" data-close="true">
      <div class="modal-window" style="width: ${options.width || DEFAULT_WIDTH}">
        <div class="modal-header">
          <span class="modal-title">${options.title || 'Window'}</span>
          ${options.closable ? `<span class="modal-close" data-close="true">&times;</span>` : ''}
        </div>
        <div class="modal-body" data-content>
          ${options.content || ''}
        </div>
      </div>
    </div>
  `);

  const footer = _createModalFooter(options.footerButtons);
  footer.appendAfter(modalBox.querySelector('[data-content]'));
  document.body.appendChild(modalBox);

  return modalBox;
}

/*
* --------------
* onClose(): void
* onOpen(): void
* beforeClose(): boolean
* --------------
* animate.css
* */

$.modal = (options) => {
  const ANIMATION_SPEED = 200;
  const $modal = _createModal(options);
  let closing = false;
  let destroyed = false;

  const modal = {
    open() {
      !closing && $modal.classList.add('open');
    },
    close() {

      if (destroyed) {
        return console.log('Modal is destroyed');
      }

      closing = true;
      $modal.classList.remove('open');
      $modal.classList.add('hide');

      setTimeout(() => {
        $modal.classList.remove('hide');
        closing = false;
      }, ANIMATION_SPEED);
    }
  };

  const listener = event => {
    if (event.target.dataset.close) {
      modal.close();
    }
  };

  $modal.addEventListener('click', listener);

  return Object.assign(modal, {
    destroy() {
      $modal.removeEventListener('click', listener);
      $modal.parentNode.removeChild($modal);
      destroyed = true;
    },
    setContent(html) {
      $modal.querySelector('[data-content]').innerHTML = html;
    }
  });
}
