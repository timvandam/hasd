import path from 'path'
import { URL } from 'url'

/**
 * Represents a cookie
 * @version 1.0.0
 * @since 1.0.0
 * @see https://tools.ietf.org/html/rfc6265
 */
export default class Cookie {
	/**
	 * - If max-age is present, this is max-age + now
	 * - If expires is present but not max-age, this is expires
	 * - If neither expires nor max-age are present this is undefined (= non persistent (session) cookie)
	 */
	public expires: Date | null
	/**
	 * The domain property. If empty, this cookie only belongs to the exact url hostname (no subdomains!)
	 */
	public domain: string
	public path: string
	public secure: boolean
	public readonly valid: boolean

	/**
	 * Gets the hostname of this cookie
	 */
	get hostname(): string {
		return this.domain ?? this.url.hostname
	}

	constructor(
		public url: URL,
		public name: string,
		public value: string,
		public rawCookie: { [key in string]?: string } = {}
	) {
		const maxAge = rawCookie['max-age']
		const expires = rawCookie.expires
		this.expires = maxAge ? new Date(Date.now() + parseInt(maxAge) * 1000) : expires ? new Date(expires) : null

		this.domain = rawCookie.domain?.replace(/^\.?/, '').toLowerCase() ?? ''
		this.valid = url.host.endsWith(this.domain) // Check whether hostname matches

		const { dir = '', base = '' } = path.parse(rawCookie.path || '/')
		this.path = dir
		if (base) this.path += `/${base}`
		this.valid ||= this.path.charAt(0) === '/'

		this.secure = !!rawCookie.secure
	}

	/**
	 * Returns a Cookie header value for this cookie
	 */
	public getCookieHeader(): string {
		return `${this.name}=${this.value}`
	}

	/**
	 * Returns a Cookie header for a list of cookies
	 * @param cookies List of cookies
	 */
	public static getCookieHeader(cookies: Cookie[]): string {
		return cookies.map((cookie) => cookie.getCookieHeader()).join('; ')
	}

	/**
	 * Constructs a list of cookies from the set-cookie header.
	 * @param url The url of these cookies
	 * @param setCookies a list of set-cookie headers
	 * @returns a list of cookies
	 */
	public static fromSetCookies(url: URL, setCookies: string[]): Cookie[] {
		return setCookies.map(Cookie.fromSetCookie.bind(null, url))
	}

	/**
	 * Constructs a cookie from a set-cookie header
	 * @param url The url of this cookie
	 * @param setCookie set-cookie header
	 * @returns a Cookie instance
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
	 */
	public static fromSetCookie(url: URL, setCookie: string): Cookie {
		const [attributeValue, ...parts] = setCookie.split(';').map((e) => e.trim())
		const [attribute, value] = attributeValue.split('=')
		const options: Cookie['rawCookie'] = {}
		for (const part of parts) {
			const [key, value] = part.split('=')
			options[key.toLowerCase()] = value
		}
		return new Cookie(url, attribute, value, options)
	}
}
