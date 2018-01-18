import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Header from '../components/Header';
import './index.css';

const TemplateWrapper = ({ children }) =>
  console.log('children', children) || (
    <div>
      <Helmet
        title="wildsmith studio"
        meta={[
          { name: 'description', content: 'Sample' },
          { name: 'keywords', content: 'sample, something' },
        ]}
      />
      <Header />
      <div>{children()}</div>
    </div>
  );

// TemplateWrapper.propTypes = {
//   children: PropTypes.func,
// };

export default TemplateWrapper;
