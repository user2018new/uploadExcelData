const path = require('path');
const fs = require('fs');
const styleData = path.join(__dirname,'../Datasheet.xlsx');
const excelProvider = require('../main/LibraryFunctions');
const eProv = new excelProvider();
const Workflow = require('../main/workflow');
const workflow = new Workflow();

Feature('Upload Test');
Scenario('Upload Excel Data In A Website ', async ({ I }) => {

    const initialData = eProv.getRowsBySheetName('Sheet1',styleData);
    const finalData = eProv.getStatus(initialData);
    workflow.navigateToPosts();
    await workflow.assessAndUpdate(finalData);

    }
);
