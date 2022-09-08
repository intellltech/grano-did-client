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

  const address = 'wasm1y0k76dnteklegupzjj0yur6pj0wu9e0z35jafv'
  const identityOwnerQueryResult = await didClient.identityOwner(address)
  console.log(identityOwnerQueryResult)
}

main()

