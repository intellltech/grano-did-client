// @ts-check
'use strict'

/**
 * QueryControllerPayload.
 */
class QueryControllerPayload {
  /**
   * constructor
   *
   * @param {QueryControllerPayloadInstanceParams} params
   */
  constructor ({
    contractAddress,
    address,
  }) {
    this.contractAddress = contractAddress
    this.address = address
  }

  /**
   * create.
   *
   * @param {QueryControllerPayloadInstanceParams} params
   * @returns {QueryControllerPayload} - Instance of this Class.
   */
  static create (params) {
    return new this(params)
  }

  /**
   * buildParams.
   *
   * @returns {QueryControllerPayloadParams}
   */
  buildParams () {
    return {
      contractAddress: this.contractAddress,
      queryMsg: {
        controller: {
          identifier: this.address,
        }
      },
    }
  }
}

module.exports = QueryControllerPayload

/**
 * @typedef {{
 *   contractAddress: string,
 *   address: string,
 * }} QueryControllerPayloadInstanceParams
 */

/**
 * @typedef {{
 *   contractAddress: string,
 *   queryMsg: object,
 * }} QueryControllerPayloadParams
 */
