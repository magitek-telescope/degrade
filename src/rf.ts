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
  const filePathList = (await glob(targetGlob)).filter((path) => {
    return path.split('/')[path.split('/').length-1].includes(before)
  })
  await filePathList.map( async (path) => {
    return await fs.rename(path, path.replace(before, after))
  })
}

run()
