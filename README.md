### Enable script API
https://script.google.com/home/usersettings


### first off, install then login (globally)

Install
```js
npm install -g @google/clasp
```

Ver check
```
clasp -v
```

Login
```
clash login
```

### clone to local
terminal is on `vscode-to-gas`

```
clasp clone your_project_id --rootDir=src
```

### push to cloud
terminal is on `vscode-to-gas`
```
clasp push
```

### open gas on cloud
terminal is on `vscode-to-gas`
```
clasp open
```

### About clasp run
It will not run your local version of yours code, it run the cloud version after you `clasp push`.
So no way to debug your code locally.

Anyway, Need Auth json cred from google, download it as `creds.json`, run `clasp login --creds creds.json`
```
clasp run yourFunctionName
```