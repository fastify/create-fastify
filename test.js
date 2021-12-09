'use strict'

const { test } = require('tap')
const { join, basename } = require('path')
const { mkdtempSync, readdirSync } = require('fs')
const { tmpdir } = require('os')
const { spawnSync } = require('child_process')

test('generates a fastify project in the current folder', async ({ same, is }) => {
  const dir = mkdtempSync(join(tmpdir(), 'create-fastify-test'))
  spawnSync('node', [join(__dirname, 'cmd.js')], { cwd: dir })
  same(readdirSync(dir), [
    '.gitignore',
    'app.js',
    'README.md',
    'package.json',
    'plugins',
    'routes',
    'test'
  ])
  const { name } = require(join(dir, 'package.json'))
  is(name.toLowerCase(), basename(dir).toLowerCase())
})
