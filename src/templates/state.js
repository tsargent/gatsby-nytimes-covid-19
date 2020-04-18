import React from 'react'
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { ResponsiveLine } from "@nivo/line"

class StateTemplate extends React.Component {

  render() {

    const {
      pathContext,
      data,
    } = this.props;

    const stateData = data.allNyTimesCovid19State;

    const graphData = [{id: 'cases', data: []}, {id: 'deaths', data: []}];
    stateData.edges.forEach((edge, index) => {
      graphData[0].data[index] = {x: edge.node.date, y: Number(edge.node.cases)};
      graphData[1].data[index] = {x: edge.node.date, y: Number(edge.node.deaths)};
    });

    return (
      <Layout>
        <header>
          <h2>{pathContext.state}</h2>
        </header>
        <section style={{height: 500}}>
          <ResponsiveLine 
            data={graphData} 
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: -45,
                legend: 'date',
                legendOffset: 50,
                legendPosition: 'middle'
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'count',
                legendOffset: -40,
                legendPosition: 'middle'
            }}
            colors={{ scheme: 'nivo' }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabel="y"
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}    
          
          />
        </section>
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
