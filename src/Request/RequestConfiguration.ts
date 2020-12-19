import { Method } from './Method'
import RequestBody from './RequestBody'
import * as http from 'http'
import * as https from 'https'
import { URL } from 'url'
import CookieJar from '../CookieJar/CookieJar'

/**
 * Configuration that is used when sending Request instances
 * @version 1.0.0
 * @since 1.0.0
 */
export default interface RequestConfiguration {
	method: Method
	baseUrl?: string | URL
	headers: Record<string, string>
	body?: RequestBody
	followRedirects: boolean | number // TODO: Use this
	httpAgent?: http.Agent
	httpsAgent?: https.Agent
	cookieJar?: CookieJar | boolean
}
