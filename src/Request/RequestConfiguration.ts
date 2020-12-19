import { Method } from './Method'
import RequestBody from './RequestBody'
import * as http from 'http'
import * as https from 'https'
import { URL } from 'url'

/**
 * Configuration that is used when sending Request instances
 * @version 1.0.0
 * @since 1.0.0
 * @todo add options and make them configurable in Request using builder pattern
 */
export default interface RequestConfiguration {
	method: Method
	baseUrl?: string | URL
	headers: Record<string, string>
	body?: RequestBody
	followRedirects: boolean | number // TODO: Use this
	httpAgent?: http.Agent
	httpsAgent?: https.Agent
}
