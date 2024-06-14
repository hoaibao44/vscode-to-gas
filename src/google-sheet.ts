export class GoogleSheet {
  public ss: GoogleAppsScript.Spreadsheet.Spreadsheet
  constructor (ssId : string) {
    this.ss = SpreadsheetApp.openById(ssId)
  }

  getSheetInstance = (sheetName:string) => {
    return this.ss.getSheetByName(sheetName)
  }

  getRangeByRow = (sheetName:string, rowIndex: number) => {
    const maxColumn = this.getLast(sheetName, "column")
    return this.getSheetInstance(sheetName).getRange(rowIndex, 1, 1, maxColumn)
  }

  getDataBySheetName = (sheetName:string, filterCallback?: (values:any[][]) => any[][]) => {
    const values = this.getSheetInstance(sheetName).getDataRange().getValues()

    if (filterCallback) {
      return filterCallback(values)
    }

    return values
  }

  getDataByRow = (sheetName:string, rowIndex: number) => {
    return this.getRangeByRow(sheetName, rowIndex).getValues()[0]
  }

  getSheetHeader = (targetSheetName: string) : string[] => {
    return this.getDataBySheetName(targetSheetName)[0]
  }

  getLast = (targetSheetName: string, matric: "column" | "row" = "row"): number => {
    if (matric == "row") return this.getSheetInstance(targetSheetName).getLastRow()
    return this.getSheetInstance(targetSheetName).getLastColumn()
  }

  deleteRow = (targetSheetName: string, rowIndex: number) => {
    // Rows start at "1"
    return this.getSheetInstance(targetSheetName).deleteRow(rowIndex)
  }

  appendRow = (targetSheetName: string, rowContents: any[]) => {
    return this.getSheetInstance(targetSheetName).appendRow(rowContents)
  }

  modifyRow = (targetSheetName: string, rowIndex: number, rowContents: any[]) => {
    return this.getRangeByRow(targetSheetName,rowIndex).setValues([rowContents])
  }

  modifyCell = (targetSheetName: string, rowIndex: number, columnIndex:number, value: any) => {
    return this.getSheetInstance(targetSheetName).getRange(rowIndex,columnIndex).setValue(value)
  }
}
