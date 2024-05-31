import hpp from 'hpp';

/**
 *
 * @description Express middleware to protect against HTTP Parameter Pollution attacks
 *
 */
export default function devHpp() {
	return hpp();
}
