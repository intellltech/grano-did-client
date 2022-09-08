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

  const oldOwnerAddress = 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u'
  const newOwnerAddress = 'wasm1y0k76dnteklegupzjj0yur6pj0wu9e0z35jafv'
  const identityOwnerQueryForOldAddressResult = await didClient.identityOwner(oldOwnerAddress)
  console.log(identityOwnerQueryForOldAddressResult)
  const response = await didClient.changeOwner(oldOwnerAddress, newOwnerAddress)
  console.log(response)
  const identityOwnerQueryForNewAddressResult = await didClient.identityOwner(oldOwnerAddress)
  console.log(identityOwnerQueryForNewAddressResult)
}

main()

