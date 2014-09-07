var request = require('request');
var async = require('async');
var prompt = require('prompt');

var args = {
	host: process.argv[2],
	issueIdOrKey: process.argv[3],
	command: process.argv[4],
	custom1: process.argv[5],
	custom2: process.argv[6]
};

var username;
var password;

var request = request.defaults({jar: true})

function getServiceUrl(path) {
	return "https://" + username + ":" + password + "@" + args.host + path;
}

function showResponse(error, response, body) {
	  if (!error) {
	  	console.log('***** RESPONSE ******');
	    console.log(body);
	    console.log('*********************');
	  } else {
	  	console.log(error);
	  }
}

function login(callback) {
	var properties = [
	    {
	      name: 'username', 
	      validator: /^[a-zA-Z\s\-]+$/,
	      warning: 'Username may be only letters, spaces, or dashes.'
	    },
	    {
	      name: 'password',
	      hidden: true
	    }
  	];

    prompt.start();

	prompt.get(properties, function (err, result) {
		if (err) 
		{ 
			console.log(err);
			process.exit(code=1);
		}
		username = result.username;
		password = result.password;
		callback();
	});
}

var updateFieldOnIssue = function(issueIdOrKey, fieldName, newValue) {
	console.log('Updating issue ' + issueIdOrKey);

	var payload = {};
	payload.fields = {};
	payload.fields[fieldName] = newValue;

	request.put(getServiceUrl("/rest/api/2/issue/" + issueIdOrKey, true), 
	{
	    json: payload
	}, 
		function (error, response, body) {

		  if (!error && response.statusCode == 204) {
		    console.log('Successfully updated field.');
		  } else {
		  	console.log(body);
		  	console.log(error);
		  }
	});
};



var getIssue = function(issueIdOrKey, field) {
	var url = getServiceUrl("/rest/api/2/issue/" + issueIdOrKey);
	request(url, 
		function(error, response, body) {
			if (field) {
				var issue = JSON.parse(body);
				console.log(field + ": " + issue.fields.summary);
			} else {
				console.log(body);
			}
		}
	);

	console.log()
}

// *** SCRIPT EXECUTION STARTS HERE ** /
if (process.argv.indexOf('--validate-ssl-cert=false') >= 0) {
	process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
}

login(function() {
	var issueIdOrKey = args.issueIdOrKey;

	var action = args.command;
	switch (action) {
		case "get":
			getIssue(issueIdOrKey);
			break;
		case "get-field":
			getIssue(issueIdOrKey, args.custom1);
			break;
		case "update-field":
			updateFieldOnIssue(issueIdOrKey, args.custom1, args.custom2);
			break;
		default:
			console.log("Unrecognized command: " + args.command);
			break;
	}

});
