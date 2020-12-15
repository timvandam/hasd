import { Configuration } from './index'
import Response from './Response'
import RequestBody, { isRequestBody, RequestBodyGenerator } from './RequestBody/RequestBody'
import JsonBodyGenerator, { JsonValue } from './RequestBody/JsonBodyGenerator'
import { URL } from 'url'
import { Agent, ClientRequest, IncomingMessage, request } from 'http'
import { Readable } from 'stream'
import stringToReadableStream from './util/stream/stringToReadableStream'

/**
 * HTTP Request methods.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
 * @version 1.0.0
 * @since 1.0.0
 */
export enum Method {
	GET,
	HEAD,
	POST,
	PUT,
	DELETE,
	CONNECT,
	OPTIONS,
	TRACE,
	PATCH,
}

const methodsWithoutBody = [Method.GET, Method.HEAD, Method.CONNECT, Method.OPTIONS, Method.TRACE]

/**
 * Request builder class with default config.
 * @version 1.0.0
 * @since 1.0.0
 */
export default class Request {
	private requestBody: RequestBody | undefined
	private configuration: Configuration = {}

	// TODO: Custom agent options from config
	private readonly agent!: Agent

	/**
	 * Constructs a new request using a reference to some default config.
	 * @param method HTTP method to use
	 * @param defaultConfig Default config to use
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	// TODO: Url here
	constructor(public method: Method, private readonly defaultConfig: Configuration) {
		this.agent = new Agent({
			keepAlive: defaultConfig.keepAlive,
		})
	}

	/**
	 * Sets the body of this request. A raw RequestBody or a RequestBodyGenerator (preferred!) can be provided.
	 * @param body RequestBody or RequestBodyGenerator.
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	public body(body: RequestBody | RequestBodyGenerator): Request {
		if (methodsWithoutBody.includes(this.method))
			throw new Error(`Method ${Method[this.method]} does not support request bodies.`)
		if (isRequestBody(body)) this.requestBody = body
		else this.requestBody = body.getRequestBody()
		return this
	}

	/**
	 * Sets the body of this request using a JsonBodyGenerator.
	 * @param body Object to use as JSON body.
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	public json(body: JsonValue): Request {
		this.body(new JsonBodyGenerator(body))
		return this
	}

	/**
	 * Sets the url of this request
	 * @param url The url to send the request to
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	public url(url: string | URL): Request {
		this.configuration.url = url
		return this
	}

	/**
	 * Sets the default port of this request
	 * @param port
	 */
	public port(port: number): Request {
		this.configuration.port = port
		return this
	}

	/**
	 * Sends this request
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	public async send<R>(): Promise<Response<R>> {
		return new Promise((resolve, reject) => {
			const request = this.createRequest()

			request.once('response', async (response: IncomingMessage) => {
				for await (const a of response) {
					console.log(a.toString())
				}
				resolve(new Response())
			})

			this.setRequestHeaders(request)
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
		if (!this.configuration.url) throw new Error('No url set')
		return request(this.configuration.url, {
			agent: this.agent,
			defaultPort: this.configuration.port,
			method: Method[this.method],
		})
	}

	/**
	 * Sets the headers of a request in accordance to this instance
	 * @param request The request instance to set the headers on
	 * @private
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	private setRequestHeaders(request: ClientRequest): void {
		request.setHeader('Content-Type', this.requestBody?.contentType ?? 'text/plain')
		if (this.configuration.headers) {
			for (const [k, v] of Object.entries(this.configuration.headers)) {
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
		let data!: Readable
		if (!this.requestBody?.body) data = stringToReadableStream('')
		else if (typeof this.requestBody?.body === 'string') data = stringToReadableStream(this.requestBody.body)
		else data = this.requestBody?.body
		data.pipe(request) // will automatically end the request when data is all streamed
	}
}
