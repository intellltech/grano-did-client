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

  const oldOwnerAddress = 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u'
  const newOwnerAddress = 'wasm1y0k76dnteklegupzjj0yur6pj0wu9e0z35jafv'

  const oldIdentityOwnerParams = {
    address: oldOwnerAddress
  }

  const identityOwnerQueryForOldAddressResult = await didClient.identityOwner(oldIdentityOwnerParams)
  console.log(identityOwnerQueryForOldAddressResult)


  const changeOwnerParams = {
    oldOwnerAddress: oldOwnerAddress,
    newOwnerAddress: newOwnerAddress,
  }

  const response = await didClient.changeOwner(changeOwnerParams)
  console.log(response)

  const newIdentityOwnerParams = {
    address: newOwnerAddress
  }

  const identityOwnerQueryForNewAddressResult = await didClient.identityOwner(newIdentityOwnerParams)
  console.log(identityOwnerQueryForNewAddressResult)
}

main()

