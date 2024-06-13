export class GoogleSheet {
  public ss: GoogleAppsScript.Spreadsheet.Spreadsheet
  constructor (ssId : string) {
    this.ss = SpreadsheetApp.openById(ssId)
  }

  getDataBySheetName = (sheetName:string) => {
    return this.ss.getSheetByName(sheetName).getDataRange().getValues();
  }
}
