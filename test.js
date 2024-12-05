'use strict'

const { test, after, before } = require('node:test')
const { join } = require('node:path')
const { mkdtempSync, readdirSync, mkdirSync, rmSync } = require('node:fs')
const { tmpdir } = require('node:os')
const { spawnSync } = require('node:child_process')

const testDir = mkdtempSync(join(tmpdir(), 'create-fastify-test-'))

before(() => {
  spawnSync('npm', ['link'], { cwd: __dirname, shell: true })
})

after(() => {
  spawnSync('npm', ['unlink', '-g'], { cwd: __dirname, shell: true })
  rmSync(testDir, { recursive: true, force: true })
})

test('generates a fastify project in the current folder', (t) => {
  t.plan(3)
  const projectName = 'create-fastify-test-current'
  const dir = join(testDir, projectName)
  const opts = { cwd: dir, shell: true }
  mkdirSync(dir)
  spawnSync('npm', ['link', 'create-fastify'], opts)
  spawnSync('npm', ['init', 'fastify'], opts)
  t.assert.deepStrictEqual(readdirSync(dir).sort(), [
    '.gitignore',
    'README.md',
    'app.js',
    'node_modules', // added by npm link
    'package.json',
    'plugins',
    'routes',
    'test'
  ])
  const { name, dependencies } = require(join(dir, 'package.json'))
  t.assert.ok(Object.keys(dependencies).includes('fastify'))
  t.assert.strictEqual(name, projectName)
})

test('generates a fastify project in the current folder using --integrate', (t) => {
  t.plan(3)
  const projectName = 'create-fastify-test-integrate'
  const dir = join(testDir, projectName)
  const opts = { cwd: dir, shell: true }
  mkdirSync(dir)
  const { stdout: npmVersion } = spawnSync('npm', ['--version'], opts)
  spawnSync('npm', ['init', '-y'], opts)
  spawnSync('npm', ['link', 'create-fastify'], opts)
  if (parseInt(npmVersion.toString().split('.')[0], 10) < 7) {
    spawnSync('npm', ['init', 'fastify', '--integrate'], opts)
  } else {
    spawnSync('npm', ['init', 'fastify', '--', '--integrate'], opts)
  }
  t.assert.deepStrictEqual(readdirSync(dir).sort(), [
    '.gitignore',
    'README.md',
    'app.js',
    'node_modules', // added by npm link
    'package.json',
    'plugins',
    'routes',
    'test'
  ])
  const { name, dependencies } = require(join(dir, 'package.json'))
  t.assert.ok(Object.keys(dependencies).includes('fastify'))
  t.assert.strictEqual(name, projectName)
})

test('generates a fastify project in a new folder', (t) => {
  t.plan(3)
  const projectName = 'create-fastify-new-dir'
  const dir = join(testDir, projectName)
  const opts = { cwd: testDir, shell: true }
  spawnSync('npm', ['link', 'create-fastify'], opts)
  spawnSync('npm', ['init', 'fastify', projectName], opts)
  t.assert.deepStrictEqual(readdirSync(dir).sort(), [
    '.gitignore',
    'README.md',
    'app.js',
    'package.json',
    'plugins',
    'routes',
    'test'
  ])
  const { name, dependencies } = require(join(dir, 'package.json'))
  t.assert.ok(Object.keys(dependencies).includes('fastify'))
  t.assert.strictEqual(name, projectName)
})
