const fs = require("fs")

let pySetup = fs.readFileSync("./setup.py", "utf-8").split("\r\n")
for (let line in pySetup) {
  if (pySetup[line].includes("VERSION =")) {
    let numbers = pySetup[line].replace(/VERSION = |\"|\'/g, "").split(".").map(Number)
    numbers[2] += 1
    pySetup[line] = `VERSION = "${numbers.join(".")}"`
  }
}
fs.writeFileSync("./setup.py", pySetup.join("\r\n"))
if (fs.existsSync("./dist/"))
  fs.rmdirSync("./dist/", { recursive: true })
if (fs.existsSync("./build/"))
  fs.rmdirSync("./build/", { recursive: true })