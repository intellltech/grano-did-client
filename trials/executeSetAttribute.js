// @ts-check
'use strict'

const GranoDidClient = require('../lib/GranoDidClient')
const GranoDidConfig = require('../lib/GranoDidConfig')
const { mockGranoDidConfig } =require('./../tests/mocks/MockGranoDidConfig')


const main = async () => {
  const granoDidClient = await GranoDidClient.createFulfilled({
    config: mockGranoDidConfig,
  })
  const wasmPath = './wasm/did_contract.wasm'
  const result = await granoDidClient.upload({ wasmPath: wasmPath })

  const instantiateParams = {
    codeId: result.codeId
  }
  const instantiateResult = await granoDidClient.instantiate(instantiateParams)

  const setAttributeParams = {
    contractAddress: instantiateResult.contractAddress,
    identifier: 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u',
    name: 'service.id',
    value: '#github',
    validity: 3600 * 24 // second
  }

  const setAttributeResult = await granoDidClient.setAttribute(setAttributeParams)
  console.dir(setAttributeResult, { depth: null })
}

main()

