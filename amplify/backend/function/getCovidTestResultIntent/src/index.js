/* Amplify Params - DO NOT EDIT
	ENV
	INTERACTIONS_HOSPITALASSISTANTBOT_BOTNAME
	REGION
	STORAGE_COVIDTESTDETAILSDB_ARN
	STORAGE_COVIDTESTDETAILSDB_NAME
	STORAGE_COVIDTESTDETAILSDB_STREAMARN
Amplify Params - DO NOT EDIT */

const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();


const COVID_NEG = (intentReq,name) => {
    return {
        sessionAttributes : intentReq.sessionAttributes,
        dialogAction : {
            type :"Close",
            fulfillmentState : "Fulfilled",
            message: {
                contentType : "PlainText",
                content: `Dear ${name} We are very happy to say that your covid result is comes out to be negative. Please wear mask all the time for precaution`
            }
        }
    }
}

const COVID_POS = (intentReq,name) => {
    return {
        sessionAttributes : intentReq.sessionAttributes,
        dialogAction : {
            type :"Close",
            fulfillmentState : "Fulfilled",
            message: {
                contentType : "PlainText",
                content: `Dear ${name} We are sorry to say that you are covid positive. Please visit a nearby hospital. We wish you a speedy recovery`
            }
        }
    }
}

const COVID_PROCESS = (intentReq,name) => {
    return {
        sessionAttributes : intentReq.sessionAttributes,
        dialogAction : {
            type :"Close",
            fulfillmentState : "Fulfilled",
            message: {
                contentType : "PlainText",
                content: `Dear ${name} your covid test result is still not out yet. Please be patient and don't get panicked.`
            }
        }
    }
}

const WRONG = (intentReq,name) => {
    return {
        sessionAttributes : intentReq.sessionAttributes,
        dialogAction : {
            type :"Close",
            fulfillmentState : "Fulfilled",
            message: {
                contentType : "PlainText",
                content: `Dear ${name} My dev is lazy goose pls wait till he fix me`
            }
        }
    }
}

const response_format = {
  sessionAttributes: {},
  dialogAction: {
    type: "Close",
    fulfillmentState: "Fulfilled",
    message: {
      contentType: "PlainText",
      content: "Its fulfilled",
    },
  },
};

const delegate = (sessionAttributes, slots) => {
  return {
    sessionAttributes,
    dialogAction: {
      type: "Delegate",
      slots,
    },
  };
};

const elicitSlot = (sessionAttrs, intentName, slots, slotToElicit, message) => {
  return {
    sessionAttrs: sessionAttrs,
    dialogAction: {
      type: "ElicitSlot",
      intentName: intentName,
      slots: slots,
      slotToElicit: slotToElicit,
      message: message,
    },
  };
};

const fulfill = async (intentReq) => {
    const userRef = intentReq.currentIntent.slots.UserRefID.toLowerCase()

    const params = {
        TableName : process.env.STORAGE_COVIDTESTDETAILSDB_NAME,
        Key : {
            user_ref_id : userRef
        },
    }

    const data = await docClient.get(params).promise()
    let name = data.Item.name
    let status = data.Item.status

    if(status == "0"){
        return COVID_PROCESS(intentReq,name)
    }

    if(status == "1"){
        return COVID_POS(intentReq,name)
    }

    if(status == "-1"){
        return COVID_NEG(intentReq,name)
    }
    

};

const validateUserRefId = async (userRefId) => {
  let id = userRefId.toLowerCase();
  const params = {
    TableName: process.env.STORAGE_COVIDTESTDETAILSDB_NAME,
    Key: {
      user_ref_id: id
    },
  };

  const data = await docClient.get(params).promise();
  if (Object.keys(data).length === 0) {
    return {
      isValid: false,
      violatedSlot: "UserRefID",
      message: {
        contentType: "PlainText",
        content:
          "Patient Reference ID seems to be wrong, Please provide a valid Patient Reference ID",
      },
    };
  }

  return {
    isValid: true,
    violatedSlot: "No Violation",
  };
};

const getTestResultIntent = async (intentReq) => {
  const source = intentReq.invocationSource;
  if (source === "DialogCodeHook") {
    const slots = intentReq.currentIntent.slots;
    const userRefId = intentReq.currentIntent.slots.UserRefID;
    const validateResult = await validateUserRefId(userRefId);
    // return validateResult.isValid
    if (validateResult.isValid===false) {
      slots.UserRefID = null;
      return elicitSlot(
        intentReq.sessionAttributes,
        intentReq.currentIntent.name,
        slots,
        validateResult.violatedSlot,
        validateResult.message
      );
    }

    return delegate(intentReq.sessionAttributes, intentReq.currentIntent.slots);
  } else if (source === "FulfillmentCodeHook") {
    return fulfill(intentReq);
  }
};

const dispatch = (intentReq) => {
  const userRefId = intentReq.currentIntent.slots.UserRefID;
  if (userRefId === null) {
    return delegate(intentReq.sessionAttributes, intentReq.currentIntent.slots);
  }

  return getTestResultIntent(intentReq);
};

exports.handler = async (event) => {
  const response = dispatch(event);
  return response;
};
