# Crowd funding

This is a Minor-Project made for the purpose of the 3rd year project evaluation.
The project is made under the guidance and supervision of Dr Vijay Kumar, Department of 
Information Technology, Dr.B R Ambedkar National Institute of Technology. 

The team member are:
Abhishek Kumar (20109003)
Abhijeet Kumar (20124003)
Abhishek Kumar (20124007)
Yogesh Saini (20124117)

### Project features :bulb:

-   [x] User can start a fundraising.
-   [x] Anyone can contribute.
-   [x] End project if targeted contribution amount reached.
-   [x] Expire project if targeted amount not fulfills between deadline.
-   [x] Contributors can withdraw contributed amount if project expire.
-   [x] Owner need to request contributors for withdraw amount.
-   [x] Owner can withdraw amount if 50% contributors agree.
-   [x] Owner can put updates regarding the project.
-   [x] Connect with wallet.

### Tech stack & packages used 📦

 [Next.js](https://nextjs.org/docs/getting-started)              
 [solidity](https://docs.soliditylang.org/en/v0.8.13/)           
 [tailwind css](https://tailwindcss.com/docs/installation)       
 [ether.js](https://docs.ethers.io/v5/)                          
 [web3.js](https://www.npmjs.com/package/web3)                   
 [Chai](https://www.npmjs.com/package/chai)                      
 [react-toastify](https://www.npmjs.com/package/react-toastify)  
 [hardhat](https://www.npmjs.com/package/hardhat)                
 [Redux](https://www.npmjs.com/package/hardhat)                  

---

### How to run :runner: :

-   Run hardhat node
    ```
    npx hardhat node
    ```
    ```
-   Deploy contract in local hardhat node
    ```
    npx hardhat run scripts/deploy.js --network localhost
    ```
-   Connect hardhat with metamask
-   Run Next.js frontend
    ```
    cd client
    npm run dev
    ```



### Hardhat commands

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/deploy.js
npx hardhat help
npx hardhat run scripts/deploy.js --network <network name>
```


