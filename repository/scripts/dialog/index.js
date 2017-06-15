/**
 * 
 */
var builder = require('./builder');
var common = require('./common');
var multiChoice = require('./multi-choice');
var input = require('./input');
var chat = require('./chat');
var util = require('./util');

module.exports = {
	builder : builder,
	openModalBase : common.openModalBase,
	requestTool : common.requestTool,
	setResumeHandler : common.setResumeHandler,
	closeModal : common.closeModal,
	requestMulti : multiChoice.requestMulti,
	chatplayer : chat.chatplayer,
	chatnpc : chat.chatnpc,
	mesbox : chat.mesbox,
	objbox : chat.objbox,
	multi2 : multiChoice.multi2,
	multi3 : multiChoice.multi3,
	multi4 : multiChoice.multi4,
	multi5 : multiChoice.multi5,
	requestCount : input.requestCount,
	requestName : input.requestName,
	requestString : input.requestString,
	requestItem : input.requestItem,
	requestPlayer : util.requestPlayer
};