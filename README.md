# MerkleTree
A straight forward implementation of a binary balanced Merkle tree in JavaScript.
Support Merkle proofs.

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

### Disclaimer
Only for research purpose. No security audits done. Don't use in production.

[@Branch Business and Information System Engineering of the Fraunhofer FIT](https://www.fim-rc.de/en/)