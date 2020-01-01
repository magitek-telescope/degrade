import _glob from 'glob'
import { promisify } from 'util'
import { promises as fs } from 'fs'
const glob = promisify(_glob)

export async function rf(argv: string[]) {
  const [before, after, targetGlob] = argv
  if (!(before && after && targetGlob)) {
    console.error('Missing option')
    process.exit(1)
  }
  const filePathList = (await glob(targetGlob)).filter((path) => {
    return path.split('/')[path.split('/').length-1].includes(before)
  })
  console.log(filePathList.join('\n'))
  await filePathList.map( async (path) => {
    return await fs.rename(path, path.replace(before, after))
  })
}
