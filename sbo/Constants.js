/*
    thomasjm - This stores constants.
*/
function Constants() {}

//Key Server
Constants.KEY_IDENTIFIER_SIZE = 4;

//Protects
Constants.SYMMETRIC_KEY_SIZE = 128;
Constants.RANDOM_PARANOIA = 0;
Constants.WORD_SIZE = 32;

//Observations
Constants.PROTECTED_EMPTY_VALUE = "SBO-EMPTY";
Constants.UPPERCASE_SET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
Constants.LOWERCASE_SET = "abcdefghijklmnopqrstuvwxyz";
Constants.DIGIT_SET = "0123456789";
Constants.SPECIAL_SET = "!@#$%^&*()_-=+`~[]{}\\|;:\'\"<>,.?/";
Constants.PROTECTED_MAX_LENGTH = 33;
Constants.SALT_HASH_SALT = "$2a$10$/pzpvHJ.ulipi0yNvLoUFu";

//Observation cache
//Constants.MAX_CACHE_SIZE = 500;
//Constants.MAX_SEND_SIZE = 8192000;

Constants.MAX_CACHE_SIZE = 5;
Constants.MAX_SEND_SIZE = 8192000;


Constants.BROWSER_IDENTIFIER_SIZE = 8;
Constants.SALT_SIZE = 32;
Constants.SENDS_PER_PROPERTIES = 100;