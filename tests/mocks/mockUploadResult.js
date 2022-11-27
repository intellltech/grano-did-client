// @ts-check
'use strict'

const mockUploadResult = {
  originalSize: 197249,
  originalChecksum: 'ab2caed266880d30d3c81f4e269874e9a579bbc6ab31f7ad7a7be7786504bdf0',
  compressedSize: 64085,
  compressedChecksum: '46abb2c3d6a9570111268760fb92183595bdf7844ce01e57cc76f72f64f2c9ce',
  codeId: 9,
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
              value: 'grano14fsulwpdj9wmjchsjzuze0k37qvw7n7am3reev'
            }
          ]
        },
        {
          type: 'store_code',
          attributes: [
            {
              key: 'code_checksum',
              value: 'ab2caed266880d30d3c81f4e269874e9a579bbc6ab31f7ad7a7be7786504bdf0'
            },
            { key: 'code_id', value: '9' }
          ]
        }
      ]
    }
  ],
  height: 803,
  transactionHash: 'F8A15A760690E9EA87E7FC845E12576A27AF66033D9F1C04164DE319A129EE93',
  gasWanted: 1500000,
  gasUsed: 1309729
}

module.exports = mockUploadResult
