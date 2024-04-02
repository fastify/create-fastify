#!/usr/bin/env node

'use strict'

const args = [...process.argv.slice(2)]

if (!args[0] || args[0].startsWith('-')) {
  args.unshift('.')
}

require('fastify-cli/generate').cli(args)
