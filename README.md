# quick buy e-shopping store

This is an E-commerce online clothing store built using MERN (MongoDB, Express.js, React.js, Node.js) stack.
This is basically a prototype which concentrations have been placed more on the core functionalities of an e-store. This web app is still undergoing iterations and have been built with the constant thought of high peformance and scalability in mind (a good reason for picking MERN as the applications stack), thus creating room for easy implementations or additions of more complex functionalities or extension of already existing functionalities if need arise. Imagine what could be built on top of this.
You can view live at [https://quickibuy.herokuapp.com/](https://quickibuy.herokuapp.com/)

## Installation and running project

you need to have node.js installed on your system to be able to run this web application.
if you dont have node.js kindly follow this link to download and install Node.js (<https://nodejs.org>)

### cloning & Installing dependencies

*Clone the repository and change directory into:

```console
git clone https://github.com/humbejeff2116/quickbuy-e-store.git
cd quick-buy-e-store 

```

This project uses yarn as its package manager. You can install yarn using [npm](https://yarnpkg.com):

```console
npm install -g yarn

```

This project uses the client server architecture. This architecture is language agnostic and although the same language (Javascript) has been used for both frontend and backend development, client and server still have seperate package.json files, making them to be easily decoupled/detached if the need arises, and are basically only aware of each other through an agreed communication channel which in this case is HTTP.

Install `dependencies` with [yarn](https://yarnpkg.com)

After installing dependencies, make sure to set all enviroment variables used before starting app. A good place to look would be the config file.

In projects root:

1. Run `yarn install-server` to install server dependencies

2. Run `yarn install-client` to install client dependencies

3. Start the server `yarn start-server`

4. Start the client `yarn start-client`

Open your browser and go to [http://localhost:3000/](http://localhost:3000/) to view your app

if you wish to use [npm](https://www.npmjs.com/) as your package manager, you could delete
the yarn.lock file, change all appearances of yarn to npm under scripts in package.json file and instead

In pojects root:

1. Run `npm install-server` to install server dependencies

2. Run `npm install-client` to install client dependencies

3. Start the server `npm start-server`

4. Start the client `npm start-client`
