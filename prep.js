var fs = require('fs');
// fs.readFile('data/mobythes.aur', 'utf-8', function(e, thes){
// 	var l = thes.split('\r').map(function(m){
// 		return m.split(',');
// 	})
// 	fs.writeFileSync('thes.js', 'var thes = '+JSON.stringify(l)+';')
// })
fs.readFile('data/th_en_US_new.dat', 'utf-8', function(e, thes){
	var lines = thes.split('\n');
	var groups = [];
	var currentGroup;
	for(var l = 0;l < lines.length;l++){
		var line = lines[l];
		if(line[0] == '('){ //continue current
			currentGroup = currentGroup.concat(line.split('|').map(function(word){
				return word.trim();
			}).splice(1));
		}else{
			if(currentGroup) groups.push(currentGroup);
			currentGroup = [line.split('|')[0].trim()];
		}
	}
	fs.writeFileSync('thes.js', 'var thes = '+JSON.stringify(groups)+';')
})