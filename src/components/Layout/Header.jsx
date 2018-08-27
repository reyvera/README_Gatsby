import React from 'react'
import styled from 'styled-components'
import Navigation from './Navigation'
import logo from '../../logo-icon.png'

class MainHeader extends React.Component {
  render() {
    return (
      <SiteContainer>
        {/* <Navigation /> */}
        <img src={logo} alt="Logo"/>
      </SiteContainer>
    )
  }
}

const SiteContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${props => props.theme.brand};
  padding: 1em;
`

export default MainHeader
