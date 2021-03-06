import Request from './Request/Request'
import { Method } from './Request/Method'
import RequestConfiguration from './Request/RequestConfiguration'
import defaultConfiguration from './Configuration/default'
import Configuration from './Configuration/Configuration'
import { ValueOf } from './util/types'
import CookieJar from './CookieJar/CookieJar'
import { URL } from 'url'

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

	constructor(config: Partial<Configuration> = {}) {
		this.config = { ...defaultConfiguration, ...config }
		if (this.config.cookieJar && typeof this.config.cookieJar === 'boolean') this.config.cookieJar = new CookieJar()
	}

	/**
	 * Configures the followRedirects option
	 * @param followRedirects Whether to keep sockets alive after finishing a request
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	public followRedirects(followRedirects: Configuration['followRedirects']): Hasd {
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
	public setHeader(key: keyof Configuration['headers'], value: ValueOf<Configuration['headers']>): Hasd {
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
	public removeHeader(key: keyof Configuration['headers']): Hasd {
		delete this.config?.headers?.[key]
		return this
	}

	/**
	 * Sets the base url of this instance.
	 * @param baseUrl The base url to set
	 * @version 1.0.0
	 * @since 1.0.0k
	 */
	public baseUrl(baseUrl: Configuration['baseUrl']): Hasd {
		this.config.baseUrl = baseUrl
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
	public request(url: ConstructorParameters<typeof URL>[0], options?: Partial<RequestConfiguration>): Request {
		return new Request(url, { ...this.config, ...options })
	}

	/**
	 * Creates a Request instance using the Hasd instance configuration with method GET
	 * @param url URL to send the request to
	 * @param options Request options
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	public get(url: ConstructorParameters<typeof URL>[0], options?: Partial<RequestConfiguration>): Request {
		return this.request(url, { ...options, method: Method.GET })
	}

	/**
	 * Creates a Request instance using the Hasd instance configuration with method HEAD
	 * @param url URL to send the request to
	 * @param options Request options
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	public head(url: ConstructorParameters<typeof URL>[0], options?: Partial<RequestConfiguration>): Request {
		return this.request(url, { ...options, method: Method.HEAD })
	}

	/**
	 * Creates a Request instance using the Hasd instance configuration with method POST
	 * @param url URL to send the request to
	 * @param options Request options
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	public post(url: ConstructorParameters<typeof URL>[0], options?: Partial<RequestConfiguration>): Request {
		return this.request(url, { ...options, method: Method.POST })
	}

	/**
	 * Creates a Request instance using the Hasd instance configuration with method PUT
	 * @param url URL to send the request to
	 * @param options Request options
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	public put(url: ConstructorParameters<typeof URL>[0], options?: Partial<RequestConfiguration>): Request {
		return this.request(url, { ...options, method: Method.PUT })
	}

	/**
	 * Creates a Request instance using the Hasd instance configuration with method DELETE
	 * @param url URL to send the request to
	 * @param options Request options
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	public delete(url: ConstructorParameters<typeof URL>[0], options?: Partial<RequestConfiguration>): Request {
		return this.request(url, { ...options, method: Method.DELETE })
	}

	/**
	 * Creates a Request instance using the Hasd instance configuration with method CONNECT
	 * @param url URL to send the request to
	 * @param options Request options
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	public connect(url: ConstructorParameters<typeof URL>[0], options?: Partial<RequestConfiguration>): Request {
		return this.request(url, { ...options, method: Method.CONNECT })
	}

	/**
	 * Creates a Request instance using the Hasd instance configuration with method OPTIONS
	 * @param url URL to send the request to
	 * @param options Request options
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	public options(url: ConstructorParameters<typeof URL>[0], options?: Partial<RequestConfiguration>): Request {
		return this.request(url, { ...options, method: Method.OPTIONS })
	}

	/**
	 * Creates a Request instance using the Hasd instance configuration with method TRACE
	 * @param url URL to send the request to
	 * @param options Request options
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	public trace(url: ConstructorParameters<typeof URL>[0], options?: Partial<RequestConfiguration>): Request {
		return this.request(url, { ...options, method: Method.TRACE })
	}

	/**
	 * Creates a Request instance using the Hasd instance configuration with method PATCH
	 * @param url URL to send the request to
	 * @param options Request options
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	public patch(url: ConstructorParameters<typeof URL>[0], options?: Partial<RequestConfiguration>): Request {
		return this.request(url, { ...options, method: Method.PATCH })
	}
}

export default Hasd.instance
