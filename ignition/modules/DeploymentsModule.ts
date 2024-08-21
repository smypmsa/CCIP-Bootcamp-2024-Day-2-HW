import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("Deployments", (m) => {
    // Deploy CCIP Local Simulator
    const ccipSimulator = m.contract("CCIPLocalSimulator", []);

    // Retrieve configuration properties from the simulator using theit indices
    const chainSelector = m.staticCall(ccipSimulator, "configuration", [], 0, {id: "GetChainSelector"});
    const sourceRouter = m.staticCall(ccipSimulator, "configuration", [], 1, {id: "GetSourceRouter"});
    const destinationRouter = m.staticCall(ccipSimulator, "configuration", [], 2, {id: "GetDestinationRouter"});

    // Deploy CCNS contracts - a Lookup contract and then a corresponding Register or Receiver
    const ccnsLookupSource = m.contract("CrossChainNameServiceLookup", [], {id: "SourceLookup"});
    const ccnsRegister = m.contract("CrossChainNameServiceRegister", [sourceRouter, ccnsLookupSource], {id: "Register"});

    const ccnsLookupReceiver = m.contract("CrossChainNameServiceLookup", [], {id: "DestinationLookup"});
    const ccnsReceiver = m.contract("CrossChainNameServiceReceiver", [destinationRouter, ccnsLookupReceiver, chainSelector], {id: "Receiver"});

    // Enable chain on Register
    m.call(ccnsRegister, "enableChain", [chainSelector, ccnsReceiver, 500000]);

    // Set CCNS addresses
    m.call(ccnsLookupSource, "setCrossChainNameServiceAddress", [ccnsRegister]);
    m.call(ccnsLookupReceiver, "setCrossChainNameServiceAddress", [ccnsReceiver]);

    return {
        ccipSimulator,
        ccnsRegister,
        ccnsReceiver,
        ccnsLookupSource,
        ccnsLookupReceiver,
    }
});