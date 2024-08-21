import hre from "hardhat";
import { Contract } from "ethers";
import { strict as assert } from "assert";
import Deployments from "../ignition/modules/DeploymentsModule";

describe("CrossChainNameService", function () {
  let ccnsRegister: Contract;
  let ccnsReceiver: Contract;
  let ccnsLookupSource: Contract;
  let ccnsLookupReceiver: Contract;
  let aliceAddress: string;

  before(async function () {
    // Deploy the contracts using Ignition
    const deployments = await hre.ignition.deploy(Deployments);

    // Retrieve deployed contract instances
    ccnsRegister = deployments.ccnsRegister;
    ccnsReceiver = deployments.ccnsReceiver;
    ccnsLookupSource = deployments.ccnsLookupSource;
    ccnsLookupReceiver = deployments.ccnsLookupReceiver;

    // Define Alice's EOA
    const [aliceSigner] = await hre.ethers.getSigners();
    aliceAddress = aliceSigner.address;
  });

  it("should register and lookup alice.ccns", async function () {
    const aliceName = "alice.ccns";

    // Register the name on the "souce" chain
    const registerTx = await ccnsRegister.register(aliceName);
    await registerTx.wait();

    // Lookup the name on the "destination" chain
    const result = await ccnsLookupReceiver.lookup(aliceName);

    // Assert that the returned address matches Alice's address using Node.js's assert module
    assert.equal(result, aliceAddress, "The lookup address should match Alice's address");
  });
});
