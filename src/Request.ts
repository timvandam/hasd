import { Configuration } from './index'
import Response from './Response'
import RequestBody, { isRequestBody, RequestBodyGenerator } from './RequestBody/RequestBody'
import JsonBodyGenerator, { JsonValue } from './RequestBody/JsonBodyGenerator'

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

	/**
	 * Constructs a new request using a reference to some default config.
	 * @param method HTTP method to use
	 * @param defaultConfig Default config to use
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	constructor(public method: Method, private readonly defaultConfig: Configuration) {}

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
	 * Sends this request
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	public async send<R>(): Promise<Response<R>> {
		return new Response()
	}
}
