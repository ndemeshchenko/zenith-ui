### Overview

This project is a frontend web app for Zenith API monitoring backend.
Web UI interface for [Zenith API monitoring](https://github.com/ndemeshchenko/zenith/tree/main)

### Installation

First of all, make sure you have all prerequisites installed:

- [Node.js](https://nodejs.org/en/) ( >=14.\*)
- [npm](https://www.npmjs.com/get-npm) version 3+ (
  or [yarn](https://yarnpkg.com/lang/en/docs/install) version 1.16+)
  and [Git](https://git-scm.com).

After checking the prerequisites, follow these simple steps to install and use

```
# clone the repo
$ git clone https://github.com/epicmaxco/vuestic-admin.git myproject

# go into app's directory and install dependencies:
$ cd myproject

```

Then, if you use npm:

```
$ npm install

# Export variable to point to Zenith API
export VITE_ZENITH_ENDPOINT=http://api.zenithmonitor.com:8080
export VITE_ZENITH_API_TOKEN=xxxxxx

# serve with hot reload at localhost:8080 by default.
$ npm run dev

# build for production
$ npm run build

# build for production and view the bundle analyzer report.
$ npm run build --report
```

If you use yarn:

```
$ yarn install

# serve with hot reload at localhost:8080 by default.
$ yarn dev

# build for production
$ yarn build

# build for production and view the bundle analyzer report.
$ yarn build --report
```

# Deployment

```shell
helm upgrade -i zenith-ui ./zenith-ui \
  --namespace zenith --create-namespace \
  --set secret.VITE_ZENITH_API_TOKEN="your-api-token" \
  --set secret.VITE_ZENITH_ENDPOINT="http://api.zenithmonitor.com:8080"
```

```shell
kubectl get pods -n zenith
```

# Dependencies

Zenith UI built on [Vuestic](https://github.com/epicmaxco/vuestic-ui) by Epicmax UI library

### License

[MIT](https://github.com/epicmaxco/vuestic-admin/blob/master/LICENSE) license.
