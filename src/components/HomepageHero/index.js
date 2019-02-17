import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Button, Container, Headline, LogoBanner} from 'components';
import Logo from './Logo';
import Human from 'components/Humans/Hero';

// const StyledDiv = styled.div``;

const StyledHeadline = styled(Headline)`
  max-width: 902px;
`;

const StyledHomepageHero = styled.div``;

const HumanWrapper = styled.div`
  position: absolute;
  bottom: 135px;
  left: -85px;
`;

function HomepageHero() {
  return (
    <StyledHomepageHero className=" vh-100 w-100 bg-near-white flex flex-column relative overflow-hidden">
      <Logo className="mt3 ml3" />
      <Container className="flex flex-column items-center flex-1 justify-center">
        <StyledHeadline className="black tc" as="h1">
          We design and build digital experiences that matter
        </StyledHeadline>
        {/* Scroll to work with us section */}
        <Button to="#work-with-us">Work with us</Button>
      </Container>
      <LogoBanner />
      <HumanWrapper>
        <Human />
      </HumanWrapper>
    </StyledHomepageHero>
  );
}

HomepageHero.propTypes = {};

HomepageHero.defaultProps = {};

export default HomepageHero;
