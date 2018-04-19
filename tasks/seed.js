const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const Field = require("../classes/Field");
const activityType = data.activityTypes;
const uuidv1 = require('uuid/v1');

const main = async () => {
    const db = await dbConnection();
    await db.dropDatabase();
    const fields=[ new Field(uuidv1(), "location", "Where did the activity take place", "String", true, true ),
            new Field(uuidv1(), "Skis", "What Skis did you use", "String", true, true )];
console.log(fields);
    const activity = await activityType.addActivtyType("Downhill Skiing", "Activity of skiing down a hill or mountain", true, fields);
    const id = activity._id;
    console.log(id);


    console.log("Done seeding database");
    await db.serverConfig.close();
};

main().catch(console.log);