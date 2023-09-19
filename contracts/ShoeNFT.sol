// SPDX-License-Identifier: UNLICENSED


pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract ShoeNFT is ERC721Enumerable, Ownable {

    mapping(uint256 => string) private _tokenURIs;

    constructor() ERC721("ShoeNFT", "SHOE") {}

    function mint(address to, string memory tokenURI) public returns (uint256) {
        uint256 newTokenId = totalSupply()+1;
        _mint(to, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        return newTokenId;
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        _tokenURIs[tokenId] = _tokenURI;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return _tokenURIs[tokenId];
    }
}