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
    identifier,
  }) {
    this.contractAddress = contractAddress
    this.identifier = identifier
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
   * @returns {QueryPayload}
   */
  buildParams () {
    return {
      contractAddress: this.contractAddress,
      queryMsg: {
        controller: {
          identifier: this.identifier,
        }
      },
    }
  }
}

module.exports = QueryControllerPayload

/**
 * @typedef {{
 *   contractAddress: string,
 *   identifier: string,
 * }} QueryControllerPayloadInstanceParams
 */

/**
 * @typedef {{
 *   contractAddress: string,
 *   queryMsg: object,
 * }} QueryPayload
 */
