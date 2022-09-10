// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "../../node_modules/@openzeppelin/contracts/token/ERC777/ERC777.sol";

contract FungibleToken is ERC777 {
    address private _owner;
    bool private _active;

    bool private _mintable;
    bool private _burnable;
    bool private _pausable;

    event Paused(address account);
    event Resumed(address account);
    event NewOptions(
        address account,
        bool mintable,
        bool burnable,
        bool pausable
    );

    constructor(
        string memory name_,
        string memory symbol_,
        uint256 initialSupply_,
        address[] memory defaultOperators_
    ) ERC777(name_, symbol_, defaultOperators_) {
        _owner = _msgSender();
        _active = true;

        _mintable = true;
        _burnable = true;
        _pausable = true;

        _mint(_owner, initialSupply_, "", "");
    }

    modifier onlyOwner() {
        require(
            _msgSender() == _owner,
            "Only Owner allowed to call this function"
        );
        _;
    }

    modifier requireMintable() {
        require(_mintable == true, "Token is not mintable");
        _;
    }

    modifier requireBurnable() {
        require(_burnable == true, "Token is not burnable");
        _;
    }

    modifier requirePausable() {
        require(_pausable == true, "Token is not pausable");
        _;
    }

    modifier requireActive() {
        require(_active == true, "Token is not active");
        _;
    }

    function setOptions(
        bool mintable_,
        bool burnable_,
        bool pausable_
    ) public onlyOwner {
        _mintable = mintable_;
        _burnable = burnable_;
        _pausable = pausable_;

        if (!_pausable && !_active) {
            _active = true;
        }

        emit NewOptions(_msgSender(), _mintable, _burnable, _pausable);
    }

    function getOwner() internal view returns (address) {
        return _owner;
    }

    function transferOwnership(address newOwner_) public onlyOwner {
        _owner = newOwner_;
    }

    function pause() public onlyOwner requirePausable {
        _active = false;
        emit Paused(_msgSender());
    }

    function resume() public onlyOwner {
        _active = true;
        emit Resumed(_msgSender());
    }

    function getActiveStatus() public view returns (bool) {
        return _active;
    }

    function mint(
        uint256 amount,
        bytes memory data,
        bytes memory operatorData
    ) public onlyOwner requireMintable requireActive {
        _mint(_msgSender(), amount, data, operatorData);
    }

    function mintTo(
        address account,
        uint256 amount,
        bytes memory data,
        bytes memory operatorData
    ) public onlyOwner requireMintable requireActive {
        _mint(account, amount, data, operatorData);
    }

    function transfer(address recipient, uint256 amount)
        public
        override
        requireActive
        returns (bool)
    {
        _send(_msgSender(), recipient, amount, "", "", false);
        return true;
    }

    function send(
        address recipient,
        uint256 amount,
        bytes memory data
    ) public override requireActive {
        _send(_msgSender(), recipient, amount, data, "", true);
    }

    function operatorSend(
        address sender,
        address recipient,
        uint256 amount,
        bytes memory data,
        bytes memory operatorData
    ) public override requireActive {
        require(
            isOperatorFor(_msgSender(), sender),
            "ERC777: caller is not an operator for holder"
        );
        _send(sender, recipient, amount, data, operatorData, true);
    }

    function burn(uint256 amount, bytes memory data)
        public
        override
        onlyOwner
        requireBurnable
        requireActive
    {
        _burn(_msgSender(), amount, data, "");
    }

    function burnFrom(
        address account,
        uint256 amount,
        bytes memory data,
        bytes memory operatorData
    ) public onlyOwner requireBurnable {
        _spendAllowance(account, _owner, amount);
        _burn(account, amount, data, operatorData);
    }

    function operatorBurn(
        address account,
        uint256 amount,
        bytes memory data,
        bytes memory operatorData
    ) public virtual override requireBurnable requireActive {
        require(
            isOperatorFor(_msgSender(), account),
            "ERC777: caller is not an operator for holder"
        );
        _burn(account, amount, data, operatorData);
    }
}
