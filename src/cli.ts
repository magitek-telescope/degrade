#!/usr/bin/env node
import { rf } from './rf'
import { rt } from './rt'
import consola from 'consola'

const command = process.argv[2]
const argv = process.argv.filter((_, i) => i > 2)

async function run() {
  switch (command) {
    case 'rf': {
      await rf(argv)
      break
    }

    case 'rt': {
      await rt(argv)
      break
    }

    default: {
      consola.error(`Missing command '${command}'`)
      return process.exit(1)
    }
  }
}

run()
