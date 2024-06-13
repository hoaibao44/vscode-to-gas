// doc: https://developer.nulab.com/docs/backlog/api/2/get-project/#

const BASE_URL = "https://teq-dev.backlog.com"
const API_KEY = "EaHjVw0DhsrnlXRj2nsfkF5d6eXiBZQoJvNk6cWwaL3WaSS7alv8sqm6hLCcc5nQ"
const API_PARAM = "?apiKey=" + API_KEY

const END_POINT = {
  me: "/api/v2/users/myself",
  project: "/api/v2/projects/:projectIdOrKey",
  issues: "/api/v2/issues"
}

function request({target_endpoint, params}:{target_endpoint:string, params?:string}) {
  const fullUrl = params? BASE_URL + target_endpoint + API_PARAM + params : BASE_URL + target_endpoint + API_PARAM
  const data = UrlFetchApp.fetch(fullUrl)
  return JSON.parse(data.getContentText())
}


function getProjectInfo() {
  const endpoint = END_POINT.project.replace(":projectIdOrKey", "SPIO")
  const data = request({target_endpoint: endpoint})
  return data
}

function getIssues() {

  const projectInfo = getProjectInfo()
  const projectId = projectInfo["id"]

  const queryParams = "&projectId[]=" + projectId

  const data = request({target_endpoint: END_POINT.issues, params: queryParams})
  const issues = data.map((item) => {
    return item["id"]
  })
  console.log(issues)
}

export { getIssues }