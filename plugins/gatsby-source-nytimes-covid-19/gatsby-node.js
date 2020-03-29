const request = require("request")
const csv = require("csvtojson")
exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {

  const { createNode } = actions

  const processRow = row => {
    const nodeId = createNodeId(`nytimes-covid-19-state-${row.fips}-${row.date}`)
    const nodeContent = JSON.stringify(row)
    const nodeData = {
      ...row,
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `NYTimesCovid19State`,
        content: nodeContent,
        contentDigest: createContentDigest(row),
      }
    }
    return nodeData;
  }

  const statesUrl = `https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv`

  return csv().fromStream(request.get(statesUrl)).subscribe(json => {
    return new Promise((resolve) => {
      const nodeData = processRow(json);
      resolve(createNode(nodeData));
    })
  })
}
