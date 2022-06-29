// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import "../../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Token is ERC20 {
    uint8 private immutable _decimals;
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
        uint8 decimals_,
        uint256 initialSupply_
    ) ERC20(name_, symbol_) {
        _owner = _msgSender();
        _decimals = decimals_;
        _active = true;

        _mintable = true;
        _burnable = true;
        _pausable = true;

        _mint(_owner, initialSupply_);
    }

    modifier onlyOwner() {
        require(
            _msgSender() == getOwner(),
            "Only Owner allowed to call this function"
        );
        _;
    }

    modifier requireMintable() {
        require(_mintable == true, "Token is not mintable!");
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
        require(_active == true, "Token is not active!");
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

    function decimals() public view override returns (uint8) {
        return _decimals;
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

    function mint(uint256 amount)
        public
        onlyOwner
        requireMintable
        requireActive
    {
        _mint(_msgSender(), amount);
    }

    function mintTo(address account, uint256 amount)
        public
        onlyOwner
        requireMintable
        requireActive
    {
        _mint(account, amount);
    }

    function burn(uint256 amount)
        public
        onlyOwner
        requireBurnable
        requireActive
    {
        _burn(_msgSender(), amount);
    }

    function burnFrom(address account, uint256 amount)
        public
        onlyOwner
        requireBurnable
        requireActive
    {
        _spendAllowance(account, getOwner(), amount);
        _burn(account, amount);
    }
}
