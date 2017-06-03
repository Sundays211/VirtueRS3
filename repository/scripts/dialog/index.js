/**
 * 
 */
var builder = require('./builder');
var common = require('./common');
var multiChoice = require('./multi-choice');

module.exports = {
	builder : builder,
	openModalBase : common.openModalBase,
	requestTool : common.requestTool,
	setResumeHandler : common.setResumeHandler,
	requestMulti : multiChoice.requestMulti,
	multi2 : multiChoice.multi2,
	multi3 : multiChoice.multi3,
	multi4 : multiChoice.multi4,
	multi5 : multiChoice.multi5
};