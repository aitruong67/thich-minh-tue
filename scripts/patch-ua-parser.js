const fs = require('fs')
const path = require('path')

const filePath = path.join(
  __dirname,
  '../node_modules/next/dist/compiled/ua-parser-js/ua-parser.js'
)

if (!fs.existsSync(filePath)) {
  console.log('patch-ua-parser: file not found, skipping')
  process.exit(0)
}

let content = fs.readFileSync(filePath, 'utf8')

const target =
  'if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";'

if (content.includes(target)) {
  fs.writeFileSync(filePath, content.replace(target, ''), 'utf8')
  console.log('patch-ua-parser: removed __dirname reference from ua-parser-js')
} else {
  console.log('patch-ua-parser: already patched or pattern not found, nothing to do')
}
