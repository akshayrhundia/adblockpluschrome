/*
    Represents observation objects.
*/

function Observation()
{
	this.staticProperties = {};
	this.protectedProperties = {};
	
	this.getProperties = function() {
		var normalProperties = {};
		var protectProperties = {};
		var properties = {
			normal: LanguageUtilities.merge(this.staticProperties, normalProperties),
			protect: LanguageUtilities.merge(this.protectedProperties, protectProperties),
		};
		return properties;
	};
	
	this.getStaticProperties = function() {
		return this.staticProperties;
	};
	
	this.getProtectedProperties = function() {
		return this.protectedProperties;
	};
	
	this.addStaticProperty = function(name, value) {
		this.staticProperties[name] = value;
	};
	
	this.addStaticProperties = function(inputs) {
		this.staticProperties = LanguageUtilities.merge(this.staticProperties, inputs);
	};
	
	this.addProtectedProperties = function(inputs) {
		for (var key in inputs) {
			if (inputs.hasOwnProperty(key)) {
				this.addProtectedProperty(key, inputs[key]);
			}
		}
	};
	
	this.addProtectedProperty = function(inputName, input) {
		if (input) {
			this.protectedProperties[inputName] = input;
		} else {
			this.addStaticProperty(inputName, Constants.PROTECTED_EMPTY_VALUE);
		}
	};
}
