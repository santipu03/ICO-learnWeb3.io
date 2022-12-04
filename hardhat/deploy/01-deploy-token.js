const { network } = require("hardhat")
const { WHITELIST_CONTRACT_ADDRESS, METADATA_URL } = require("../constants")
const { verify } = require("../utils/verify")
const { CRYPTO_DEVS_NFT_CONTRACT_ADDRESS } = require("../constants")

const developmentChains = ["localhost", "hardhat"]

module.exports = async ({ deployments, getNamedAccounts }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    // Address of the deployed Crypto Devs NFT collection in Goerli
    const args = [CRYPTO_DEVS_NFT_CONTRACT_ADDRESS]

    const cryptoDevToken = await deploy("CryptoDevToken", {
        from: deployer,
        args: args,
        log: true,
    })

    log(`Crypto Devs Token Contract Address: ${cryptoDevToken.address}`)

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await verify(cryptoDevToken.address, args)
    }

    log("-------------------------------------")
}
