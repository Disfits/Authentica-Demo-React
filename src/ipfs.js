// const IPFS = require("ipfs-api");
// const ipfs = new IPFS({
//   host: "ipfs.infura.io",
//   port: 5001,
//   protocol: "https",
// });

const ipfs = require("nano-ipfs-store").at("https://ipfs.infura.io:5001");

export default ipfs;
