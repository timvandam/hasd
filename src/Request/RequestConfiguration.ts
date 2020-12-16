import { Method } from './Method'
import RequestBody from './RequestBody'

/**
 * Configuration that is used when sending Request instances
 * @version 1.0.0
 * @since 1.0.0
 * @todo add options and make them configurable in Request using builder pattern
 */
export default interface RequestConfiguration {
	method: Method
	headers: Record<string, string>
	body?: RequestBody
	followRedirects: boolean
	keepAlive: boolean
}
