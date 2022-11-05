// @ts-check
'use strict'

require('dotenv').config()

/**
 * GranoDidConfig.
 */
class GranoDidConfig {
  /**
   * constructor
   *
   * @param {GranoDidConfigInstanceParams} params
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
   * @param {GranoDidConfigInstanceParams} params
   * @returns {GranoDidConfig} - Istance of this class.
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
 * }} GranoDidConfigInstanceParams
 */

module.exports = GranoDidConfig
