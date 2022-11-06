// @ts-check
'use strict'

const Env = require('./Env').create()

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
    endPoint = Env.END_POINT,
    denom = Env.DENOM,
    mnemonic = Env.MNEMONIC,
    prefix = Env.PREFIX,
    fromAddress = Env.FROM_ADDRESS,
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
