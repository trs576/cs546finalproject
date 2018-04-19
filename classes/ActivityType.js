class ActivityType {
    // ID of object in database
   // var id;
    // name of activity
   // var name;
    // description of the activity
  //  var description;
    // is the activity active to be selected
  //  var active;
    //array of field objects. One for each field
   // var fields = new Array();

    constructor(id, name, description, active, fields) {
        this._id = id;
        this.name = name;
        this.description = description;
        this.active = active;
        this.fields = fields;
    }

    addField(fieldObj){
        this.fields.push(fieldObj);
    }

}

module.exports = ActivityType;