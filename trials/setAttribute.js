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
  const response = await didClient.setAttribute(address,'age', '20', 100)
  const wasmEvent = response.logs[0].events.find((e) => e.type === 'wasm')
  console.log(wasmEvent)
  console.log(JSON.stringify(response))
}

main()

