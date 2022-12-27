# MerkleTree
A straight forward implementation of a binary balanced Merkle trees and proofs in JavaScript.
Compatible with any hash function. 
Specially designed for the use of Poseidon in Circom.

## Install

```shell
npm install @applied-crypto/merkletree
```

## Usage

```JS
// Use your own hash function
poseidon = await buildPoseidonOpt();
leafHash = function(input) {
    return poseidon([input]);
}
nodeHash = function(left, right) {
    return poseidon([left, right]);
}

let inputs = new Array(2**10).fill(0);
// Create the Merkle tree
tree = merkleTree(inputs, leafHash, nodeHash);
// Create the Merkle proof
let merkleProof = tree.getMerkleProof(293);

// Validate merkle Proof
let root = merkleProof.calculateRoot();
assert(poseidon.F.toObject(tree.root) === poseidon.F.toObject(root), true);
```

### Validating Merkle proofs in Zero-Knowledge Proofs (ZKPs) 

For validating the generated Merkle proofs in [Circom](https://github.com/iden3/circom), see the 
[circuit.circom](./circuit.circom).

### Disclaimer
Only for research purpose. No security audits done. Don't use in production.

[@Branch Business and Information System Engineering of the Fraunhofer FIT](https://www.fim-rc.de/en/)