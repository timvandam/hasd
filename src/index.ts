import Request from './Request/Request'
import { Method } from './Request/Method'
import RequestConfiguration from './Request/RequestConfiguration'
import Configuration from './Configuration'
import defaultConfiguration from './config/default'

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
	private config: Configuration

	constructor(config: Configuration = {}) {
		this.config = { ...defaultConfiguration, ...config }
	}

	// TODO: Builder pattern to configure config

	public get(url: string, options?: RequestConfiguration) {
		return new Request(url, { ...this.config, ...options, method: Method.GET })
	}

	public head(url: string, options?: RequestConfiguration) {
		return new Request(url, { ...this.config, ...options, method: Method.HEAD })
	}

	public post(url: string, options?: RequestConfiguration) {
		return new Request(url, { ...this.config, ...options, method: Method.POST })
	}

	public put(url: string, options?: RequestConfiguration) {
		return new Request(url, { ...this.config, ...options, method: Method.PUT })
	}

	public delete(url: string, options?: RequestConfiguration) {
		return new Request(url, { ...this.config, ...options, method: Method.DELETE })
	}

	public connect(url: string, options?: RequestConfiguration) {
		return new Request(url, { ...this.config, ...options, method: Method.CONNECT })
	}

	public options(url: string, options?: RequestConfiguration) {
		return new Request(url, { ...this.config, ...options, method: Method.OPTIONS })
	}

	public trace(url: string, options?: RequestConfiguration) {
		return new Request(url, { ...this.config, ...options, method: Method.TRACE })
	}

	public patch(url: string, options?: RequestConfiguration) {
		return new Request(url, { ...this.config, ...options, method: Method.PATCH })
	}
}

export default Hasd.instance

Hasd.instance
	.post('http://jsonplaceholder.typicode.com/posts')
	.json({
		title: 'hello',
		body: 'world',
	})
	.send()
