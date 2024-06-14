export class DateUtils {
  public getCurrentDateAsString = (format?: string) => {
    return Utilities.formatDate(new Date(), "GMT", format || "yyyy-MM-dd")
  }

  public formatDate = (date: GoogleAppsScript.Base.Date, format?: string) => {
    return Utilities.formatDate(date, "GMT", format || "yyyy-MM-dd")
  }
}