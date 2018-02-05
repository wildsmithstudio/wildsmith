module.exports = {
  siteMetadata: {
    title: 'Wildsmith Studio site',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-resolve-src',
    'gatsby-plugin-sass',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `img`,
        path: `${__dirname}/src/routes/WhoWeAre/components/Profile/images/`
      }
    },
  ],
};
