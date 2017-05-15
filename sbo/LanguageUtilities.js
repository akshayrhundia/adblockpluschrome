/*
	thomasjm - Basic language utilities.
*/

function LanguageUtilities() 
{
	
}

LanguageUtilities.countSet = function(input, set) {
	var count = 0;
	for (var characterIndex = 0; characterIndex < input.length; characterIndex++) {
		var character = input.charAt(characterIndex);
		if (set.includes(character) == true) {
			count++;
		}
	}
	return count;
}

LanguageUtilities.deepFind = function(input, path) {
	var paths = path.split('.');
	var current = input;
	var index;

  for (index = 0; index < paths.length; index++) {
    if (current[paths[index]] == undefined) {
      return undefined;
    } else {
      current = current[paths[index]];
    }
  }
  return current;
}

LanguageUtilities.merge = function(primary, secondary) {
	var output = {};
	if (secondary) {
		for(var item in secondary) {
			output[item] = secondary[item];
		}
	} else {
		var none = {};
	}
	if (primary) {
		for(var item in primary) {
			output[item] = primary[item];
		}
	} else {
		var none = {};
	}
	return output;
}

LanguageUtilities.timestamp = function() {
	return Math.floor((new Date).getTime());
}

LanguageUtilities.guid = function() {
	return guid();
}

LanguageUtilities.performanceTimestamp = function() {
	var start = PerformanceTiming.navigationStart ;
	var now = performance.now();
	return start + now;
}


function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}