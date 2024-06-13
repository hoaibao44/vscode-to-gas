import { GoogleSheet } from "./google-sheet"

export class Connection {
  public schema: GoogleSheet
  constructor (ssId: string) {
    this.schema = new GoogleSheet(ssId)
  }

  queryDb = (queryString: string) => {
    // queryString: select * from sheetName
    const {select, from, where} = this.processQueryString(queryString)

    // execute get data from
    let values: any[][], header: string[]
    try {
      values = this.schema.getDataBySheetName(from)
      header = values.shift()
    } catch (e) {
      throw "Target sheet name error"
    }

    // execute filter data
    if (where) {

    }

    // execute select comlums
    if (select !== "*" && select) {
      const targetColumns = select.split(",")

      const targetColumnsIdx = targetColumns.map(item => header.indexOf(item))

      if (targetColumnsIdx.some(item => item < 0)) {
        throw "Select column(s) not exist"
      }

      values = values.map(item => {
        return targetColumnsIdx.map(idx => item[idx])
      })
    }

    return values
  }

  processQueryString = (queryString: string) => {
    return parseSql(queryString)
  }
}

type ParsedSql = {
  select: string;
  from: string;
  where?: string;
};

function parseSql(sql: string): ParsedSql {
  const parts = sql.trim().split(/\s+/); // Split on whitespace (including non-breaking spaces)

  if (parts[0].toLowerCase() !== "select" || parts[2].toLowerCase() !== "from") {
    throw new Error('Invalid SQL string format');
  }

  const parsed: ParsedSql = {
    select: parts[1],
    from: parts[3],
  };
  
  if (parts.length > 3 && parts[3].toLowerCase() === 'where') {
    parsed.where = parts.slice(4).join(' '); // Join remaining parts for where clause
  }

  return parsed;
}
