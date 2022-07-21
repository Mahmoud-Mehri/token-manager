// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import "../../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract NFToken is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    address private _owner;

    string _baseUrl;

    struct MetaData {
        string name;
        string description;
        string imageUrl;
    }

    mapping(uint256 => MetaData) private metaDatas;

    constructor(string memory name_, string memory symbol_)
        ERC721(name_, symbol_)
    {
        _owner = _msgSender();
    }

    modifier onlyOwner() {
        require(
            _msgSender() == _owner,
            "Only Owner of the contract allowed to call this function"
        );
        _;
    }

    modifier onlyTokenOwnerOrApproved(uint256 Id) {
        require(
            _isApprovedOrOwner(_msgSender(), Id),
            "Caller is not Token Owner nor Approved"
        );
        _;
    }

    function mint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        _safeMint(to, tokenId);
    }

    function burn(uint256 tokenId) public onlyTokenOwnerOrApproved(tokenId) {
        _burn(tokenId);
    }
}
