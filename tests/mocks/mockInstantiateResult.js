// @ts-check
'use strict'

const mockInstantiateResult = {
  contractAddress: 'wasm1agfn5vwde9nn8nhj237a2y94f5kaxn2nccr3xcpy6g8yc4whl4uq7qmf7k',
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
              value: 'wasm1agfn5vwde9nn8nhj237a2y94f5kaxn2nccr3xcpy6g8yc4whl4uq7qmf7k'
            },
            { key: 'code_id', value: '37' }
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
              value: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u'
            }
          ]
        }
      ]
    }
  ],
  height: 11168,
  transactionHash: '440ED066780EFA8BA23A6010E6DE6D7981534575E478235D1CE728D78C699ECC',
  gasWanted: 500000,
  gasUsed: 151564
}

module.exports = mockInstantiateResult
