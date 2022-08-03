'use strict'

const { test } = require('tap')
const { join, basename } = require('path')
const { mkdtempSync, readdirSync } = require('fs')
const { tmpdir } = require('os')
const { spawnSync } = require('child_process')

test('generates a fastify project in the current folder', async ({ equal, match }) => {
  const dir = mkdtempSync(join(tmpdir(), 'create-fastify-test'))
  spawnSync('node', [join(__dirname, 'cmd.js')], { cwd: dir })
  match(readdirSync(dir).sort(), [
    '.gitignore',
    'README.md',
    'app.js',
    'package.json',
    'plugins',
    'routes',
    'test'
  ])
  const { name } = require(join(dir, 'package.json'))
  equal(name.toLowerCase(), basename(dir).toLowerCase())
})
