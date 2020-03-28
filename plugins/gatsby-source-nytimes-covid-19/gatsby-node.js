const request = require("request")
exports.sourceNodes = () => {

  const csvCounties = `https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv`
  request.get(csvCounties, (error, response, body) => {
    console.log('csvCounties', body);
  });

  const csvStates = `https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv`
  request.get(csvStates, (error, response, body) => {
    console.log('body', body);
  });
}
