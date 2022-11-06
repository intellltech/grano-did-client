// @ts-check
'use strict'

/**
 * ExecuteChangeControllerPayload.
 */
class ExecuteChangeControllerPayload {
  /**
   * constructor
   *
   * @param {ExecuteChangeControllerPayloadInstanceParams} params
   */
  constructor ({
    contractAddress,
    identifier,
    newController
  }) {
    this.contractAddress = contractAddress
    this.identifier = identifier
    this.newController = newController
  }

  /**
   * create.
   *
   * @param {ExecuteChangeControllerPayloadInstanceParams} params
   * @returns {ExecuteChangeControllerPayload} - Instance of this Class.
   */
  static create (params) {
    return new this(params)
  }

  /**
   * buildParams.
   *
   * @returns {ExecutePayload}
   */
  buildParams () {
    return {
      contractAddress: this.contractAddress,
      executeMsg: {
        change_controller: {
          identifier: this.identifier,
          new_controller: this.newController,
        }
      },
    }
  }
}

module.exports = ExecuteChangeControllerPayload

/**
 * @typedef {{
 *   contractAddress: string,
 *   identifier: string,
 *   newController: string,
 * }} ExecuteChangeControllerPayloadInstanceParams
 */

/**
 * @typedef {{
 *   contractAddress: string,
 *   executeMsg: object,
 * }} ExecutePayload
 */
