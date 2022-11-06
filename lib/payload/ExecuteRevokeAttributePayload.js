// @ts-check
'use strict'

/**
 * ExecuteRevokeAttributePayload.
 */
class ExecuteRevokeAttributePayload {
  /**
   * constructor
   *
   * @param {ExecuteRevokeAttributePayloadInstanceParams} params
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
   * @param {ExecuteRevokeAttributePayloadInstanceParams} params
   * @returns {ExecuteRevokeAttributePayload} - Instance of this Class.
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
        revoke_attribute: {
          identifier: this.identifier,
          name: this.name,
          value: this.value,
        }
      },
    }
  }
}

module.exports = ExecuteRevokeAttributePayload

/**
 * @typedef {{
 *   contractAddress: string,
 *   identifier: string,
 *   name: string,
 *   value: string,
 * }} ExecuteRevokeAttributePayloadInstanceParams
 */

/**
 * @typedef {{
 *   contractAddress: string,
 *   executeMsg: object,
 * }} ExecutePayload
 */
