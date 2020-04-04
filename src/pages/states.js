import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Row = props => (
  <tr>
    <td>{props.date}</td>
    <td>{props.state}</td>
    <td>{props.cases}</td>
    <td>{props.deaths}</td>
  </tr>
)

const IndexPage = ({ data }) => {
  const edges = data.allNyTimesCovid19State.edges;
  return (
    <Layout>
      <SEO title="Home" />
      <table>
        <thead>
          <tr>
            <th>
              Date
            </th>
            <th>
              State
            </th>
            <th>
              Cases
            </th>
            <th>
              Deaths
            </th>
          </tr>
        </thead>
        <tbody>
          {edges.map(({ node }) => <Row key={node.id} {...node} />)}
        </tbody>
      </table>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    allNyTimesCovid19State {
      edges {
        node {
          id
          state
          deaths
          date
          cases
        }
      }
    }
  }
`
