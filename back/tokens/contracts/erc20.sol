// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MimMimToken is ERC20 {
    address private _owner;

    constructor(uint256 initialSupply_) ERC20("MimMimToken", "MMT") {
        _owner = _msgSender();
        _mint(_owner, initialSupply_);
    }

    modifier onlyOwner() {
        require(
            _msgSender() == _owner,
            "Only Owner allowed to call this function"
        );
        _;
    }

    function mint(uint256 amount) public onlyOwner returns (bool) {
        _mint(_owner, amount);
        return true;
    }

    function mint(address account, uint256 amount)
        public
        onlyOwner
        returns (bool)
    {
        _mint(account, amount);
        return true;
    }

    function burn(uint256 amount) public onlyOwner returns (bool) {
        _burn(_owner, amount);
        return true;
    }

    function burn(address account, uint256 amount)
        public
        onlyOwner
        returns (bool)
    {
        _burn(account, amount);
        return true;
    }
}
