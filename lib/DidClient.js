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
   * setDefaultContractAddress.
   *
   * @param {string} contractAddress
   */
  setDefaultContractAddress (contractAddress) {
    this.contractAddress = contractAddress
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
   * @param {InstantiateParam} instantiateParam
   */
  async instantiate (instantiateParam) {
    const gasPrice = GasPrice.fromString(`0.025${this.config.denom}`)
    const instantiateFee = calculateFee(500_000, gasPrice)
    // TODO: update msg
    const msg = {
      a: 'a'
    }

    const result = await this.client.instantiate(
      this.config.fromAddress,
      instantiateParam.codeId,
      msg,
      'instantiate the contract',
      instantiateFee
    )

    this.setDefaultContractAddress(result.contractAddress)

    return result
  }

  /**
   * _query.
   *
   * @param {QueryParams} queryParams
   */
  async _query (queryParams) {
    return this.client.queryContractSmart(
      queryParams.contractAddress,
      queryParams.queryMsg,
    )
  }

  /**
   * _execute.
   *
   * @param {ExecuteParams} executeParams
   */
  async _execute (executeParams) {
    const gasPrice = GasPrice.fromString(`0.025${this.config.denom}`)
    const executeFee = calculateFee(300_000, gasPrice)

    return this.client.execute(
      this.config.fromAddress,
      executeParams.contractAddress,
      executeParams.executeMsg,
      executeFee,
    )
  }

  /**
   * IdentityOwner.
   *
   * @param {IdentityOwnerParams} identityOwnerParams
   */
  async identityOwner (identityOwnerParams) {
    const queryMsg = {
      identity_owner: {
        identity: identityOwnerParams.address
      }
    }

    const queryParams = {
      contractAddress: identityOwnerParams.contractAddress ?? this.contractAddress,
      queryMsg: queryMsg
    }

    return this._query(queryParams)
  }

  /**
   * changeOwner.
   *
   * @param {ChangeOwnerParams} changeOwnerParams
   */
  async changeOwner (changeOwnerParams) {
    const executeMsg = {
      change_owner: {
        identity: changeOwnerParams.oldOwnerAddress,
        new_owner: changeOwnerParams.newOwnerAddress,
      }
    }

    const executeParams = {
      contractAddress: changeOwnerParams.contractAddress ?? this.contractAddress,
      executeMsg: executeMsg
    }

    return this._execute(executeParams)
  }

  /**
   * setAttribute.
   *
   * @param {SetAttributeParams} setAttributeParams
   */
  async setAttribute (setAttributeParams) {
    const executeMsg = {
      set_attribute: {
        identity: setAttributeParams.identity,
        name: setAttributeParams.name,
        value: setAttributeParams.value,
        validity: setAttributeParams.validity,
      }
    }
    const executeParams = {
      contractAddress: setAttributeParams.contractAddress ?? this.contractAddress,
      executeMsg: executeMsg
    }

    return this._execute(executeParams)
  }

  /**
   * revokeAttribute.
   *
   * @param {RevokeAttributeParams} revokeAttributeParams
   */
  async revokeAttribute (revokeAttributeParams) {
    const executeMsg = {
      revoke_attribute: {
        identity: revokeAttributeParams.identity,
        name: revokeAttributeParams.name,
        value: revokeAttributeParams.value,
      }
    }

    const executeParams = {
      contractAddress: revokeAttributeParams.contractAddress ?? this.contractAddress,
      executeMsg: executeMsg
    }

    return this._execute(executeParams)
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

/**
 * @typedef {{
 *   codeId: number,
 * }} InstantiateParam
 */

/**
 * @typedef {{
 *   contractAddress: string,
 *   queryMsg: object,
 * }} QueryParams
 */

/**
 * @typedef {{
 *   contractAddress: string,
 *   executeMsg: object,
 * }} ExecuteParams
 */

/**
 * @typedef {{
 *   contractAddress?: string,
 *   address: string,
 * }} IdentityOwnerParams
 */

/**
 * @typedef {{
 *   contractAddress?: string,
 *   oldOwnerAddress: string,
 *   newOwnerAddress: string,
 * }} ChangeOwnerParams
 */

/**
 * @typedef {{
 *   contractAddress?: string,
 *   identity: string,
 *   name: string,
 *   value: string,
 *   validity: number,
 * }} SetAttributeParams
 */

/**
 * @typedef {{
 *   contractAddress?: string,
 *   identity: string,
 *   name: string,
 *   value: string,
 * }} RevokeAttributeParams
 */

module.exports = DidClient
