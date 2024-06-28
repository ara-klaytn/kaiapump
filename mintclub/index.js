const { mintclub } = require('mint.club-v2-sdk')

const stepData = [
    { rangeTo: 50, price: 0 }, // Since price is 0, the first 50 tokens will be allocated to the creator
    { rangeTo: 100, price: 0.01 }, // 0.01 WETH for the next 50 tokens
    { rangeTo: 1000, price: 0.1 }, // 0.1 WETH for the next 900 tokens
    { rangeTo: 10_000, price: 1 }, // 1 WETH for the next 9000 tokens
]

const curveData = {
    curveType: 'LINEAR',
    stepCount: 10,
    maxSupply: 10_000,
    initialMintingPrice: 0.01, // 0.01 WETH 
    finalMintingPrice: 0.1, // 0.1 WETH
    creatorAllocation: 100,
}


async function main() {

    const AraToken = await mintclub
        .network("klaytn")
        .token('ARAA')
        .create({
            name: 'Ara token',
            reserveToken: {
                address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // mainnet WETH token address 
                decimals: 18,
            },
            curveData,
            onError: (error) => {
                console.error('Error creating token', error)
            }
        })

    console.log(AraToken)

}

main()