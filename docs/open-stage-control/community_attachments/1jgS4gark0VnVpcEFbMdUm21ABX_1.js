//// excelVariablesConfig.js
const xlsx = nativeRequire('xlsx');
const path = nativeRequire('path');
const workbook = xlsx.readFile(path.join(__dirname, '../Variables.xlsx'));



module.exports = {

    thisIsTest: {
        excelTest: 'Test Returned from excelVariables' + workbook.SheetNames

    }

};

//const path = require('path');
//const xlsx = require(path.join(__dirname, '../../'));

//// Load the Excel file
//const workbook = xlsx.readFile(path.join(__dirname, '../Variables.xlsx'));

//// Log sheet names
//console.log("Excel file used to get library data: 'C:/Users/treca/Open Stage Control/Custom Modules/Variables.xlsx'");
//console.log("Excel Sheet Name used to get library data:", workbook.SheetNames);

//// Get Chord change variable
//const chordSheetName = workbook.SheetNames[1];
//const chordSheet = workbook.Sheets[chordSheetName];
//const excelChordValues = xlsx.utils.sheet_to_json(chordSheet, { header: 1, raw: false });
//var chordChange = excelChordValues;

//// Get chordchange preArg Value
//const chordSheetPreArg = workbook.SheetNames[2];
//const preArgSheet = workbook.Sheets[chordSheetPreArg];
//const excelChordpreArgValues = xlsx.utils.sheet_to_json(preArgSheet, { header: 1, raw: false });

//// Assume the data is in the first sheet (index 0)
//const sheetName = workbook.SheetNames[0];
//const sheet = workbook.Sheets[sheetName];
//const excelValues = xlsx.utils.sheet_to_json(sheet, { header: 0, raw: false });
//var libraryRef = excelValues;

//module.exports = {
//    chordChange,
//    excelChordpreArgValues,
//    libraryRef
//};
