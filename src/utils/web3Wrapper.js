/* global ethereum */

import Web3 from 'web3'

let usingInfura = false

export async function getWeb3Instance () {
  console.log('Connecting to MM')
  let web3
  if (window.ethereum) {
    web3 = new Web3(ethereum)
    await window.ethereum.enable()
  } else if (window.web3) {
    web3 = new Web3(web3.currentProvider)
  } else {
    console.log('Infura node')
    const rpcUrl = 'https://mainnet.infura.io/v3/119dddbcfe69465c830db6f165505bd3'
    web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl))

    usingInfura = true
  }
  return web3
}

export async function getMainAccount (web3) {
  if (usingInfura) {
    return undefined
  } else {
    const currentAccounts = await web3.eth.getAccounts()
    return currentAccounts[0]
  }
}
