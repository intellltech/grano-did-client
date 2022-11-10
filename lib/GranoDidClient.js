// @ts-check
'use strict'

const { SigningCosmWasmClient } = require('@cosmjs/cosmwasm-stargate')
const { DirectSecp256k1HdWallet } = require('@cosmjs/proto-signing')
const { calculateFee, GasPrice } = require('@cosmjs/stargate')
const fs = require('fs')

const GranoDidConfig = require('./GranoDidConfig')
const QueryControllerPayload = require('./payload/QueryControllerPayload')
const QueryAttributePayload = require('./payload/QueryAttributePayload')
const ExecuteChangeControllerPayload = require('./payload/ExecuteChangeControllerPayload')
const ExecuteSetAttributePayload = require('./payload/ExecuteSetAttributePayload')
const ExecuteRevokeAttributePayload = require('./payload/ExecuteRevokeAttributePayload')

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
   * upload.
   *
   * @param {{
   *   wasmPath: string
   *   fee?: import('@cosmjs/stargate').StdFee
   *   memo?: string
   * }} uploadParams
   */
  async upload ({
    wasmPath,
    fee,
    memo = 'upload the contract',
  }) {
    const wasm = fs.readFileSync(wasmPath)
    const gasPrice = GasPrice.fromString(`0.025${this.config.denom}`)
    const uploadFee = fee ?? calculateFee(1_500_000, gasPrice)

    return this.client.upload(this.config.fromAddress, wasm, uploadFee, memo)
  }

  /**
   * instantiate.
   *
   * @param {{
   *   codeId: number
   *   instantiateMsg?: object
   *   fee?: import('@cosmjs/stargate').StdFee
   *   memo?: string,
   * }} instantiateParam
   */
  async instantiate ({
    codeId,
    instantiateMsg = {},
    fee,
    memo = 'instantiate the contract',
  }) {
    const gasPrice = GasPrice.fromString(`0.025${this.config.denom}`)
    const instantiateFee = fee ?? calculateFee(500_000, gasPrice)

    return this.client.instantiate(
      this.config.fromAddress,
      codeId,
      instantiateMsg,
      memo,
      instantiateFee
    )
  }

  /**
   * _query.
   *
   * @param {{
   *   contractAddress: string
   *   queryMsg: object
   * }} queryParams
   */
  async _query ({
    contractAddress,
    queryMsg,
  }) {
    return this.client.queryContractSmart(
      contractAddress,
      queryMsg,
    )
  }

  /**
   * _execute.
   *
   * @param {{
   *   contractAddress: string
   *   executeMsg: object
   *   fee?: import('@cosmjs/stargate').StdFee
   *   memo?: string
   * }} executeParams
   */
  async _execute ({
    contractAddress,
    executeMsg,
    fee,
    memo = 'execute the contract',
  }) {
    const gasPrice = GasPrice.fromString(`0.025${this.config.denom}`)
    const executeFee = fee ?? calculateFee(300_000, gasPrice)

    return this.client.execute(
      this.config.fromAddress,
      contractAddress,
      executeMsg,
      executeFee,
      memo,
    )
  }

  /**
   * controller.
   *
   * @param {import('./payload/QueryControllerPayload').QueryControllerPayloadInstanceParams} controllerParams
   */
  async controller (controllerParams) {
    const queryControllerPayload = QueryControllerPayload.create(controllerParams)

    return this._query(queryControllerPayload.buildParams())
  }

  /**
   * attribute.
   *
   * @param {import('./payload/QueryAttributePayload').QueryAttributePayloadInstanceParams} attributeParam
   */
  async attribute (attributeParam) {
    const queryAttributePayload = QueryAttributePayload.create(attributeParam)

    return this._query(queryAttributePayload.buildParams())
  }

  /**
   * changeController.
   *
   * @param {import('./payload/ExecuteChangeControllerPayload').ExecuteChangeControllerPayloadInstanceParams} changeControllerParams
   */
  async changeController (changeControllerParams) {
    const executeChangeControllerPayload = ExecuteChangeControllerPayload.create(changeControllerParams)

    return this._execute(executeChangeControllerPayload.buildParams())
  }

  /**
   * setAttribute.
   *
   * @param {import('./payload/ExecuteSetAttributePayload').ExecuteSetAttributePayloadInstanceParams} setAttributeParams
   */
  async setAttribute (setAttributeParams) {
    const executeSetAttributePayload = ExecuteSetAttributePayload.create(setAttributeParams)

    return this._execute(executeSetAttributePayload.buildParams())
  }

  /**
   * revokeAttribute.
   *
   * @param {import('./payload/ExecuteRevokeAttributePayload').ExecuteRevokeAttributePayloadInstanceParams} revokeAttributeParams
   */
  async revokeAttribute (revokeAttributeParams) {
    const executeRevokeAttributePayload = ExecuteRevokeAttributePayload.create(revokeAttributeParams)

    return this._execute(executeRevokeAttributePayload.buildParams())
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

module.exports = GranoDidClient
