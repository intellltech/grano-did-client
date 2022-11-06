// @ts-check
'use strict'

/**
 * ExecuteSetAttributePayload.
 */
class ExecuteSetAttributePayload {
  /**
   * constructor
   *
   * @param {ExecuteSetAttributePayloadInstanceParams} params
   */
  constructor ({
    contractAddress,
    identifier,
    name,
    value,
    validity,
  }) {
    this.contractAddress = contractAddress
    this.identifier = identifier
    this.name = name
    this.value = value
    this.validity = validity
  }

  /**
   * create.
   *
   * @param {ExecuteSetAttributePayloadInstanceParams} params
   * @returns {ExecuteSetAttributePayload} - Instance of this Class.
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
        set_attribute: {
          identifier: this.identifier,
          name: this.name,
          value: this.value,
          validity: this.validity,
        }
      },
    }
  }
}

module.exports = ExecuteSetAttributePayload

/**
 * @typedef {{
 *   contractAddress: string,
 *   identifier: string,
 *   name: string,
 *   value: string,
 *   validity: number,
 * }} ExecuteSetAttributePayloadInstanceParams
 */

/**
 * @typedef {{
 *   contractAddress: string,
 *   executeMsg: object,
 * }} ExecutePayload
 */
