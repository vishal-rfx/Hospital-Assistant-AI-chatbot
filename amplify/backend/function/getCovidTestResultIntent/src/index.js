/* Amplify Params - DO NOT EDIT
	ENV
	INTERACTIONS_HOSPITALASSISTANTBOT_BOTNAME
	REGION
	STORAGE_COVIDTESTDETAILSDB_ARN
	STORAGE_COVIDTESTDETAILSDB_NAME
	STORAGE_COVIDTESTDETAILSDB_STREAMARN
Amplify Params - DO NOT EDIT */

exports.handler = async (event) => {
    // TODO implement
    const response = {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  }, 
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
