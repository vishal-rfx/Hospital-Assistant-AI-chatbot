export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "hospitalassistantbot": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string"
        }
    },
    "interactions": {
        "hospitalassistantbot": {
            "Region": "string",
            "BotName": "string",
            "FunctionArn": "string"
        }
    },
    "storage": {
        "CovidTestDetailsDB": {
            "Name": "string",
            "Arn": "string",
            "StreamArn": "string",
            "PartitionKeyName": "string",
            "PartitionKeyType": "string",
            "Region": "string"
        }
    },
    "function": {
        "getCovidTestResultIntent": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    }
}