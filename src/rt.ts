#!/usr/bin/env node
import _glob from 'glob'
import { promisify } from 'util'
import { promises as fs } from 'fs'
const glob = promisify(_glob)

async function run() {
  const [before, after, targetGlob] = process.argv.filter((_, i) => i > 1)
  if (!(before && after && targetGlob)) {
    console.error('Missing option')
    process.exit(1)
  }
  const filePathList = (await glob(targetGlob))
  console.log(filePathList.join('\n'))
  await filePathList.map(async (path) => {
    const text = await fs.readFile(path, { encoding: 'utf8' })
    const result = text.replace(new RegExp(before, 'g'), after)
    if (text === result) {
      return
    }
    await fs.writeFile(
      path,
      result,
      { encoding: 'utf8' }
    )
  })
}

run()
