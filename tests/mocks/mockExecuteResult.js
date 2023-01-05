// @ts-check
'use strict'

const mockExecuteResult = {
  changeController: {
    logs: [
      {
        msg_index: 0,
        log: '',
        events: [
          {
            type: 'execute',
            attributes: [
              {
                key: '_contract_address',
                value: 'grano1g3acw7aumaj3r348cqn4kazrehlmn822w9p46sqwztnke27h3lysyw3jcs'
              }
            ]
          },
          {
            type: 'message',
            attributes: [
              {
                key: 'action',
                value: '/cosmwasm.wasm.v1.MsgExecuteContract'
              },
              { key: 'module', value: 'wasm' },
              {
                key: 'sender',
                value: 'grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev'
              }
            ]
          },
          {
            type: 'wasm',
            attributes: [
              {
                key: '_contract_address',
                value: 'grano1g3acw7aumaj3r348cqn4kazrehlmn822w9p46sqwztnke27h3lysyw3jcs'
              },
              { key: 'executeMsg', value: 'changeController' },
              {
                key: 'identifier',
                value: 'grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev'
              },
              {
                key: 'controller',
                value: 'grano14svund04f69g3ue77d2qc7nf0tye4cf0pm2zum'
              },
              { key: 'previousChange', value: '0' }
            ]
          }
        ]
      }
    ],
    height: 327,
    transactionHash: '2785260C64610FEC416ADB26F0D0AD11D401418B195D113D0595BE5E5878A76D',
    gasWanted: 300000,
    gasUsed: 137574
  },
  setAttribute: {
    logs: [
      {
        msg_index: 0,
        log: '',
        events: [
          {
            type: 'execute',
            attributes: [
              {
                key: '_contract_address',
                value: 'grano1u2zdjcczjrenwmf57fmrpensk4the84azdm05m3unm387rm8asdsyu2kv0'
              }
            ]
          },
          {
            type: 'message',
            attributes: [
              {
                key: 'action',
                value: '/cosmwasm.wasm.v1.MsgExecuteContract'
              },
              { key: 'module', value: 'wasm' },
              {
                key: 'sender',
                value: 'grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev'
              }
            ]
          },
          {
            type: 'wasm',
            attributes: [
              {
                key: '_contract_address',
                value: 'grano1u2zdjcczjrenwmf57fmrpensk4the84azdm05m3unm387rm8asdsyu2kv0'
              },
              { key: 'executeMsg', value: 'setAttribute' },
              {
                key: 'identifier',
                value: 'grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev'
              },
              { key: 'name', value: 'service.id' },
              { key: 'value', value: '#github' },
              { key: 'validTo', value: '1672664197' },
              { key: 'previousChange', value: '0' },
              {
                key: 'from',
                value: 'grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev'
              }
            ]
          }
        ]
      }
    ],
    height: 346,
    transactionHash: '3FCE6A7B4EBEAB0D8DFE2EB783B5A26EFC959BB64A085A332B8C70B71182F0AC',
    gasWanted: 300000,
    gasUsed: 147104
  },
  revokeAttribute: {
    logs: [
      {
        msg_index: 0,
        log: '',
        events: [
          {
            type: 'execute',
            attributes: [
              {
                key: '_contract_address',
                value: 'grano1t7kqn7qlnnh0up2kf2vgkzraa2g52yzgakae2frd9r5w5qmqlr3s2df7j0'
              }
            ]
          },
          {
            type: 'message',
            attributes: [
              {
                key: 'action',
                value: '/cosmwasm.wasm.v1.MsgExecuteContract'
              },
              { key: 'module', value: 'wasm' },
              {
                key: 'sender',
                value: 'grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev'
              }
            ]
          },
          {
            type: 'wasm',
            attributes: [
              {
                key: '_contract_address',
                value: 'grano1t7kqn7qlnnh0up2kf2vgkzraa2g52yzgakae2frd9r5w5qmqlr3s2df7j0'
              },
              { key: 'executeMsg', value: 'revokeAttribute' },
              {
                key: 'identifier',
                value: 'grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev'
              },
              { key: 'name', value: 'service.id' },
              { key: 'value', value: '#github' },
              { key: 'validTo', value: '0' },
              { key: 'previousChange', value: '360' },
              {
                key: 'from',
                value: 'grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev'
              }
            ]
          }
        ]
      }
    ],
    height: 361,
    transactionHash: '60DA5927BDD00CB7A1E699945B83AE68CA708F3A32D7C7656BEF3B1EAFB9E374',
    gasWanted: 300000,
    gasUsed: 139594
  },
}

module.exports = mockExecuteResult
