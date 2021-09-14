import { logger } from './Logger'
import $ from 'jquery'

class ModalHandler {
/**
 *
 * @param {String} modalId
 */
  close(modalId) {
    // eslint-disable-next-line no-undef
    $(modalId).modal('hide')
    // eslint-disable-next-line no-undef
    $('body').removeClass('modal-open')
    // eslint-disable-next-line no-undef
    $('.modal-backdrop').remove()
  }
}

export const modalHandler = new ModalHandler()
