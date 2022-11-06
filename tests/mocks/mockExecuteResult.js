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
                value: 'wasm1rrrc5dtyy632tm0az2gqem96943er69vd2twra56xe7gr6y52wfqw7qqm8'
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
                value: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u'
              }
            ]
          },
          {
            type: 'wasm',
            attributes: [
              {
                key: '_contract_address',
                value: 'wasm1rrrc5dtyy632tm0az2gqem96943er69vd2twra56xe7gr6y52wfqw7qqm8'
              },
              {
                key: 'identifier',
                value: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u'
              },
              {
                key: 'controller',
                value: 'wasm1y0k76dnteklegupzjj0yur6pj0wu9e0z35jafv'
              },
              { key: 'previousChange', value: '0' }
            ]
          }
        ]
      }
    ],
    height: 11772,
    transactionHash: '166D65AD249937E8C57C0D264C258E8B315706C7D73E89091385A18B0F5C0DA6',
    gasWanted: 300000,
    gasUsed: 137265
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
                value: 'wasm1napx452awu78vndg7t6nk26zhdct40wz7ha2r5t6a8hlv4a0lcmsnapnqc'
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
                value: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u'
              }
            ]
          },
          {
            type: 'wasm',
            attributes: [
              {
                key: '_contract_address',
                value: 'wasm1napx452awu78vndg7t6nk26zhdct40wz7ha2r5t6a8hlv4a0lcmsnapnqc'
              },
              {
                key: 'identifier',
                value: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u'
              },
              { key: 'name', value: 'service.id' },
              { key: 'value', value: '#github' },
              { key: 'validTo', value: '1667825742.818354895' },
              { key: 'previousChange', value: '0' },
              {
                key: 'from',
                value: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u'
              }
            ]
          }
        ]
      }
    ],
    height: 12078,
    transactionHash: '963DAC31DEB8C9B4B1FE20B2B6568CDB7546CD3006A948F7E874983DD418786E',
    gasWanted: 300000,
    gasUsed: 131353
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
                value: 'wasm1kxgfrn4sxwdrlptxslq7ul2dem6ugxc98dxftzkvghmqtgv8z76sz7tkep'
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
                value: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u'
              }
            ]
          },
          {
            type: 'wasm',
            attributes: [
              {
                key: '_contract_address',
                value: 'wasm1kxgfrn4sxwdrlptxslq7ul2dem6ugxc98dxftzkvghmqtgv8z76sz7tkep'
              },
              {
                key: 'identifier',
                value: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u'
              },
              { key: 'name', value: 'service.id' },
              { key: 'value', value: '#github' },
              { key: 'validTo', value: '0' },
              { key: 'previousChange', value: '12207' },
              {
                key: 'from',
                value: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u'
              }
            ]
          }
        ]
      }
    ],
    height: 12208,
    transactionHash: 'E5D34C4E40D219C1EBAB462B983596CB405576A46A977142ADB22C30835A2A49',
    gasWanted: 300000,
    gasUsed: 131202
  },
}

module.exports = mockExecuteResult
