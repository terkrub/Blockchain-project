// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ShoeNFT is ERC721Enumerable, Ownable {

    mapping(uint256 => string) private _tokenURIs;
    uint256[] public allTokenIds;

    constructor() ERC721("ShoeNFT", "SHOE") {}

    function mint(address to, uint256 serialNumber, string memory tokenURI) public onlyOwner {
        require(!_exists(serialNumber), "Token with this serial number already exists");
        _mint(to, serialNumber);
        _setTokenURI(serialNumber, tokenURI);
        allTokenIds.push(serialNumber); // Add ID to the array
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        _tokenURIs[tokenId] = _tokenURI;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return _tokenURIs[tokenId];
    }

    function getAllTokens() public view returns (uint256[] memory) {
        return allTokenIds;
    }

    function safeTransferFrom(address from, address to, uint256 tokenId) public virtual override {

        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");

        _safeTransfer(from, to, tokenId, "");
    }

}
