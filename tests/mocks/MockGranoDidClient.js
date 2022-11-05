// @ts-check
'use strict'

const fs = require('fs')
const { calculateFee, GasPrice } = require('@cosmjs/stargate')

const { mockGranoDidConfig } = require('./MockGranoDidConfig')

const mockSigningCosmWasmClient = {
  client: {
    codesCache: {},
    tmClient: { client: { url: 'http://localhost:26657' } },
    queryClient: {
      tmClient: { client: { url: 'http://localhost:26657' } },
      auth: {},
      bank: {},
      wasm: {},
      tx: {}
    },
    registry: { types: {} },
    aminoTypes: {
      register: {
        '/cosmwasm.wasm.v1.MsgStoreCode': { aminoType: 'wasm/MsgStoreCode' },
        '/cosmwasm.wasm.v1.MsgInstantiateContract': { aminoType: 'wasm/MsgInstantiateContract' },
        '/cosmwasm.wasm.v1.MsgUpdateAdmin': { aminoType: 'wasm/MsgUpdateAdmin' },
        '/cosmwasm.wasm.v1.MsgClearAdmin': { aminoType: 'wasm/MsgClearAdmin' },
        '/cosmwasm.wasm.v1.MsgExecuteContract': { aminoType: 'wasm/MsgExecuteContract' },
        '/cosmwasm.wasm.v1.MsgMigrateContract': { aminoType: 'wasm/MsgMigrateContract' },
        '/cosmos.bank.v1beta1.MsgSend': { aminoType: 'cosmos-sdk/MsgSend' },
        '/cosmos.bank.v1beta1.MsgMultiSend': { aminoType: 'cosmos-sdk/MsgMultiSend' }
      }
    },
    signer: {
      secret: {
        data: 'estategiraffeiconfebruarygoatobserveactorleftarmedzonemillionnotesystemmythcoconutseriescalmsteakdinosaurtwinimmunemansionmorningdrastic'
      },
      seed: {
        0: 184,
        1: 234,
        2: 60,
        3: 176,
        4: 233,
        5: 198,
        6: 80,
        7: 243,
        8: 21,
        9: 91,
        10: 43,
        11: 161,
        12: 38,
        13: 207,
        14: 67,
        15: 180,
        16: 17,
        17: 8,
        18: 54,
        19: 223,
        20: 161,
        21: 207,
        22: 171,
        23: 135,
        24: 218,
        25: 221,
        26: 243,
        27: 183,
        28: 6,
        29: 15,
        30: 124,
        31: 103,
        32: 30,
        33: 14,
        34: 19,
        35: 234,
        36: 239,
        37: 14,
        38: 227,
        39: 182,
        40: 167,
        41: 62,
        42: 102,
        43: 8,
        44: 228,
        45: 10,
        46: 145,
        47: 90,
        48: 229,
        49: 217,
        50: 193,
        51: 62,
        52: 198,
        53: 40,
        54: 219,
        55: 255,
        56: 53,
        57: 129,
        58: 247,
        59: 243,
        60: 92,
        61: 186,
        62: 19,
        63: 241
      },
      accounts: [
        {
          hdPath: [
            { data: 2147483692 },
            { data: 2147483766 },
            { data: 2147483648 },
            { data: 0 },
            { data: 0 }
          ],
          prefix: 'wasm'
        }
      ]
    }
  },
}

/**
 * GranoDidClient.
 */
class MockGranoDidClient {
  /**
   * constructor
   *
   * @param {GranoDidClientInstanceParams} params
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
   * @param {GranoDidClientInstanceParams} params
   * @returns {MockGranoDidClient} - Instance of this class.
   */
  static create (params = {}) {
    return new this(params)
  }

  /**
   * create.
   *
   * @param {GranoDidConfigInstanceParams} config
   * @returns {Promise<MockGranoDidClient>} - Instance of this class.
   */
  static async createFulfilled (config = mockGranoDidConfig) {
    return this.create({
      signingCosmWasmClient: mockSigningCosmWasmClient,
      didConfig: config,
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
    const queryMsg = {
      controller: {
        identifier: controllerParams.address
      }
    }

    const queryParams = {
      contractAddress: controllerParams.contractAddress ?? this.contractAddress,
      queryMsg: queryMsg
    }

    return this._query(queryParams)
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
 *   signingCosmWasmClient?: object,
 *   didConfig?: object,
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
 *   contractAddress?: string,
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

module.exports = MockGranoDidClient
