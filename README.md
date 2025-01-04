# create-fastify

[![CI](https://github.com/fastify/create-fastify/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/fastify/create-fastify/actions/workflows/ci.yml)
[![NPM version](https://img.shields.io/npm/v/create-fastify.svg?style=flat)](https://www.npmjs.com/package/create-fastify)
[![neostandard javascript style](https://img.shields.io/badge/code_style-neostandard-brightgreen?style=flat)](https://github.com/neostandard/neostandard)

> Rapidly generate a Fastify project


## Usage

There is no need to install this package directly.

```sh
npm init fastify [your_app_name]
```

The `npm init` command will find this package automatically and run it.

### Integrate

To integrate Fastify into an existing project:

```sh
npm init fastify --integrate
```

Note that this will overwrite files, so exercise caution.

Files and folders that will be overwritten by integrate mode:

* .gitignore
* app.js
* plugins
* routes
* test

The `package.json` file will not be overwritten but will be modified.

The plugins are loaded with [@fastify/autoload](https://github.com/fastify/fastify-autoload) with an empty default configuration.

## Contributing
If you feel you can help in any way, be it with examples, extra testing, or new features please open a pull request or open an issue.


## License

Licensed under [MIT](./LICENSE).
