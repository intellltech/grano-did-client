// @ts-check
'use strict'

/**
 * QueryAttributePayload.
 */
class QueryAttributePayload {
  /**
   * constructor
   *
   * @param {QueryAttributePayloadInstanceParams} params
   */
  constructor ({
    contractAddress,
    identifier,
    name,
  }) {
    this.contractAddress = contractAddress
    this.identifier = identifier
    this.name = name
  }

  /**
   * create.
   *
   * @param {QueryAttributePayloadInstanceParams} params
   * @returns {QueryAttributePayload} - Instance of this Class.
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
        attribute: {
          identifier: this.identifier,
          name: this.name,
        }
      },
    }
  }
}

module.exports = QueryAttributePayload

/**
 * @typedef {{
 *   contractAddress: string,
 *   identifier: string,
 *   name: string,
 * }} QueryAttributePayloadInstanceParams
 */

/**
 * @typedef {{
 *   contractAddress: string,
 *   queryMsg: object,
 * }} QueryPayload
 */
