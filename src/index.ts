import Request from './Request/Request'
import { Method } from './Request/Method'
import RequestConfiguration from './Request/RequestConfiguration'
import defaultConfiguration from './Configuration/default'
import Configuration from './Configuration/Configuration'
import JsonBodyDeserializer from './body/json/JsonBodyDeserializer'

/**
 * Hasd. Contains configuration, cookies.
 * @version 1.0.0
 * @since 1.0.0
 */
export class Hasd {
	/**
	 * Global hasd instance
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	public static instance = new Hasd()
	private readonly config: Configuration
	// TODO: cookie jar

	constructor(config: Partial<Configuration> = {}) {
		this.config = { ...defaultConfiguration, ...config }
	}

	/**
	 * Configures the keepAlive option
	 * @param keepAlive Whether to keep sockets alive after finishing a request
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	public keepAlive(keepAlive: boolean): Hasd {
		this.config.keepAlive = keepAlive
		return this
	}

	/**
	 * Configures the followRedirects option
	 * @param followRedirects Whether to keep sockets alive after finishing a request
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	public followRedirects(followRedirects: boolean): Hasd {
		this.config.followRedirects = followRedirects
		return this
	}

	/**
	 * Sets a default header key-value pair
	 * @param key Header name
	 * @param value Header value
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	public setHeader(key: string, value: string): Hasd {
		if (!this.config.headers) this.config.headers = {}
		this.config.headers[key] = value
		return this
	}

	/**
	 * Removes a header if present
	 * @param key Header name
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	public removeHeader(key: string): Hasd {
		delete this.config?.headers?.[key]
		return this
	}

	// TODO: Builder pattern to configure Configuration

	/**
	 * Creates a Request instance using the Hasd instance configuration
	 * @param url URL to send the request to
	 * @param options Request options
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	public request(url: string, options?: Partial<RequestConfiguration>): Request {
		return new Request(url, { ...this.config, ...options })
	}

	/**
	 * Creates a Request instance using the Hasd instance configuration with method GET
	 * @param url URL to send the request to
	 * @param options Request options
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	public get(url: string, options?: Partial<RequestConfiguration>): Request {
		return this.request(url, { ...options, method: Method.GET })
	}

	/**
	 * Creates a Request instance using the Hasd instance configuration with method HEAD
	 * @param url URL to send the request to
	 * @param options Request options
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	public head(url: string, options?: Partial<RequestConfiguration>): Request {
		return this.request(url, { ...options, method: Method.HEAD })
	}

	/**
	 * Creates a Request instance using the Hasd instance configuration with method POST
	 * @param url URL to send the request to
	 * @param options Request options
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	public post(url: string, options?: Partial<RequestConfiguration>): Request {
		return this.request(url, { ...options, method: Method.POST })
	}

	/**
	 * Creates a Request instance using the Hasd instance configuration with method PUT
	 * @param url URL to send the request to
	 * @param options Request options
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	public put(url: string, options?: Partial<RequestConfiguration>): Request {
		return this.request(url, { ...options, method: Method.PUT })
	}

	/**
	 * Creates a Request instance using the Hasd instance configuration with method DELETE
	 * @param url URL to send the request to
	 * @param options Request options
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	public delete(url: string, options?: Partial<RequestConfiguration>): Request {
		return this.request(url, { ...options, method: Method.DELETE })
	}

	/**
	 * Creates a Request instance using the Hasd instance configuration with method CONNECT
	 * @param url URL to send the request to
	 * @param options Request options
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	public connect(url: string, options?: Partial<RequestConfiguration>): Request {
		return this.request(url, { ...options, method: Method.CONNECT })
	}

	/**
	 * Creates a Request instance using the Hasd instance configuration with method OPTIONS
	 * @param url URL to send the request to
	 * @param options Request options
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	public options(url: string, options?: Partial<RequestConfiguration>): Request {
		return this.request(url, { ...options, method: Method.OPTIONS })
	}

	/**
	 * Creates a Request instance using the Hasd instance configuration with method TRACE
	 * @param url URL to send the request to
	 * @param options Request options
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	public trace(url: string, options?: Partial<RequestConfiguration>): Request {
		return this.request(url, { ...options, method: Method.TRACE })
	}

	/**
	 * Creates a Request instance using the Hasd instance configuration with method PATCH
	 * @param url URL to send the request to
	 * @param options Request options
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	public patch(url: string, options?: Partial<RequestConfiguration>): Request {
		return this.request(url, { ...options, method: Method.PATCH })
	}
}

export default Hasd.instance

Hasd.instance
	.post('http://jsonplaceholder.typicode.com/posts')
	.json({
		title: 'hello',
		body: 'world!!!!!',
	})
	.send()
	.then((response) => {
		console.log(response.getHeader('Content-Type'))
		return response.body(JsonBodyDeserializer)
	})
	.then(console.log)
