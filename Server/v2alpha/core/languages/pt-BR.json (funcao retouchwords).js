    if (string.length > 1) {
    	for (var i = string.length - 1; i > 0; i--) {
    		if (isAlpha(string[i])) {
    			if (string[i] == string[i - 1]) {
    				if (string[i] == 'r' || string[i] == 's') {
    					if (i > 1) {
    						if (string[i] == string[i - 2]) {
    							string = string.slice(0, i - 1) + string.slice(i);
    						}
    					}
    				} else {
    					string = string.slice(0, i - 1) + string.slice(i);
    				}
    			} else {
    				if ((string[i] == 'a' && (string[i - 1] == 'á') || (string[i - 1] == 'à')) || (string[i] == 'e' && (string[i - 1] == 'é')) || (string[i] == 'i' && (string[i - 1] == 'í')) || (string[i] == 'o' && (string[i - 1] == 'ó')) || (string[i] == 'u' && (string[i - 1] == 'ú'))) {
    					string = string.slice(0, i) + string.slice(i + 1);
    				} else if (((string[i] == 'á') || (string[i] == 'à') && (string[i - 1] == 'a')) || (string[i] == 'é' && (string[i - 1] == 'e')) || (string[i] == 'í' && (string[i - 1] == 'i')) || (string[i] == 'ó' && (string[i - 1] == 'o')) || (string[i] == 'ú' && (string[i - 1] == 'u'))) {
    					string = string.slice(0, i - 1) + string.slice(i);
    				} else if (string[i-1] == 'r' && string[i] == 's' && string[i-3] == 'r' && string[i-2] == 's'){
						string = string.slice(0, i - 2) + string.slice(i);
					}
    			}
    		}
    	}
    	if (isAlpha(string[0])) {
    		if (string[0] == string[1]) {
    			if (string[0] == 'r' || string[0] == 's') {
    				string = string.slice(0, 0) + string.slice(1);
    			}
    		}
    	}
    	if (isAlpha(string[string.length - 2])) {
    		if (string[string.length - 2] == string[string.length - 1]) {
    			if (string[string.length - 2] == 'r' || string[string.length - 2] == 's') {
    				string = string.slice(0, string.length - 2) + string.slice(string.length - 1);
    			}
    		}
    	}
    }
    if (string[0] == 'k' && string.length == 1) {
    	string = 'kkkk';
    }
	if (string[0] == 'r' && string[1] == 's' && string.length == 2) {
    	string = 'rsrs';
    }