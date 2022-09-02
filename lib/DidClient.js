// @ts-check
'use strict'

const { CosmWasmClient } = require('@cosmjs/cosmwasm-stargate')
const DidConfig = require('./DidConfig')

/**
 * DidClient.
 */
class DidClient {
  /**
   * constructor
   *
   * @param {DidClientInstanceParams} params
   */
  constructor ({
    cosmWasmClient
  } = {}) {
    this.client = cosmWasmClient
  }

  /**
   * create.
   *
   * @param {DidClientInstanceParams} params
   * @returns {DidClient} - Instance of this class.
   */
  static create (params = {}) {
    return new this(params)
  }

  /**
   * create.
   *
   * @param {DidConfigInstanceParams} config
   * @returns {Promise<DidClient>} - Instance of this class.
   */
  static async createFulfilled (config) {
    const didConfig = DidConfig.create(config)
    const cosmWasmClient = await CosmWasmClient.connect(didConfig.endPoint)

    return this.create({ cosmWasmClient })
  }

  /**
   * getChainId.
   */
  async getChainId () {
    return this.client.getChainId()
  }
}

/**
 * @typedef {{
 *   cosmWasmClient?: CosmWasmClient,
 * }} DidClientInstanceParams
 */

/**
 * @typedef {{
 *   endPoint?: string,
 * }} DidConfigInstanceParams
 */

module.exports = DidClient
