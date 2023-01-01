// @ts-check
'use strict'

/**
 * QueryChangedPayload.
 */
class QueryChangedPayload {
  /**
   * constructor
   *
   * @param {QueryChangedPayloadInstanceParams} params
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
   * @param {QueryChangedPayloadInstanceParams} params
   * @returns {QueryChangedPayload} - Instance of this Class.
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
        changed: {
          identifier: this.identifier,
        }
      },
    }
  }
}

module.exports = QueryChangedPayload

/**
 * @typedef {{
 *   contractAddress: string,
 *   identifier: string,
 * }} QueryChangedPayloadInstanceParams
 */

/**
 * @typedef {{
 *   contractAddress: string,
 *   queryMsg: object,
 * }} QueryPayload
 */
