import { Method } from '../Request/Method'

/**
 * Configuration for a Hasd instance
 * @version 1.0.0
 * @since 1.0.0
 */
export default interface Configuration {
	headers?: Record<string, string>
	method?: Method
}
