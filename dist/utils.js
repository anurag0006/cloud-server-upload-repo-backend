"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = void 0;
const Max_LEN = 10;
function generate() {
    let ans = "";
    const subset = "1234567890qweansrtyuiopmnbvcxzasdfghjkl";
    for (let i = 0; i < Max_LEN; i++) {
        ans += subset[Math.floor(Math.random() * subset.length)];
    }
    return ans;
}
exports.generate = generate;
