import {buildPoseidonOpt} from "circomlibjs";
import merkleTree from "../lib.js";

import { strict as assert } from 'node:assert';

describe("Merkle proof", function() {

    let poseidon;
    let tree;
    let leafHash;
    let nodeHash;

    before(async () => {
        poseidon = await buildPoseidonOpt();

        leafHash = function(input) {
            return poseidon([input]);
        }

        nodeHash = function(left, right) {
            return poseidon([left, right]);
        }
    });

    it("Detects manipulation", async function() {
        this.timeout(60000)

        let inputs = new Array(2**10).fill(0);

        tree = merkleTree(inputs, leafHash, nodeHash);
        let merkleProof = tree.getMerkleProof(293);

        merkleProof.lemma[0] = poseidon([19191]);

        let root = merkleProof.calculateRoot();
        assert(poseidon.F.toObject(tree.root) !== poseidon.F.toObject(root), true);
        return Promise.resolve(true);
    })

    it("Create large Merkle proof from a tree with 16k leaves and validates it", async function() {
        this.timeout(60000)

        let inputs = new Array(2**14).fill(0);

        tree = merkleTree(inputs, leafHash, nodeHash);
        let merkleProof = tree.getMerkleProof(2932);
        let root = merkleProof.calculateRoot();
        assert(poseidon.F.toObject(tree.root) === poseidon.F.toObject(root), true);
        return Promise.resolve(true);
    })

});
