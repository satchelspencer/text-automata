var fs = require('fs');
fs.readFile('mobythes.aur', 'utf-8', function(e, thes){
	var l = thes.split('\r').map(function(m){
		return m.split(',');
	})
	fs.writeFileSync('thes.js', 'var thes = '+JSON.stringify(l)+';')
})