import React from 'react'
import { graphql } from "gatsby"
import Layout from "../components/layout"

class StateTemplate extends React.Component {

  render() {

    const {
      pathContext,
      data,
    } = this.props;

    const stateData = data.allNyTimesCovid19State;

    return (
      <Layout>
        <header>
          <h2>{pathContext.state}</h2>
        </header>

        <section>
          <table>
            <thead>
              <tr>
                <th>
                  Date
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
            {stateData.edges.map(edge => (
              <tr key={edge.node.date}>
                <td>{edge.node.date}</td>
                <td>{edge.node.cases}</td>
                <td>{edge.node.deaths}</td>
              </tr>
            ))}              
            </tbody>
          </table>
        </section>

      </Layout>
    )
  }
}

export default StateTemplate;

export const pageQuery = graphql`
  query RowByState($state: String!) {
    allNyTimesCovid19State(filter: {state: {eq: $state}}) {
      edges {
        node {
          id,
          cases,
          deaths,
          state,
          date
        }
      }
    }
  }
`
