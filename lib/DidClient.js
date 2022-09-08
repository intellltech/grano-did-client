// @ts-check
'use strict'

const { SigningCosmWasmClient } = require('@cosmjs/cosmwasm-stargate')
const { DirectSecp256k1HdWallet } = require('@cosmjs/proto-signing')
const { calculateFee, GasPrice } = require('@cosmjs/stargate')
const fs = require('fs')

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
    signingCosmWasmClient,
    didConfig,
  } = {}) {
    this.client = signingCosmWasmClient
    this.config = didConfig
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

    return this.create({
      signingCosmWasmClient,
      didConfig,
    })
  }

  /**
   * getChainId.
   */
  async getChainId () {
    return this.client.getChainId()
  }

  /**
   * upload.
   *
   * @param {string} wasmPath
   */
  async upload (wasmPath) {
    const gasPrice = GasPrice.fromString(`0.025${this.config.denom}`)
    const wasm = fs.readFileSync(wasmPath)
    const uploadFee = calculateFee(1_500_000, gasPrice)

    const result = await this.client.upload(this.config.fromAddress, wasm, uploadFee, 'memo')

    return result
  }

  /**
   * instantiate.
   *
   * @param {number} codeId
   */
  async instantiate (codeId) {
    const gasPrice = GasPrice.fromString(`0.025${this.config.denom}`)
    const instantiateFee = calculateFee(500_000, gasPrice)
    // TODO: update msg
    const msg = {
      a: 'a'
    }

    const result = await this.client.instantiate(
      this.config.fromAddress,
      codeId,
      msg,
      'instantiate the contract',
      instantiateFee
    )

    this.contractAddress = result.contractAddress

    return result
  }

  /**
   * IdentityOwner.
   *
   * @param {string} address
   */
  async identityOwner (address) {
    const queryMsg = {
      identity_owner: {
        identity: address
      }
    }

    return this.client.queryContractSmart(this.contractAddress, queryMsg)
  }

  /**
   * changeOwner.
   *
   * @param {string} oldOwnerAddress
   * @param {string} newOwnerAddress
   */
  async changeOwner (
    oldOwnerAddress,
    newOwnerAddress
  ) {
    const gasPrice = GasPrice.fromString(`0.025${this.config.denom}`)
    const executeFee = calculateFee(300_000, gasPrice)
    const execMsg = {
      change_owner: {
        identity: oldOwnerAddress,
        new_owner: newOwnerAddress,
      }
    }

    return this.client.execute(this.config.fromAddress, this.contractAddress, execMsg, executeFee)
  }

  /**
   * setAttribute.
   *
   * @param {string} identity
   * @param {string} name
   * @param {string} value
   * @param {number} validity
   */
  async setAttribute (
    identity,
    name,
    value,
    validity,
  ) {
    const gasPrice = GasPrice.fromString(`0.025${this.config.denom}`)
    const executeFee = calculateFee(300_000, gasPrice)
    const execMsg = {
      set_attribute: {
        identity: identity,
        name: name,
        value: value,
        validity: validity,
      }
    }

    return this.client.execute(this.config.fromAddress, this.contractAddress, execMsg, executeFee)
  }

  /**
   * revokeAttribute.
   *
   * @param {string} identity
   * @param {string} name
   * @param {string} value
   */
  async revokeAttribute (
    identity,
    name,
    value,
  ) {
    const gasPrice = GasPrice.fromString(`0.025${this.config.denom}`)
    const executeFee = calculateFee(300_000, gasPrice)
    const execMsg = {
      revoke_attribute: {
        identity: identity,
        name: name,
        value: value,
      }
    }

    return this.client.execute(this.config.fromAddress, this.contractAddress, execMsg, executeFee)
  }
}

/**
 * @typedef {{
 *   signingCosmWasmClient?: SigningCosmWasmClient,
 *   didConfig?: DidConfig,
 * }} DidClientInstanceParams
 */

/**
 * @typedef {{
 *   endPoint?: string,
 *   denom?: string,
 *   mnemonic?: string,
 *   prefix?: string,
 *   fromAddress?: string,
 * }} DidConfigInstanceParams
 */

module.exports = DidClient
