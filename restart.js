// restart.js
const { spawn } = require("child_process");

function restart() {
  console.log("Restarting bot...");
  spawn(process.argv[0], process.argv.slice(1), {
    detached: true,
    stdio: "inherit",
  }).unref();
  process.exit();
}

module.exports = { restart };
