// @ts-check
'use strict'

const mockConnectWithSignerResult = {
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

module.exports = mockConnectWithSignerResult
