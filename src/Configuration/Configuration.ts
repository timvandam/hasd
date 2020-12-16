import RequestConfiguration from '../Request/RequestConfiguration'

/**
 * Configuration for a Hasd instance
 * @version 1.0.0
 * @since 1.0.0
 */
export default interface Configuration extends Partial<RequestConfiguration> {
	// Cookie and authorization related settings would probably be handy here
}
