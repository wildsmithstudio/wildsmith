const path = require('path');
const {createFilePath} = require('gatsby-source-filesystem');

// You can delete this file if you're not using it
exports.modifyWebpackConfig = ({config}) => {
  const newConfig = {...config};
  const loadersArr = ['style', 'css?sourceMap', 'sass', 'sass?sourceMap'];
  if (config._loaders.sass.config.loaders) {
    newConfig._loaders.sass.config.loaders = loadersArr;
  }
  return newConfig;
};

exports.createPages = ({graphql, boundActionCreators}) => {
  const {createPage} = boundActionCreators;
  new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/BlogPost/index.js');
    resolve(
      graphql(
        `
          {
            allMarkdownRemark {
              edges {
                node {
                  fields {
                    slug
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }
        // Create blog posts pages.
        const posts = result.data.allMarkdownRemark.edges;
        posts.forEach((post, index) => {
          createPage({
            path: post.node.fields.slug,
            component: blogPost,
            context: {
              slug: post.node.fields.slug,
            },
          });
        });
        resolve();
      })
    );
  });
};

exports.onCreateNode = ({node, boundActionCreators, getNode}) => {
  const {createNodeField} = boundActionCreators;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({node, getNode});
    console.log('node', node);
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
