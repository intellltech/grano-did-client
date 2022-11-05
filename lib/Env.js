// @ts-check
'use strict'

require('dotenv').config()

class Env {
  constructor () {
    this.END_POINT = this.validateNonNull(process.env.END_POINT)
    this.DENOM = this.validateNonNull(process.env.DENOM)
    this.MNEMONIC = this.validateNonNull(process.env.MNEMONIC)
    this.PREFIX = this.validateNonNull(process.env.PREFIX)
    this.FROM_ADDRESS = process.env.FROM_ADDRESS
  }

  /**
   * create.
   *
   * @returns {Env} - Instance of this class.
   */
  static create () {
    return new this()
  }

  /**
   * validateNonNull.
   *
   * @param {string} value - environment variable
   * @throws {Error}
   * @returns {string} value
   */
  validateNonNull (value) {
    if (value === undefined) {
      throw new Error('Please set environment variable in .env')
    }

    return value
  }
}

module.exports = Env
