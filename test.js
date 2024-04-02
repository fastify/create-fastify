'use strict'

const { test, teardown } = require('tap')
const { join } = require('node:path')
const { mkdtempSync, readdirSync, mkdirSync, rmSync } = require('node:fs')
const { tmpdir } = require('node:os')
const { spawnSync } = require('node:child_process')

const testDir = mkdtempSync(join(tmpdir(), 'create-fastify-test-'))
spawnSync('npm', ['link'], { cwd: __dirname })

teardown(() => {
  spawnSync('npm', ['unlink'], { cwd: __dirname })
  rmSync(testDir, { recursive: true, force: true })
})

test('generates a fastify project in the current folder', async (t) => {
  t.plan(3)
  const projectName = 'create-fastify-test-current'
  const dir = join(testDir, projectName)
  mkdirSync(dir)
  spawnSync('npm', ['link', 'create-fastify'], { cwd: dir })
  spawnSync('npm', ['init', 'fastify'], { cwd: dir })
  t.match(readdirSync(dir).sort(), [
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
  t.ok(Object.keys(dependencies).includes('fastify'))
  t.equal(name, projectName)
})

test('generates a fastify project in the current folder using --integrate', async (t) => {
  t.plan(3)
  const projectName = 'create-fastify-test-integrate'
  const dir = join(testDir, projectName)
  mkdirSync(dir)
  const { stdout: npmVersion } = spawnSync('npm', ['--version'], { cwd: dir })
  spawnSync('npm', ['init', '-y'], { cwd: dir })
  spawnSync('npm', ['link', 'create-fastify'], { cwd: dir })
  if (parseInt(npmVersion.toString().split('.')[0], 10) < 7) {
    spawnSync('npm', ['init', 'fastify', '--integrate'], { cwd: dir })
  } else {
    spawnSync('npm', ['init', 'fastify', '--', '--integrate'], { cwd: dir })
  }
  t.match(readdirSync(dir).sort(), [
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
  t.ok(Object.keys(dependencies).includes('fastify'))
  t.equal(name, projectName)
})

test('generates a fastify project in a new folder', async (t) => {
  t.plan(3)
  const projectName = 'create-fastify-new-dir'
  const dir = join(testDir, projectName)
  spawnSync('npm', ['link', 'create-fastify'], { cwd: testDir })
  spawnSync('npm', ['init', 'fastify', projectName], { cwd: testDir })
  t.match(readdirSync(dir).sort(), [
    '.gitignore',
    'README.md',
    'app.js',
    'package.json',
    'plugins',
    'routes',
    'test'
  ])
  const { name, dependencies } = require(join(dir, 'package.json'))
  t.ok(Object.keys(dependencies).includes('fastify'))
  t.equal(name, projectName)
})
