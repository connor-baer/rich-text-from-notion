<div align="center">

# package-template <!-- omit in TOC -->

JS package template repository

[![npm version](https://badge.fury.io/js/%40madebyconnor%2Fpackage-template.svg)](https://badge.fury.io/js/%40madebyconnor%2Fpackage-template) [![Build Status](https://travis-ci.org/connor-baer/package-template.svg?branch=master)](https://travis-ci.org/connor-baer/package-template) [![codecov](https://codecov.io/gh/connor-baer/package-template/branch/master/graph/badge.svg)](https://codecov.io/gh/connor-baer/package-template) [![License MIT](https://img.shields.io/github/license/connor-baer/package-template.svg)](https://github.com/connor-baer/package-template/blob/master/LICENSE.md)

</div>

<!-- TOC -->

- [Installation](#Installation)
- [Getting started](#Getting-started)
- [Getting the smallest possible bundle size](#Getting-the-smallest-possible-bundle-size)
- [Changelog](#Changelog)

<!-- /TOC -->

---

[`package-template`](https://www.npmjs.com/package/@madebyconnor/package-template) is a template repository for my JavaScript modules.

Some standout features include...

All this clocks in at around ⚡ kB gzipped.

⚠️ Requires Node >= 8.0.0.

## Installation

Install `@madebyconnor/package-template` with your favorite package manager.

```shell
# yarn
yarn add @madebyconnor/package-template
# npm
npm i @madebyconnor/package-template
```

## Getting started

`@madebyconnor/package-template` exports a function

```js
import sayHello from '@madebyconnor/package-template';

sayHello('Tessa')

/*
    returns:

    Hello Tessa
 */
```

## Getting the smallest possible bundle size

Many development conveniences are placed behind `process.env.NODE_ENV !== "production"` conditionals. When bundling your app, it's a good idea to replace these code snippets such that a minifier (like uglify) can sweep them away and leave a smaller overall bundle.

Here are instructions for some of the popular bundlers:

- [webpack](https://webpack.js.org/guides/production/#specify-the-environment)
- [browserify plugin](https://github.com/hughsk/envify)
- [parcel](https://parceljs.org/production.html)
- [fuse-box](http://fuse-box.org/plugins/replace-plugin#notes)

## Changelog

See [GitHub Releases](https://github.com/connor-baer/package-template/releases).
