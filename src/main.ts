import { GoogleSheet } from "./google-sheet"
import { Connection } from "./query"

function getData() {
  const ss = new GoogleSheet('1NwLVf7enl7IsRb6TNUHkvbc6i7NOU6hLMZR0jzEdD-Y')

  const values = ss.getDataBySheetName('ProjectDetail');
  
  Logger.log(values)

  return values;
}

function getDataByQuery() {
  const cn = new Connection('1NwLVf7enl7IsRb6TNUHkvbc6i7NOU6hLMZR0jzEdD-Y')

  const values = cn.queryDb("select * from Project")
  Logger.log(values)

  return values
}