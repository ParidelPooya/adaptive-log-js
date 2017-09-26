'use strict';

let execute = require("../src/index");

let executionTree = {
    concurrency: 1,
    steps :[
        {
            title:'step 1',
            action: (data) => {return {a: 1};},
            output: {
                addToResult: true,
                accessibleToNextSteps: true,
                copyResultToDifferentNode: "different-node"
            }
        },
        {
            title:'step 2',
            action: (data) => {return {b: 2};}
        },
        {
            title:'step 3',
            action: (data) => {return {c: 3};}
        },
        {
            title:'step 4',
            action: (data) => {return {d: 4};}
        },
        {
            title:'step 5',
            action: (data) => {return {e: 5};}
        }
    ]
};



let executionData = {
    sub_id :123
};

execute(executionTree, executionData).then( (result)=> {
    console.log("finished with this result:");
    console.log(result);
}).catch( (e)=> {
    console.log("catch", e);
});