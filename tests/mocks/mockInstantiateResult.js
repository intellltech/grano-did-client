// @ts-check
'use strict'

const mockInstantiateResult = {
  contractAddress: 'grano1d2r4s2q8kumpmvx6dyj77klhgm5e6fs9njmmz6ye7ukqa77ddtds2yaejd',
  logs: [
    {
      msg_index: 0,
      log: '',
      events: [
        {
          type: 'instantiate',
          attributes: [
            {
              key: '_contract_address',
              value: 'grano1d2r4s2q8kumpmvx6dyj77klhgm5e6fs9njmmz6ye7ukqa77ddtds2yaejd'
            },
            { key: 'code_id', value: '10' }
          ]
        },
        {
          type: 'message',
          attributes: [
            {
              key: 'action',
              value: '/cosmwasm.wasm.v1.MsgInstantiateContract'
            },
            { key: 'module', value: 'wasm' },
            {
              key: 'sender',
              value: 'grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev'
            }
          ]
        }
      ]
    }
  ],
  height: 822,
  transactionHash: 'E1E576AE178F9CA8463808A3FE7383A612B239AFEE6401C622F4E0448C86EA29',
  gasWanted: 500000,
  gasUsed: 152770
}

module.exports = mockInstantiateResult
