About
============
Just some very crude but functional sample code for consuming the JIRA REST API from a Node.js client.

Getting Setup
============
  1. Clone the repository
  2. Ensure you have [Node.js](http://nodejs.org/download/) installed.
  3. Install package depenencies by running the following from the command line within this directory: `npm install`

Running the script
==================
### Retrieve an issue (in JSON format)
#### Syntax
```
node jira.js [host] [Issue ID or Key] get
```

#### Example
```
node jira.js jira.mydomain.com PROJ-101 get
```

### Retrieve the value of a specific field
#### Syntax
```
node jira.js [host] [Issue ID or Key] get-field [field name]
```

#### Example
```
node jira.js jira.mydomain.com PROJ-101 get-field summary
```

### Update the value of a field
#### Syntax
```
node jira.js [host] [Issue ID or Key] update-field [field name]
```

#### Example
```
node jira.js jira.mydomain.com PROJ-101 update-field summary "New summary of issue"
```

Options
==================
### Disable SSL certificate validation
WARNING: Using this option is not advisable. SSL certificates should be properly signed, or steps should be taken to configure specific certificates on the client when necessary.

#### Syntax
```
node jira.js [arguments] --validate-ssl-cert=false
```

#### Example
```
node jira.js jira.mydomain.com PROJ-101 get --validate-ssl-cert=false
```