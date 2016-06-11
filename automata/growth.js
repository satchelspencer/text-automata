function growth(cell, i, j, cells){
	var val = cell.v;
	if(cell.age > 10){
		cell.age = -30;
		cell.v = null;
	}else if(val){
		cell.v = val; //no death yet
	}else if(cell.age >= 0){
		var dirs = [[0,1],[1,0],[0,-1],[-1,0]]; //down, right, up, left
		var neighbors = 0;
		var possibles = _.chain(dirs).map(function(dir){
			if(cells[i+dir[0]]&&cells[i+dir[0]][j+dir[1]]&&cells[i+dir[0]][j+dir[1]].v) neighbors++; //if its even there
			var ii = i;
			var ji = j;
			var reverse = dir[0]+dir[1] < 0;
			var n; //next char
			var segment = '';
			do{	
				ii += dir[0];
				ji += dir[1];
				n = cells[ii]&&cells[ii][ji]&&cells[ii][ji].v;
				if(n){
					if(reverse) segment = n+segment;
					else segment = segment+n;
				}
			}while(n);
			if(segment.length){
				var words = _.filter(dictionary, function(dword){
					var dwordsegment = _[reverse?'first':'last'](dword, segment.length);
					return dwordsegment.join('') == segment;
				})
				var word = _.shuffle(words)[0];
				return word&&word[reverse?segment.length:(word.length-segment.length-1)]; //
			}
		}).compact().value();
		if(possibles.length != 1 || neighbors > 1) cell.v = null;
		else{
			cell.v = possibles[0];
			cell.age = 1; //start aging
		}
	}
}