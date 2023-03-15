# create-fastify

![CI](https://github.com/fastify/create-fastify/workflows/CI/badge.svg)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://standardjs.com/)

> Rapidly generate a Fastify project


## Usage

There is no need to install this package directly.

```sh
npm init fastify
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

The code follows the Standard code style.
[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## License
**[MIT](https://github.com/fastify/fastify-cli/blob/master/LICENSE)**

*The software is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and non infringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.*
