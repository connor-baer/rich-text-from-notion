<div align="center">

# rich-text-from-notion <!-- omit in TOC -->

A library to convert [Notion](https://notion.so) page content to the Contentful [Rich Text](https://www.contentful.com/developers/docs/concepts/rich-text/) document format.

[![npm version](https://badge.fury.io/js/%40madebyconnor%2Frich-text-from-notion.svg)](https://badge.fury.io/js/%40madebyconnor%2Frich-text-from-notion) [![Build Status](https://travis-ci.org/connor-baer/rich-text-from-notion.svg?branch=master)](https://travis-ci.org/connor-baer/rich-text-from-notion) [![codecov](https://codecov.io/gh/connor-baer/rich-text-from-notion/branch/master/graph/badge.svg)](https://codecov.io/gh/connor-baer/rich-text-from-notion) [![License MIT](https://img.shields.io/github/license/connor-baer/rich-text-from-notion.svg)](https://github.com/connor-baer/rich-text-from-notion/blob/master/LICENSE.md)

</div>

<!-- TOC -->

- [Installation](#Installation)
- [Getting started](#Getting-started)
- [Getting the smallest possible bundle size](#Getting-the-smallest-possible-bundle-size)
- [Changelog](#Changelog)

<!-- /TOC -->

---

[`rich-text-from-notion`](https://www.npmjs.com/package/@madebyconnor/rich-text-from-notion) is *in writing...*

Some standout features include...

All this clocks in at around 3.7 kB gzipped.

⚠️ Requires Node >= 8.0.0.

## Installation

Install `@madebyconnor/rich-text-from-notion` with your favorite package manager.

```shell
# yarn
yarn add @madebyconnor/rich-text-from-notion
# npm
npm install @madebyconnor/rich-text-from-notion
```

## Getting started

`@madebyconnor/rich-text-from-notion` exports a function

```js
import richTextFromNotion from '@madebyconnor/rich-text-from-notion';

richTextFromNotion(notionPageContent)

/*
    returns:

    rich text. duh! (in writing...)
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

See [GitHub Releases](https://github.com/connor-baer/rich-text-from-notion/releases).
