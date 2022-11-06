// @ts-check
'use strict'

const { SigningCosmWasmClient } = require('@cosmjs/cosmwasm-stargate')
const { DirectSecp256k1HdWallet } = require('@cosmjs/proto-signing')
const { calculateFee, GasPrice } = require('@cosmjs/stargate')
const fs = require('fs')

const GranoDidConfig = require('./GranoDidConfig')
const QueryControllerPayload = require('./payload/QueryControllerPayload')

/**
 * GranoDidClient.
 */
class GranoDidClient {
  /**
   * constructor
   *
   * @param {GranoDidClientInstanceParams} params
   */
  constructor ({
    signingCosmWasmClient,
    granoDidConfig,
  } = {}) {
    this.client = signingCosmWasmClient
    this.config = granoDidConfig
  }

  /**
   * create.
   *
   * @param {GranoDidClientInstanceParams} params
   * @returns {GranoDidClient} - Instance of this class.
   */
  static create (params = {}) {
    return new this(params)
  }

  /**
   * create.
   *
   * @param {{
   *  OriginalSigningCosmWasmClient?: typeof SigningCosmWasmClient,
   *  config?: GranoDidConfigInstanceParams,
   * }} params
   * @returns {Promise<GranoDidClient>} - Instance of this class.
   */
  static async createFulfilled ({
    OriginalSigningCosmWasmClient = SigningCosmWasmClient,
    config = GranoDidConfig.create(),
  } = {}) {
    const granoDidConfig = GranoDidConfig.create(config)
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(granoDidConfig.mnemonic, { prefix: granoDidConfig.prefix })
    const signingCosmWasmClient = await OriginalSigningCosmWasmClient.connectWithSigner(granoDidConfig.endPoint, wallet)

    return this.create({
      signingCosmWasmClient,
      granoDidConfig,
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
   * controller.
   *
   * @param {ControllerParams} controllerParams
   */
  async controller (controllerParams) {
    const queryControllerPayload = QueryControllerPayload.create(controllerParams)

    return this._query(queryControllerPayload.buildParams())
  }

  /**
   * changeController.
   *
   * @param {ChangeControllerParams} changeControllerParams
   */
  async changeController (changeControllerParams) {
    const executeMsg = {
      change_controller: {
        identifier: changeControllerParams.oldControllerAddress,
        new_controller: changeControllerParams.newControllerAddress,
      }
    }

    const executeParams = {
      contractAddress: changeControllerParams.contractAddress ?? this.contractAddress,
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
        identifier: setAttributeParams.identifier,
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
        identifier: revokeAttributeParams.identifier,
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
 *   granoDidConfig?: GranoDidConfig,
 * }} GranoDidClientInstanceParams
 */

/**
 * @typedef {{
 *   endPoint?: string,
 *   denom?: string,
 *   mnemonic?: string,
 *   prefix?: string,
 *   fromAddress?: string,
 * }} GranoDidConfigInstanceParams
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
 *   contractAddress: string,
 *   address: string,
 * }} ControllerParams
 */

/**
 * @typedef {{
 *   contractAddress?: string,
 *   oldControllerAddress: string,
 *   newControllerAddress: string,
 * }} ChangeControllerParams
 */

/**
 * @typedef {{
 *   contractAddress?: string,
 *   identifier: string,
 *   name: string,
 *   value: string,
 *   validity: number,
 * }} SetAttributeParams
 */

/**
 * @typedef {{
 *   contractAddress?: string,
 *   identifier: string,
 *   name: string,
 *   value: string,
 * }} RevokeAttributeParams
 */

module.exports = GranoDidClient
