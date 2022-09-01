// @ts-check
'use strict'

require('dotenv').config()

const { Tendermint34Client } = require('@cosmjs/tendermint-rpc')

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
  } = {}) {
    this.endPoint = endPoint
  }

  get tmClient () {
    return Tendermint34Client.connect(this.endPoint)
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
 * }} DidConfigInstanceParams
 */

module.exports = DidConfig
