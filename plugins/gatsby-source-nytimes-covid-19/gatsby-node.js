const request = require("request")
const csv = require("csvtojson")
exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions
  const statesUrl = `https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv`
  const countiesUrl = `https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv` 

  const processStateRow = row => {
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

  const processCountyRow = row => {
    const nodeId = createNodeId(`nytimes-covid-19-county-${row.fips}-${row.date}`)
    const nodeContent = JSON.stringify(row)
    const nodeData = {
      ...row,
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `NYTimesCovid19County`,
        content: nodeContent,
        contentDigest: createContentDigest(row),
      }
    }
    return nodeData;
  }

  const statesData = await csv().fromStream(request.get(statesUrl));
  const countiesData = await csv().fromStream(request.get(countiesUrl));

  statesData.forEach(state => {
    const nodeData = processStateRow(state);
    createNode(nodeData);
  });

  countiesData.forEach(county => {
    const nodeData = processCountyRow(county);
    createNode(nodeData);
  });
}
