---
author: Matthew Smith
date: 2018-07-02
image: remote-resources-gatsby-hero.jpg
title: Using your own remote data sources with Gatsby
tags: gatsby graphql react
published: false
---

Gatsby works great with [Contentful](https://www.gatsbyjs.org/packages/gatsby-source-contentful/), [Headless Wordpress](https://www.gatsbyjs.org/blog/2018-01-22-getting-started-gatsby-and-wordpress/), and other CMS frameworks.

> But what if I have my own data source? How do I use that?

That is the problem that I had, so I'm going to show you how to solve it. We're going to start off by writing a Gatsby Plugin that fetches data from an API. For this example we are going to be fetching a random list of [jokes](https://github.com/15Dkatz/official_joke_api).

### Step 1 - Create the plugin

Let's start off by creating a `plugins` directory if you do not already have one. Inside of the plugins directory we'll create another directory that matches the name of our plugin. Well call it `random-jokes`.

We're going to create 2 files inside of the `random-jokes` plugin directory: `package.json` and `gatsby-node.js`.

The purpose of the `package.json` file is to tell Gatsby the name of the plugin. We'll be adding this to the `gatsby-config.js` file shortly.

`package.json`

```js
{"name": "random-jokes"}
```

Inside of the `gatsby-node.js` file we will be making use of Gatsby's [sourceNodes](https://www.gatsbyjs.org/docs/node-apis/#sourceNodes) API. You'll need to add the `axios` package to your project if you are not already using it.

```js
yarn add axios

// or

npm install --save axios
```

`gatsby-node.js`

```js
const axios = require('axios');
const crypto = require('crypto');

const API_URI =
  'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten';

exports.sourceNodes = async ({boundActionCreators}) => {
  const {createNode} = boundActionCreators;
  const result = await axios.get(API_URI);
  for (const joke of result.data) {
    await createNode({
      children: [],
      id: joke.id.toString(),
      setup: joke.setup,
      punchline: joke.punchline,
      parent: null,
      internal: {
        type: 'Joke',
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(joke))
          .digest(`hex`),
      },
    });
  }
};
```

### Step 2 - Tell Gatsby to use the plugin

We need let Gatsby know that we would like to use this plugin. To do so, we need to modify the `gatsby-config` file like so:

```js
module.exports = {
  ...

  plugins: [
    'random-jokes',
  ]
  ...
}
```

### Step 3 - Find the newly created node in GraphiQL

Restart Gatsby and it will create our new `Joke` nodes. Before trying to query in Gatsby, it is always a good idea to first explore your data with the GraphiQL interface. It should be running on `http://localhost:8000/___graphql`.

On the upper right hand side of the GraphiQL interface click `< Docs` and scroll down until you see the `joke` node as pictured below.

![GraphiQL interface](graphiql-interface.png)

Let's write a query in the left hand pane to view our results.

```js
{
  allJoke {
    edges {
      node {
        id
        setup
        punchline
      }
    }
  }
}
```

### Step 4 - Create a new page in Gatsby

Now that we have verified that all of the data is showing up as expected we can create a page and add our query to our page components. Lets create the file `/src/pages/jokes.js`.

```js
import React from 'react';

export default class Jokes extends React.Component {
  _renderJokes = () => {
    const jokes = this.props.data.allJoke.edges;
    return jokes.map(joke => {
      return (
        <li key={joke.node.id}>
          <p>{joke.node.setup}</p>
          <p>{joke.node.punchline}</p>
        </li>
      );
    });
  };

  render() {
    return <ul className="Jokes">{this._renderJokes()}</ul>;
  }
}

export const query = graphql`
  query JokesQuery {
    allJoke {
      edges {
        node {
          id
          setup
          punchline
        }
      }
    }
  }
`;
```

This post is an example of how you can use your external APIs as Gatsby data sources. Coming soon in another post on how to retrieve external images during build time so that you may use them with `Gatsby Image`.