// @ts-check
'use strict'

const DidClient = require('../lib/DidClient')
const DidConfig = require('../lib/DidConfig')
const { mockDidConfig } =require('./../tests/mocks/MockDidConfig')


const main = async () => {
  const didClient = await DidClient.createFulfilled(mockDidConfig)
  const wasmPath = './wasm/did_contract.wasm'
  const result = await didClient.upload(wasmPath)

  const codeId = result.codeId
  await didClient.instantiate(codeId)

  const address = 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u'
  const setAttributeResponse = await didClient.setAttribute(address,'age', '20', 100)
  const wasmSetAttributeEvent = setAttributeResponse.logs[0].events.find((e) => e.type === 'wasm')
  console.log(wasmSetAttributeEvent)

  const revokeAttributeResponse = await didClient.revokeAttribute(address,'age', '20')
  const wasmRevokeAttributeEvent = revokeAttributeResponse.logs[0].events.find((e) => e.type === 'wasm')
  console.log(wasmRevokeAttributeEvent)
}

main()

