/*
	This entropy calculation is provided as part of replication coordination:
	Rick Wash, Emilee Rader, Ruthie Berman, and Zac Wellmer. (2016). "Understanding Password Choices: How Frequently Entered Passwords are Re-used Across Websites". SOUPS 2016. Denver, CO. https://www.usenix.org/system/files/conference/soups2016/soups2016-paper-wash.pdf
*/

function EntropyUtility() {
	
}

EntropyUtility.calculate = function (input) {

        //Determine the size of the Character set
        var CharsetSize = 0;

        //check for lowercase
        var searchAlphaLC = /[abcdefghijklmnopqrstuvwxyz]/;
        if (searchAlphaLC.test(input))
        { CharsetSize += 26; }

        //check for uppercase
        var searchAlphaUC = /[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/;
        if (searchAlphaUC.test(input))
        { CharsetSize += 26; }

        //check for numeric
        var searchNumeric = /[0123456789]/;
        if (searchNumeric.test(input))
        { CharsetSize += 10; }

        //check for special characters
        var searchSpecial = /[\!\@\#\$\%\^\&\*\(\)\-\_\+\=\~\`\[\]\{\}\|\\\:\;\"\'\<\>\,\.\?\/]/;
        if (searchSpecial.test(input)) {

                //check for extended special characters
                //if extended chars are included use full set of special chars
                //otherwise use common set of special chars
                var searchSpecialExt = /[\^\~\`\[\]\{\}\|\:\;\<\>]/;
                if(searchSpecialExt.test(input))
                { CharsetSize += 32; }
                else
                { CharsetSize += 20; }
        }
        return (Math.log( Math.pow(CharsetSize, input.length) ) / Math.log(2));
};
