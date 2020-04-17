import React from 'react';
import { StaticQuery, graphql, Link } from "gatsby"

const StateNav = ({ data } ) => (
  <nav style={{display: 'flex', flexWrap: 'wrap'}}>
    {data.map(({ state, slug }) => (
      <Link to={slug} style={{margin: '0 0.5rem'}}>{state}</Link>
    ))}
  </nav>
);

  export default () => (
  <StaticQuery
    query={graphql`
        { 
          allState(sort: {fields: state, order: ASC}) {
            nodes {
              fips
              state
              slug
            }
          }
        }
    `}
    render={data => <StateNav data={data.allState.nodes} /> }
  />
);
