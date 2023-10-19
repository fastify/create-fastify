#!/usr/bin/env node

'use strict'

require('fastify-cli/generate').cli(['.', ...process.argv.slice(2)])
