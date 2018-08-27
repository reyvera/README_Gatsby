import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

/* eslint react/no-array-index-key: "off" */

const Links = ({ title }) => (
	<StyledLinkList>
		<EntryListItem>
			<a href={`#${title}`}>
				<EntryTitle>{title}</EntryTitle>
			</a>
		</EntryListItem>
	</StyledLinkList>
)

const ChapterList = ({ chapters, title, chapter, level = 0 }) => (
  	<StyledChapterList>
  		{title && (
	 		<ChapterListItem key={`${title}${level}`}>
				<a href={`#${title}`}><ChapterTitle level={level}>{title}</ChapterTitle></a>
	 		</ChapterListItem>
  		)}
  		{/* <ChapterListItem>{chapter && <Links title={title} />}</ChapterListItem> */}
		{/* <ChapterListItem> */}
			{chapters && 
				chapters.map((chapter, index) => (
					// <ChapterList {...chapter.frontmatter} level={level + 1} key={`${index}`} />
					<ChapterListItem key={`${index}`}>{chapter.frontmatter.chapter && <Links title={chapter.frontmatter.subTitle} />}</ChapterListItem>
				))
			}
		{/* </ChapterListItem> */}
	</StyledChapterList>

)

const TableOfContents = ({ chapters }) => (
	<TOCWrapper>
	{chapters.map((chapter, index) => (
		// (chapter instanceof Array) ? console.log("Array") : console.log("NOT array")
		<ChapterList title={chapter.title} chapter={chapter.chapter} chapters={(chapter instanceof Array) ? chapter : ""} key={index} />
	))}
	</TOCWrapper>
)

export default TableOfContents

const TOCWrapper = styled.div`
	padding: ${props => props.theme.sitePadding};
	margin: 0;
`

const StyledChapterList = styled.ol`
	list-style: none;
	margin: 0;
`

const StyledLinkList = styled.ol`
	list-style: none;
`

const EntryTitle = styled.h6`
	display: inline-block;
	font-weight: 200;
	color: white;
	margin: 0;
	padding-left: 2em;
	line-height: 1.5;
	border-bottom: 1px solid transparent;
	text-decoration: none;
	&:hover {
		color: ${props => props.theme.accent};
	}
`

const ChapterListItem = styled.li`
	margin: 0;
`

const EntryListItem = styled.li`
	margin: 0;
	a:hover {
		border-bottom: 1px solid black;
	}
`

const ChapterTitle = styled.h5`
	font-weight: ${({ level }) => {
		switch (level % 3) {
		case 1:
			return '600'
		case 2:
			return '400'
		default:
			return '200'
		}
	}};
	font-size: ${({ level }) => {
		switch (level % 3) {
		case 1:
			return '1.8rem'
		case 2:
			return '1.8rem'
		default:
			return '2.3rem'
		}
	}};
	color: ${({ level, theme }) => {
		switch (level % 3) {
		case 1:
			return theme.darkGrey
		case 2:
			return theme.accent
		default:
			return 'white'
		}
	}};
	a:hover {
		color: ${props => props.theme.accent};
	}
`
