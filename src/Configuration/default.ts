import Configuration from './Configuration'
import { Method } from '../Request/Method'

/**
 * Default configuration
 * @version 1.0.0
 * @since 1.0.0
 */
export default <Configuration>{
	method: Method.GET,
	headers: {
		'Transfer-Encoding': 'chunked',
	},
	followRedirects: true,
	keepAlive: false,
}
