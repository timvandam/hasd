import Configuration from './Configuration'
import { Method } from '../Request/Method'
import http from 'http'
import https from 'https'

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
	followRedirects: 5,
	httpAgent: new http.Agent({ keepAlive: true, timeout: 5000 }),
	httpsAgent: new https.Agent({ keepAlive: true, timeout: 5000 }),
	cookieJar: false,
}
