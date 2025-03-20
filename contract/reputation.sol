// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract ReputationSystem {
    struct User {
        uint256 reputation;
        bool exists;
    }

    mapping(address => User) private users;
    address public owner;

    event ReputationUpdated(address indexed user, uint256 newReputation);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function registerUser(address _user) external onlyOwner {
        require(!users[_user].exists, "User already registered");
        users[_user] = User({ reputation: 0, exists: true });
    }

    function updateReputation(address _user, uint256 _newReputation) external onlyOwner {
        require(users[_user].exists, "User not registered");
        users[_user].reputation = _newReputation;
        emit ReputationUpdated(_user, _newReputation);
    }

    function getReputation(address _user) external view returns (uint256) {
        require(users[_user].exists, "User not registered");
        return users[_user].reputation;
    }
}

