// @ts-check
'use strict'

const DidClient = require('../lib/DidClient')
const DidConfig = require('../lib/DidConfig')
const { mockDidConfig } =require('./../tests/mocks/MockDidConfig')


const main = async () => {
  const didClient = await DidClient.createFulfilled(mockDidConfig)
  const wasmPath = './wasm/did_contract.wasm'
  const result = await didClient.upload(wasmPath)

  const instantiateParams = {
    codeId: result.codeId
  }
  await didClient.instantiate(instantiateParams)

  const address = 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u'

  const setAttributeParams = {
    identity: address,
    name: 'age',
    value: '20',
    validity: 100,
  }
  const setAttributeResponse = await didClient.setAttribute(setAttributeParams)
  const wasmSetAttributeEvent = setAttributeResponse.logs[0].events.find((e) => e.type === 'wasm')
  console.log(wasmSetAttributeEvent)

  const revokeAttributeParams = {
    identity: address,
    name: 'age',
    value: '20',
  }

  const revokeAttributeResponse = await didClient.revokeAttribute(revokeAttributeParams)
  const wasmRevokeAttributeEvent = revokeAttributeResponse.logs[0].events.find((e) => e.type === 'wasm')
  console.log(wasmRevokeAttributeEvent)
}

main()

