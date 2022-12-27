import {buildPoseidonOpt} from "circomlibjs";
import merkleTree from "../lib.js";

import { strict as assert } from 'node:assert';

describe("Merkle tree", function() {

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


   it("Check two Merkle tree objects", function() {
      let inputs1 = new Array(2**10).fill(1234);
      let inputs2 = new Array(2**10).fill(4321);

      let tree1 = merkleTree(inputs1, leafHash, nodeHash);
      let tree2 = merkleTree(inputs2, leafHash, nodeHash);
      assert(poseidon.F.toObject(tree1.root) !== poseidon.F.toObject(tree2.root), true);
   });

   it("Check deep copy of input array", function(){
      let inputs = new Array(2**10).fill(1234);

      let tree = merkleTree(inputs, leafHash, nodeHash);

      inputs[0] = 0;

      assert(tree.inputs[0] !== inputs[0], true);
   });

   it("Detect manipulation of Merkle tree", function(){
      let inputs = new Array(2**10).fill(1234);

      let tree = merkleTree(inputs, leafHash, nodeHash);

      tree.inputs[0] = 0;
      let manipulated = tree.calculateNodes()

      assert(poseidon.F.toObject(tree.root) !== poseidon.F.toObject(manipulated[manipulated.length - 1]), true);
   });

   it("Create tree with 32k leaves", async function() {
      this.timeout(60000)

      let inputs = new Array(2**15).fill(0);

      tree = merkleTree(inputs, leafHash, nodeHash);
      return Promise.resolve(true);
   })
});