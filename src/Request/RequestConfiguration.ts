import { Method } from './Method'
import Configuration from '../Configuration/Configuration'

/**
 * Configuration that is used when sending Request instances
 * @version 1.0.0
 * @since 1.0.0
 * @todo add options and make them configurable in Request using builder pattern
 */
export default interface RequestConfiguration extends Configuration {
	method: Method
}
