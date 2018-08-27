import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import SEO from '../components/SEO'
import config from '../../data/SiteConfig'
import CtaButton from '../components/CtaButton'
import SiteHeader from '../components/Layout/Header'
import TableOfContents from '../components/Layout/TableOfContents'
import logo from '../logo-icon.png'

class Index extends React.Component {
	render() {
      const allSEOMarkdown = this.props.data.allMarkdown.edges
      // const allSEOMarkdown = []
      allSEOMarkdown.sort((a, b) => {
         // console.log(a.node.frontmatter)
         if((a.node.frontmatter.version) && (b.node.frontmatter.version)) {
            var aIP = a.node.frontmatter.version.split('.')
            var bIP = b.node.frontmatter.version.split('.')
            for(var ipIndex = 0; ipIndex < aIP.length; ipIndex++) {
               if(parseInt(aIP[ipIndex]) < parseInt(bIP[ipIndex])) {
                  // console.log(`[${ipIndex}]: plus`)
                  return 1
               }
               else if(parseInt(aIP[ipIndex]) > parseInt(bIP[ipIndex])) {
                  // console.log(`[${ipIndex}]: minus`)
                  return -1
               }
            }
         }
         return 0
      })
      var markdownSort = []
      var subArr = []
      
      for(var i=0; i < allSEOMarkdown.length; i++) {
         if(allSEOMarkdown[i].node.frontmatter.version != null && allSEOMarkdown[i].node.frontmatter.version != "0") {
            subArr.push(allSEOMarkdown[i].node)
            console.log(allSEOMarkdown[i].node.frontmatter.version)
         }
         else {
            markdownSort.push(allSEOMarkdown[i].node.frontmatter)
         }
      }
      markdownSort[markdownSort.length] = []
      console.log(markdownSort.length)
      markdownSort[markdownSort.length - 1] = subArr
		console.log(markdownSort)

		return (
		<div className="index-container">
			<Helmet title={config.siteTitle} />
			<SEO postEdges={markdownSort} />
			<main>
				<BodyGrid>
   			   <ToCContainer>
						<div>
							<img src={logo} style={{display: 'inline', padding: '1em', height: '6em', verticalAlign: 'middle'}} />
							<h4 style={{display: 'inline', margin: '0', verticalAlign: 'middle', color: 'white'}}>Prosoft Technolgy</h4>
						</div>
						<TableOfContents
							chapters={markdownSort}
						/>
	 		      </ToCContainer>
					{/* <HeaderContainer>
						<SiteHeader location={this.props.location} />
			 		</HeaderContainer> */}
					<BodyContainer>
						<div className="contributors">
							{allSEOMarkdown.map(({node}) => (
								<div key={node.id}>
									<h1 id={node.frontmatter.title} style={node.frontmatter.title ? {borderBottom: 'black solid'} : {borderBottom: 'none'} }>{node.frontmatter.title}</h1>
									<h2 id={node.frontmatter.subTitle} style={{color: `#EF184F`}}>{node.frontmatter.subTitle}</h2>
									<div style={{width: `90%`, margin: `auto`}} dangerouslySetInnerHTML={{ __html: node.html }} />
								</div>
							))}
						</div>
					</BodyContainer>
				</BodyGrid>
			</main>
		</div>
		)
	}
}

export default Index

const BodyGrid = styled.div`
	height: 100vh;
	display: grid;
	grid-template-rows: 1fr;
	grid-template-columns: 1fr 2fr;

	@media screen and (max-width: 600px) {
		display: flex;
		flex-direction: column;
		height: inherit;
	}
`

const BodyContainer = styled.div`
	grid-column: 2 / 2;
	grid-row: 1 / 1;
	overflow: scroll;
	justify-self: center;
	width: 100%;
	padding: ${props => props.theme.sitePadding};
	@media screen and (max-width: 600px) {
		order: 2;
	}

	& > div {
		max-width: ${props => props.theme.contentWidthLaptop};
		margin: auto;
	}

	&:h1 {
		color: ${props => props.theme.accentDark};
	}
`

const ToCContainer = styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / 1;
  background: ${props => props.theme.darkGrey};
  overflow: scroll;
  @media screen and (max-width: 600px) {
	 order: 3;
	 overflow: inherit;
  }
`

/* eslint no-undef: "off" */
export const pageQuery = graphql`
	query IndexQuery {
		allMarkdown: allMarkdownRemark(
			limit: 2000
			sort: { fields: [frontmatter___chapter], order: ASC }
		) {
			edges {
				node {
					id
					excerpt
					timeToRead
					frontmatter {
                  title
                  subTitle
                  chapter
                  version
					}
					html
				}
			}
		}
	}
`
