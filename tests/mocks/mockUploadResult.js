// @ts-check
'use strict'

const mockUploadResult = {
  originalSize: 177727,
  originalChecksum: 'b879ff58a6ec7d1fbec38a5d7316b2f567c842fb6fb2d192d12b0afad8c81752',
  compressedSize: 57276,
  compressedChecksum: '30cf5cffd3cc6dac7a1bbdeff83c69185dcbdb41de87326711330832ee393904',
  codeId: 13,
  logs: [
    {
      msg_index: 0,
      log: '',
      events: [
        {
          type: 'message',
          attributes: [
            { key: 'action', value: '/cosmwasm.wasm.v1.MsgStoreCode' },
            { key: 'module', value: 'wasm' },
            {
              key: 'sender',
              value: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u'
            }
          ]
        },
        {
          type: 'store_code',
          attributes: [{ key: 'code_id', value: '13' }]
        }
      ]
    }
  ],
  height: 6151,
  transactionHash: '690E86B87C2B9DC9075399CA133A733A45B8B52FB6B8F502BD2D642435349BAC',
  gasWanted: 1500000,
  gasUsed: 1173081
}

module.exports = mockUploadResult
