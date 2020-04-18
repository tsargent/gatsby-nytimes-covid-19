import React from 'react'
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { ResponsiveLine } from "@nivo/line"

const nivoData = [
  {
    "id": "japan",
    "color": "hsl(281, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 208
      },
      {
        "x": "helicopter",
        "y": 10
      },
      {
        "x": "boat",
        "y": 101
      },
      {
        "x": "train",
        "y": 54
      },
      {
        "x": "subway",
        "y": 113
      },
      {
        "x": "bus",
        "y": 226
      },
      {
        "x": "car",
        "y": 218
      },
      {
        "x": "moto",
        "y": 150
      },
      {
        "x": "bicycle",
        "y": 295
      },
      {
        "x": "horse",
        "y": 244
      },
      {
        "x": "skateboard",
        "y": 21
      },
      {
        "x": "others",
        "y": 234
      }
    ]
  },
  {
    "id": "france",
    "color": "hsl(107, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 133
      },
      {
        "x": "helicopter",
        "y": 144
      },
      {
        "x": "boat",
        "y": 116
      },
      {
        "x": "train",
        "y": 64
      },
      {
        "x": "subway",
        "y": 271
      },
      {
        "x": "bus",
        "y": 282
      },
      {
        "x": "car",
        "y": 286
      },
      {
        "x": "moto",
        "y": 239
      },
      {
        "x": "bicycle",
        "y": 36
      },
      {
        "x": "horse",
        "y": 230
      },
      {
        "x": "skateboard",
        "y": 153
      },
      {
        "x": "others",
        "y": 50
      }
    ]
  },
  {
    "id": "us",
    "color": "hsl(15, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 47
      },
      {
        "x": "helicopter",
        "y": 45
      },
      {
        "x": "boat",
        "y": 155
      },
      {
        "x": "train",
        "y": 254
      },
      {
        "x": "subway",
        "y": 119
      },
      {
        "x": "bus",
        "y": 290
      },
      {
        "x": "car",
        "y": 189
      },
      {
        "x": "moto",
        "y": 269
      },
      {
        "x": "bicycle",
        "y": 160
      },
      {
        "x": "horse",
        "y": 298
      },
      {
        "x": "skateboard",
        "y": 42
      },
      {
        "x": "others",
        "y": 13
      }
    ]
  },
  {
    "id": "germany",
    "color": "hsl(359, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 232
      },
      {
        "x": "helicopter",
        "y": 234
      },
      {
        "x": "boat",
        "y": 177
      },
      {
        "x": "train",
        "y": 209
      },
      {
        "x": "subway",
        "y": 45
      },
      {
        "x": "bus",
        "y": 234
      },
      {
        "x": "car",
        "y": 107
      },
      {
        "x": "moto",
        "y": 110
      },
      {
        "x": "bicycle",
        "y": 278
      },
      {
        "x": "horse",
        "y": 220
      },
      {
        "x": "skateboard",
        "y": 105
      },
      {
        "x": "others",
        "y": 67
      }
    ]
  },
  {
    "id": "norway",
    "color": "hsl(236, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 111
      },
      {
        "x": "helicopter",
        "y": 42
      },
      {
        "x": "boat",
        "y": 4
      },
      {
        "x": "train",
        "y": 176
      },
      {
        "x": "subway",
        "y": 67
      },
      {
        "x": "bus",
        "y": 143
      },
      {
        "x": "car",
        "y": 165
      },
      {
        "x": "moto",
        "y": 281
      },
      {
        "x": "bicycle",
        "y": 92
      },
      {
        "x": "horse",
        "y": 43
      },
      {
        "x": "skateboard",
        "y": 42
      },
      {
        "x": "others",
        "y": 297
      }
    ]
  }
]
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
        <section style={{height: 500}}>
          <ResponsiveLine 
            data={nivoData} 
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'transportation',
                legendOffset: 36,
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
