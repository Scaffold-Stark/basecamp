use contracts::YourContract::YourContract::{FELT_ETH_CONTRACT, FELT_STRK_CONTRACT};
use contracts::YourContract::{IYourContractDispatcher, IYourContractDispatcherTrait};
use openzeppelin_testing::declare_and_deploy;
use openzeppelin_token::erc20::interface::{IERC20Dispatcher, IERC20DispatcherTrait};
use openzeppelin_utils::serde::SerializedAppend;
use snforge_std::{CheatSpan, cheat_caller_address};
use starknet::ContractAddress;

// Real wallet address deployed on Mainnet
const OWNER: ContractAddress = 0x00c853dC4D9141DC6192FeCc999cC7333348Ab4fDCEf97B760ECb63A7FDE1c0e
    .try_into()
    .unwrap();

const STRK_TOKEN_CONTRACT_ADDRESS: ContractAddress = FELT_STRK_CONTRACT.try_into().unwrap();
const ETH_TOKEN_CONTRACT_ADDRESS: ContractAddress = FELT_ETH_CONTRACT.try_into().unwrap();
fn deploy_contract(name: ByteArray) -> ContractAddress {
    let mut calldata = array![];
    calldata.append_serde(OWNER);
    declare_and_deploy(name, calldata)
}

#[test]
fn test_set_greetings() {
    let contract_address = deploy_contract("YourContract");

    let dispatcher = IYourContractDispatcher { contract_address };

    let current_greeting = dispatcher.greeting();
    let expected_greeting: ByteArray = "Building Unstoppable Apps!!!";
    assert(current_greeting == expected_greeting, 'Should have the right message');

    let new_greeting: ByteArray = "Learn Scaffold-Stark 2! :)";
    dispatcher
        .set_greeting(
            new_greeting.clone(), Option::None, Option::None,
        ); // we dont transfer any fri/wei
    assert(dispatcher.greeting() == new_greeting, 'Should allow set new message');
}

#[test]
#[fork("MAINNET_LATEST")]
fn test_transfer_eth() {
    let user: ContractAddress = OWNER.try_into().unwrap();
    let your_contract_address = deploy_contract("YourContract");

    let your_contract_dispatcher = IYourContractDispatcher {
        contract_address: your_contract_address,
    };
    let erc20_dispatcher = IERC20Dispatcher { contract_address: ETH_TOKEN_CONTRACT_ADDRESS };
    let amount_to_transfer = 500;
    cheat_caller_address(ETH_TOKEN_CONTRACT_ADDRESS, user, CheatSpan::TargetCalls(1));
    erc20_dispatcher.approve(your_contract_address, amount_to_transfer);
    let approved_amount = erc20_dispatcher.allowance(user, your_contract_address);
    assert(approved_amount == amount_to_transfer, 'Not the right amount approved');

    let new_greeting: ByteArray = "Learn Scaffold-Stark 2! :)";

    cheat_caller_address(your_contract_address, user, CheatSpan::TargetCalls(1));
    your_contract_dispatcher
        .set_greeting(
            new_greeting.clone(),
            Option::Some(amount_to_transfer),
            Option::Some(ETH_TOKEN_CONTRACT_ADDRESS),
        ); // we transfer 500 wei
    assert(your_contract_dispatcher.greeting() == new_greeting, 'Should allow set new message');
}

#[test]
#[fork("MAINNET_LATEST")]
fn test_transfer_strk() {
    let user: ContractAddress = OWNER.try_into().unwrap();
    let your_contract_address = deploy_contract("YourContract");

    let your_contract_dispatcher = IYourContractDispatcher {
        contract_address: your_contract_address,
    };
    let erc20_dispatcher = IERC20Dispatcher { contract_address: STRK_TOKEN_CONTRACT_ADDRESS };
    let amount_to_transfer = 500;
    cheat_caller_address(STRK_TOKEN_CONTRACT_ADDRESS, user, CheatSpan::TargetCalls(1));
    erc20_dispatcher.approve(your_contract_address, amount_to_transfer);
    let approved_amount = erc20_dispatcher.allowance(user, your_contract_address);
    assert(approved_amount == amount_to_transfer, 'Not the right amount approved');

    let new_greeting: ByteArray = "Learn How to handle Some and None in Cairo";
    cheat_caller_address(your_contract_address, user, CheatSpan::TargetCalls(1));
    your_contract_dispatcher
        .set_greeting(
            new_greeting.clone(),
            Option::Some(amount_to_transfer),
            Option::Some(STRK_TOKEN_CONTRACT_ADDRESS),
        ); // we transfer 500 fri
    assert(your_contract_dispatcher.greeting() == new_greeting, 'Should allow set new message');
}
