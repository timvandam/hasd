import { URL, URLSearchParams } from 'url'
import { ClientRequest } from 'http'
import RequestBody, { isRequestBody, requestBodyToReadable } from './RequestBody'
import { Method } from './Method'
import RequestConfiguration from './RequestConfiguration'
import RequestBodySerializer from './RequestBodySerializer'
import JsonBodySerializer from '../body/json/JsonBodySerializer'
import Response from '../Response/Response'
import { JsonValue } from '../body/json/JsonValue'
import * as http from 'http'
import * as https from 'https'
import { convertValuesToString } from '../util/record'
import { HasToString } from '../util/types'

/**
 * Request builder class with default Configuration.
 * @version 1.0.0
 * @since 1.0.0
 */
export default class Request {
	private requestBody?: RequestBody
	private options: RequestConfiguration
	private readonly url: URL

	/**
	 * Constructs a new request using a reference to some default Configuration.
	 * @param url Url to sent this request to
	 * @param options Request Options
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	constructor(url: string, options: RequestConfiguration) {
		this.url = new URL(url, options.baseUrl)
		if (this.url.protocol !== 'http:' && this.url.protocol !== 'https:')
			throw new Error('Invalid request protocol (must be either http or https)')
		this.options = { ...options }
	}

	/**
	 * Sets the body of this request. A raw Request or a RequestBodyGenerator (preferred!) can be provided.
	 * @param body Request or RequestBodyGenerator.
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	public body(body: RequestBody | RequestBodySerializer): Request {
		if (isRequestBody(body)) this.requestBody = body
		else this.requestBody = body.getRequestBody()
		return this
	}

	/**
	 * Appends a querystring to the URL with the given parameters.
	 * @param params The parameters to use.
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	public qs(params: URLSearchParams | Record<string | number, HasToString | HasToString[]>): Request {
		if (!(params instanceof URLSearchParams)) params = new URLSearchParams(convertValuesToString(params))
		for (const [k, v] of params) {
			this.url.searchParams.append(k, v)
		}
		return this
	}

	/**
	 * Sets the body of this request using a JsonBodyGenerator.
	 * @param body Object to use as JSON body.
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	public json(body: JsonValue): Request {
		this.body(new JsonBodySerializer(body))
		return this
	}

	/**
	 * Sends this request
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	public async send(): Promise<Response> {
		return new Promise((resolve) => {
			const request = this.createRequest()
			request.once('response', (incomingMessage) => {
				resolve(new Response(this.url, incomingMessage, incomingMessage.headers, incomingMessage.statusCode as number))
			})
			this.writeRequestHeaders(request)
			this.writeRequestBody(request)
		})
	}

	/**
	 * Sends a request using the native http.request
	 * @private
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	private createRequest(): ClientRequest {
		const isHttp = this.url.protocol === 'http'
		const request = isHttp ? http.request : https.request
		const agent = isHttp ? this.options.httpAgent : this.options.httpsAgent
		return request(this.url, {
			method: Method[this.options.method],
			agent,
		})
	}

	/**
	 * Sets the headers of a request in accordance to this instance
	 * @param request The request instance to set the headers on
	 * @private
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	private writeRequestHeaders(request: ClientRequest): void {
		// TODO: Write cookies
		if (this.requestBody?.contentType) request.setHeader('Content-Type', this.requestBody.contentType)
		if (this.options.headers) {
			for (const [k, v] of Object.entries(this.options.headers)) {
				request.setHeader(k, v)
			}
		}
	}

	/**
	 * Writes the body of a request
	 * @param request The request instance to write to
	 * @private
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	private writeRequestBody(request: ClientRequest): void {
		// Pipe a body stream into the request.
		// Request.end() is automatically called once all data has been transported.
		requestBodyToReadable(this.requestBody).pipe(request)
	}
}
