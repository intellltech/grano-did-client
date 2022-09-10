// @ts-check
'use strict'

require('dotenv').config()

/**
 * DidConfig.
 */
class DidConfig {
  /**
   * constructor
   *
   * @param {DidConfigInstanceParams} params
   */
  constructor ({
    endPoint = process.env.END_POINT,
    denom = process.env.DENOM,
    mnemonic = process.env.MNEMONIC,
    prefix = process.env.PREFIX,
    fromAddress = process.env.FROM_ADDRESS,
  } = {}) {
    this.endPoint = endPoint
    this.denom = denom
    this.mnemonic = mnemonic
    this.prefix = prefix
    this.fromAddress = fromAddress
  }

  /**
   * create.
   *
   * @param {DidConfigInstanceParams} params
   * @returns {DidConfig} - Istance of this class.
   */
  static create (params = {}) {
    return new this(params)
  }
}

/**
 * @typedef {{
 *   endPoint?: string,
 *   denom?: string,
 *   mnemonic?: string,
 *   prefix?: string,
 *   fromAddress?: string,
 * }} DidConfigInstanceParams
 */

module.exports = DidConfig
