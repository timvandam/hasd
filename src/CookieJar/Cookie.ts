/**
 * Represents a cookie
 * @version 1.0.0
 * @since 1.0.0
 */
import { IncomingHttpHeaders } from 'http'

export default class Cookie {
	/**
	 * - If max-age is present, this is max-age + now
	 * - If expires is present but not max-age, this is expires
	 * - If neither expires nor max-age are present this is undefined
	 */
	public expires?: Date
	public domain?: string
	public path?: string
	public secure: boolean

	constructor(public name: string, public value: string, public rawCookie: { [key: string]: string } = {}) {
		const maxAge = rawCookie['max-age']
		const expires = rawCookie.expires
		this.expires = maxAge ? new Date(Date.now() + parseInt(maxAge) * 1000) : expires ? new Date(expires) : undefined

		this.domain = rawCookie.domain
		this.path = rawCookie.path
		this.secure = !!rawCookie.secure
	}

	/**
	 * Constructs a list of cookies from the set-cookie header.
	 * @param setCookies a list of set-cookie headers
	 * @returns a list of cookies
	 */
	public static fromSetCookies(setCookies: string[]): Cookie[] {
		return setCookies.map(Cookie.fromSetCookie)
	}

	/**
	 * Constructs a cookie from a set-cookie header
	 * @param setCookie set-cookie header
	 * @returns a Cookie instance
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
	 */
	public static fromSetCookie(setCookie: string): Cookie {
		const [keyValue, ...parts] = setCookie.split(';').map((e) => e.trim())
		const [key, value] = keyValue.split('=')
		const options: Cookie['rawCookie'] = {}
		for (const part of parts) {
			const [key, value] = part.split('=')
			options[key.toLowerCase()] = value
		}
		return new Cookie(key, value, options)
	}
}
