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

  const contractAddress = instantiateResult.contractAddress

  const identifierAddress = 'wasm14fsulwpdj9wmjchsjzuze0k37qvw7n7a7l207u'
  const newContollerAddress = 'wasm1y0k76dnteklegupzjj0yur6pj0wu9e0z35jafv'

  const contollerParams = {
    contractAddress: contractAddress,
    identifier: identifierAddress
  }

  const firstControllerQueryResult = await granoDidClient.controller(contollerParams)
  console.log(firstControllerQueryResult)


  const changeContollerParams = {
    contractAddress: contractAddress,
    identifier: identifierAddress,
    newController: newContollerAddress,
  }

  const changeControllerResult = await granoDidClient.changeController(changeContollerParams)
  console.dir(changeControllerResult, { depth: null })


  const secondControllerQueryResult = await granoDidClient.controller(contollerParams)
  console.log(secondControllerQueryResult)
}

main()

