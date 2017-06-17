/**
 * Helper function for generating component hashes
 */
module.exports = function (widget, comp) {
	return (widget << 16) | comp;
};