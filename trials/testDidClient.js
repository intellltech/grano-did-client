// @ts-check
'use strict'

const DidClient = require('../lib/DidClient')
const DidConfig = require('../lib/DidConfig')

const config = DidConfig.create({
  endPoint: 'http://localhost:26657',
})

const main = async () => {
  const didClient = await DidClient.createFulfilled(config)
  const result = await didClient.getChainId()
  console.log(result)
}

main()

