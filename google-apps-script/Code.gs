function doPost(e){
  try { 
    var data = JSON.parse(e.postData.contents); 
  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({status:'error',message:'invalid_json'}))
      .setMimeType(ContentService.MimeType.JSON);
  }

  var SHEET_NAME = 'Responses';
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if(!sheet){ 
    sheet = ss.insertSheet(SHEET_NAME); 
    sheet.appendRow(['Timestamp','Product','Name','Phone','Address','Score','Total','Answers(JSON)']); 
  }

  var row = [
    new Date(),
    data.product || '',
    data.name || '',
    data.phone || '',
    data.addr || '',
    data.score || '',
    data.total || '',
    JSON.stringify(data.answers || [])
  ];
  sheet.appendRow(row);

  return ContentService
    .createTextOutput(JSON.stringify({status:'success'}))
    .setMimeType(ContentService.MimeType.JSON);
}
