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

  const identityOwnerParams = {
    address: 'wasm1edz508tre9d9n9nf8r82prpafhds9v6dp0su0y'
  }
  const identityOwnerQueryResult = await didClient.identityOwner(identityOwnerParams)
  console.log(identityOwnerQueryResult)
}

main()

