const request = require("request")
const path = require("path")
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

  const stateRange = [];
  const countiesRange = [0, 1];

  const statesDataSlice = statesData.slice(...stateRange);
  const countiesDataSlice = countiesData.slice(...countiesRange);

  statesDataSlice.forEach(state => {
    const nodeData = processStateRow(state);
    createNode(nodeData);
  });

  countiesDataSlice.forEach(county => {
    const nodeData = processCountyRow(county);
    createNode(nodeData);
  });
}

const createStatePage = (edge, createPage) => {
  const pageSlug = edge.node.state.toLowerCase().replace(/ /g, "-");
  const component = path.resolve(`src/templates/state.js`);
  const context = {
    state: edge.node.state,
  };
  createPage({
    component,
    context,
    path: pageSlug,
  });
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
  query MyQuery {
    allNyTimesCovid19State {
      edges {
        node {
          state
        }
      }
    }
  }`);

  const stateEdges = result.data.allNyTimesCovid19State.edges;
  stateEdges.forEach(edge => createStatePage(edge, createPage));
}
