#!/usr/bin/env node

'use strict';

const { resolve } = require('node:path');

const args = process.argv.slice(2);

const directory = (!args[0] || args[0] === "" || args[0].startsWith('-')) ? '.' : path.resolve(args[0]);

require('fastify-cli/generate').cli([directory]);