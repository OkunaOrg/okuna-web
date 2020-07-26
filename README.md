![Okuna](https://i.ibb.co/x6kTB7W/communities-snapshot-rounded.png "Okuna")

# 🌈 okuna-web

Okuna is coming to the web.

## Table of contents

- [Requirements](#requirements)
- [Project overview](#project-overview)
- [Contributing](#contributing)
    + [Code of Conduct](#code-of-conduct)
    + [License](#license)
    + [Other issues](#other-issues)
    + [Git commit message conventions](#git-commit-message-conventions)
- [Getting started](#getting-started)

## Requirements

* [node](https://nodejs.org/en/)

## Project overview

The project is a [Nuxt](https://nuxtjs.org/) application.
 
It's dependent on the [okuna-api](https://github.com/OkunaOrg/okuna-api) backend, be it whether you host your own or use the Okuna backend at https://api.openbook.social/

## Contributing

There are many different ways to contribute to the website development, just find the one that best fits with your skills and open an issue/pull request in the repository.

Examples of contributions we love include:

- **Code patches**
- **Bug reports**
- **Patch reviews**
- **Translations**
- **UI enhancements**

#### Code of Conduct

Please read and follow our [Code of Conduct](https://github.com/OkunaOrg/okuna-app/blob/master/CODE_OF_CONDUCT.md).

#### License

Every contribution accepted is licensed under [AGPL v3.0](http://www.gnu.org/licenses/agpl-3.0.html) or any later version. 
You must be careful to not include any code that can not be licensed under this license.

Please read carefully [our license](https://github.com/OkunaOrg/okuna-app/blob/master/LICENSE.txt) and ask us if you have any questions.

#### Responsible disclosure

Cyber-hero? Check out our [Vulnerability Disclosure page](https://www.okuna.io/en/vulnerability-report).

#### Other issues

We're available almost 24/7 in the Okuna slack channel. [Join us!](https://join.slack.com/t/okuna/shared_invite/enQtNDI2NjI3MDM0MzA2LTYwM2E1Y2NhYWRmNTMzZjFhYWZlYmM2YTQ0MWEwYjYyMzcxMGI0MTFhNTIwYjU2ZDI1YjllYzlhOWZjZDc4ZWY)

#### Git commit message conventions

Help us keep the repository history consistent 🙏!

We use [gitmoji](https://gitmoji.carloscuesta.me/) as our git message convention.

If you're using git in your command line, you can download the handy tool [gitmoji-cli](https://github.com/carloscuesta/gitmoji-cli).

## Getting started

### Clone the repository


### Install the dependencies

``` bash
$ npm install
```

### Configure the .env file

``` bash
$ copy .sample.env .dev.env
$ copy .sample.env .prod.env
$ nano .{dev|prod}.env
```

### Start the development server


``` bash
$ npm run dev
```

### Build for production

``` bash
$ npm run generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).
