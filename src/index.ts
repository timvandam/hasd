import Request, { Method } from './Request'
import { URL } from 'url'

export type Configuration = {
	keepAlive?: boolean
	port?: number
	url?: string | URL
	headers?: Record<string, string>
}

const defaultConfiguration: Configuration = {
	keepAlive: false,
	port: undefined,
	url: undefined,
	headers: {
		'Transfer-Encoding': 'chunked',
	},
}

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

	constructor(private config: Configuration = { ...defaultConfiguration }) {}

	public get() {
		return new Request(Method.GET, this.config)
	}

	public head() {
		return new Request(Method.HEAD, this.config)
	}

	public post() {
		return new Request(Method.POST, this.config)
	}

	public put() {
		return new Request(Method.PUT, this.config)
	}

	public delete() {
		return new Request(Method.DELETE, this.config)
	}

	public connect() {
		return new Request(Method.CONNECT, this.config)
	}

	public options() {
		return new Request(Method.OPTIONS, this.config)
	}

	public trace() {
		return new Request(Method.TRACE, this.config)
	}

	public patch() {
		return new Request(Method.PATCH, this.config)
	}
}

export default Hasd.instance

Hasd.instance
	.post()
	.url('http://jsonplaceholder.typicode.com/posts')
	.json({
		title: 'hello',
		body: 'world',
	})
	.send()
