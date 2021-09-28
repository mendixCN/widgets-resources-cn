# Contributing

## Prerequisites

-   [Node.js](https://nodejs.org) version 10.3.0 or later

## Getting started

1. Clone this repository

```sh
$ git clone --recursive https://github.com/mendixCN/widgets-resources-cn.git
$ cd widgets-resources-cn
```

2. Install and link dependencies

```sh
$ npm install
```

3. Modify script new in package.json
```json
{
//other
  "scripts":{
    "new":  "yo @mendix/widget packages/pluggableWidgets/{your-widget-name}-web"
  }
//other
}
```

4. npm run new

1. Go make it!

Open the folder of the package you want to change and use `npm run build` to bundle it, or `npm start` for watch mode.
