// @ts-check
'use strict'

/**
 * QueryValidToPayload.
 */
class QueryValidToPayload {
  /**
   * constructor
   *
   * @param {QueryValidToPayloadInstanceParams} params
   */
  constructor ({
    contractAddress,
    identifier,
    name,
    value,
  }) {
    this.contractAddress = contractAddress
    this.identifier = identifier
    this.name = name
    this.value = value
  }

  /**
   * create.
   *
   * @param {QueryValidToPayloadInstanceParams} params
   * @returns {QueryValidToPayload} - Instance of this Class.
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
        valid_to: {
          identifier: this.identifier,
          name: this.name,
          value: this.value,
        }
      },
    }
  }
}

module.exports = QueryValidToPayload

/**
 * @typedef {{
 *   contractAddress: string,
 *   identifier: string,
 *   name: string,
 *   value: string,
 * }} QueryValidToPayloadInstanceParams
 */

/**
 * @typedef {{
 *   contractAddress: string,
 *   queryMsg: object,
 * }} QueryPayload
 */
