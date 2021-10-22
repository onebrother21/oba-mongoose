module.exports = {
	globals: {'ts-jest': {tsconfig: 'tsconfig.json'}},
	moduleFileExtensions: ['ts','js'],
	transform: {'^.+\\.(ts|tsx)$': './node_modules/ts-jest'},
	testMatch: ['**/oba-mongoose/test/all.test.(ts|js)'],
	testEnvironment: 'node'
};