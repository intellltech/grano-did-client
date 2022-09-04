// @ts-check
'use strict'

const { SigningCosmWasmClient } = require('@cosmjs/cosmwasm-stargate')
const { DirectSecp256k1HdWallet } = require('@cosmjs/proto-signing')
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
    signingCosmWasmClient
  } = {}) {
    this.client = signingCosmWasmClient
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
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(didConfig.mnemonic, { prefix: didConfig.prefix })
    const signingCosmWasmClient = await SigningCosmWasmClient.connectWithSigner(didConfig.endPoint, wallet)

    return this.create({ signingCosmWasmClient })
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
 *   signingCosmWasmClient?: SigningCosmWasmClient,
 * }} DidClientInstanceParams
 */

/**
 * @typedef {{
 *   endPoint?: string,
 * }} DidConfigInstanceParams
 */

module.exports = DidClient
