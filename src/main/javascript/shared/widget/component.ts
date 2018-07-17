/**
 * Helper function for generating component hashes
 */
export default function (widget: number, comp: number): number {
	return (widget << 16) | comp;
};
