const XLSX = require('xlsx');
const { debug  } = require('codeceptjs/lib/output');
const {beautify } = require('codeceptjs/lib/utils');
let dataArr = [];
let dataObj = [];

class LibraryFunctions {


    getRowsBySheetName(sheetName, filePath) {
        let data;
        try {
            if (filePath.toString().endsWith('.xlsx')) {
                const workbook = XLSX.readFile(filePath);
                data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
                debug('Excel Data ' + data);
            }
        }
        catch (e) {
            throw new Error('Exception in reading all rows from excel' + e);
        }
        return data;
    }

    getStatus(data){
        let finalData;
        for(let value of data){
            if(Object.keys(value).includes('Previous Data') && Object.keys(value).includes('New Data')){
                let diff = Object.values(value)[2] - Object.values(value)[1];
                if(diff > 0){
                    finalData = this.pushIntoArray(value,'Upward');
                }
                else if (diff < 0) {
                    finalData = this.pushIntoArray(value,'Downward');
                }
                else{
                    finalData = this.displayStableTrend(value,'Stable');
                }
            }
        }
        return finalData;
    }

    displayStableTrend(value,trend){
        console.log("Component In "+trend+" Trend is " + Object.values(value)[0] + " with TimeStamp " + Object.values(value)[5]);
    }

    pushIntoArray(value,trend){
        console.log("Component In "+trend+" Trend is " + Object.values(value)[0] + " with TimeStamp " + Object.values(value)[5]);
        dataObj.push(Object.values(value)[0],Object.values(value)[2],Object.values(value)[5],trend);
        dataArr.push(dataObj);
        dataObj = [];
        return dataArr;
    }
}

module.exports = LibraryFunctions;
