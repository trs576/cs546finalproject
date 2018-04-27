const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const Field = require("../classes/Field");
const activityType = data.activityTypes;
const uuidv1 = require('uuid/v1');

const main = async () => {
    const db = await dbConnection();
    await db.dropDatabase();
    let fields=[ new Field(uuidv1(), "location", "Where did the activity take place aka what mountain", "String", true, true ),
            new Field(uuidv1(), "Skis", "What Skis did you use", "String", true, true ),
            new Field(uuidv1(), "Number of Runs", "How many runs did you take?", "Number", true, true ),
            new Field(uuidv1(), "Ticket Cost", "How much did you pay for a lift ticket?", "Currency", true, true ),
            new Field(uuidv1(), "Discount Used", "Did you get a discount on the lift ticket?", "Boolean", true, true )];
    console.log(fields);
    let activity = await activityType.addActivtyType("Downhill Skiing", "Activity of skiing down a hill or mountain", true, fields);
    let id = activity._id;
    console.log(id);

    fields=[ new Field(uuidv1(), "location", "Where did the activity take place", "String", true, true ),
        new Field(uuidv1(), "Skis", "What Skis did you use", "String", true, true )];
    console.log(fields);
    activity = await activityType.addActivtyType("Cross Country Skiing", "Activity of nordic skiing", true, fields);
    id = activity._id;
    console.log(id);


    console.log("Done seeding database");
    await db.serverConfig.close();
};

main().catch(console.log);