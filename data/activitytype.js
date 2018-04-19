const mongoCollections = require("../config/mongoCollections");
const ActivityType = require("../classes/ActivityType");
const activtyTypes = mongoCollections.activtyTypes;
const uuidv1 = require('uuid/v1');

let exportedMethods = {
    getAllActivtyTypes() {
        return activtyTypes().then(activtyTypesCollection => {
            return activtyTypesCollection.find().toArray();
        });
    },
    getActivtyTypesById(id) {
        return activtyTypes().then(activtyTypesCollection => {
            return activtyTypesCollection.findOne({ _id: id }).then(activtyType => {
                if (!activtyType) throw "Activity Type not found";
            return activtyType;
        });
    });
    },
    addActivtyType(name, description, active, fields) {

        if (typeof name !== "string") throw "No name provided";
        if (typeof description !== "string") throw "No description provided";
        if (typeof active !== "boolean") throw "active not set";
        if (!Array.isArray(fields)) {
            throw "fields not an array"
        }

        const activty = new ActivityType(uuidv1(), name,description,active,fields);

        return activtyTypes().then(activtyTypesCollection => {


        return activtyTypesCollection
            .insertOne(activty)
            .then(newInsertInformation => {
                return newInsertInformation.insertedId;
            })
        .then(newId => {
            return this.getActivtyTypesById(newId);
        });
        });
    }/*,
    removeRecipe(id) {
        return recipes().then(recipeCollection => {
            return recipeCollection.removeOne({ _id: id }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete recipe with id of ${id}`;
                } else {
                }
            });
        });
    },
    updateRecipe(id, updatedRecipe) {
        const updatedRecipeData = {};

        if(updatedRecipe.title){

            if (typeof updatedRecipe.title !== "string") throw "No title provided";
            console.log("here");
            updatedRecipeData.title = updatedRecipe.title;
        }

        if(updatedRecipe.ingredients){
            if (typeof updatedRecipe.ingredients !== "object") throw "No incredients provided";
            updatedRecipeData.ingredients = updatedRecipe.ingredients;
        }

        if(updatedRecipe.steps){
            if (!Array.isArray(updatedRecipe.steps)) {
                throw "Steps not an array"
            }
            updatedRecipeData.steps = updatedRecipe.steps;
        }

        let updateCommand = { $set: updatedRecipeData};

        const query = {
            _id: id
        };

        return recipes().then(recipeCollection => {
            return recipeCollection
                .updateOne(query,updateCommand)
                .then(newInsertInformation => {
                   return this.getRecipeById(id);
                });
        });

    },
    replaceRecipe(id, title, ingredients, steps) {
        const updatedRecipeData = {};

        if(title && ingredients && steps){
            if (typeof title !== "string") throw "No title provided";
            updatedRecipeData.title = title;

            if (typeof ingredients !== "object") throw "No incredients provided";
            updatedRecipeData.ingredients = ingredients;

            if (!Array.isArray(steps)) {
                throw "Steps not an array"
            }

            updatedRecipeData.steps = steps;
        } else {
            throw "Not all fields supplied";
        }


        let updateCommand = { $set: updatedRecipeData};

        const query = {
            _id: id
        };

        return recipes().then(recipeCollection => {
            return recipeCollection
                .updateOne(query,updateCommand)
                .then(newInsertInformation => {
                return this.getRecipeById(id);
            });
        });

    }*/
};

module.exports = exportedMethods;