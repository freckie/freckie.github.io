import React, { useState, useEffect, useCallback } from "react"
import tw from "twin.macro"
import { Layout } from '../layout'
import { Contents } from '../components/contents'
import { graphql } from "gatsby"
import queryString from "query-string"
import Search from "../components/Search"
import { CATEGORY_TYPE } from '../constants'

const Wrapper = tw.div`w-full max-w-screen-md mx-auto`

export default ({ data, location }) => {
  const posts = data.allMarkdownRemark.edges ? data.allMarkdownRemark.edges : []

  const [state, setState] = useState({
    query: "",
    filteredData: [],
  })

  const handleChange = (query) => {
    if (query.trim() === state.query.trim()) {
      setState({
        ...state,
        query,
      })
      return
    }
    searchPost(query)
  }

  const searchPost = useCallback(
    (query) => {
      if (query.trim() === "") {
        setState({
          query,
          filteredData: [],
        })
        return
      }

      const filteredData = posts.filter((post) => {
        const searchQuery = query.toLowerCase().trim()
        const {
          excerpt,
          frontmatter: { title },
        } = post.node
        return (
          (excerpt && excerpt.toLowerCase().includes(searchQuery)) ||
          (title && title.toLowerCase().includes(searchQuery))
        )
      })

      setState(() => {
        return {
          query: query,
          filteredData: filteredData,
        }
      })
    },
    [posts]
  )

  useEffect(() => {
    if (location.href) {
      const {
        query: { query },
      } = queryString.parseUrl(location.href)
      searchPost(query ? query : "")
    }
  }, [searchPost, location.href])

  return (
    <Layout location={location} title={"공부를 해보자."}>
      {/* <SEO title="Search" /> */}
      <Wrapper>
        <Search
          value={state.query}
          onChange={(e) => handleChange(e.target.value)}
          location={location}
        />
        <Contents
          posts={state.filteredData}
          countOfInitialPost={999}
          count={1}
          category={CATEGORY_TYPE.ALL}
        />
        {/* {state.filteredData.map((post, index) => (
          <Post post={post} key={`post_${index}`} />
        ))} */}
      </Wrapper>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { draft: { eq: false } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 200, truncate: true)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY년 MM월 DD일")
            title
          }
        }
      }
    }
  }
`