import Cookie from './Cookie'
import { URL } from 'url'
import { FilterIterator } from '../util/iterators'

/**
 * Cookie jar. Contains cookies.
 * @version 1.0.0
 * @since 1.0.0
 */
export default class CookieJar {
	public static readonly COOKIES: unique symbol = Symbol('cookies')
	private cookieTree: CookieTree = {}

	// TODO: Remove cookies when they're old. Toggle for this check

	/**
	 * Adds a cookie to the cookie tree
	 * @param cookie Cookie to add
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	public put(cookie: Cookie): void {
		if (!cookie.valid) return
		let cookieTreeReference: CookieTree = this.cookieTree
		const { hostname } = cookie
		for (const part of ReverseHostnameIterator(hostname)) {
			cookieTreeReference[part] ??= {}
			cookieTreeReference = cookieTreeReference[part]
		}
		;(cookieTreeReference[CookieJar.COOKIES] ??= []).push(cookie)
	}

	/**
	 * Adds many cookies to the cookie tree
	 * @param cookies List of cookies to add
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	public putAll(cookies: Cookie[]): void {
		cookies.forEach((cookie) => this.put(cookie))
	}

	/**
	 * Gets a cookie header value for the given url
	 * @param url Url of the request to get the header for
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	public getCookieHeader(url: URL): string {
		const cookies = [...CookieJar.CookieIterator(this.cookieTree, url)]
		return Cookie.getCookieHeader(cookies)
	}

	/**
	 * Iterates through the cookies for some url
	 * @param cookies All cookies
	 * @param url Url
	 * @param reverseHostnameIterator Reverse iterator through parts of the url
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	public static *CookieIterator(
		cookies: CookieTree,
		url: URL,
		reverseHostnameIterator = ReverseHostnameIterator(url.hostname)
	): Generator<Cookie, void, undefined> {
		// Yield all cookies that have a domain set
		// Cookies without a domain are only yielded when the exact hostname matches
		// Also make sure that the path matches
		yield* FilterIterator(cookies[CookieJar.COOKIES] ?? [], ({ domain, url: _url, path }) => {
			const domainMatches = domain ? url.hostname.includes(domain) : url.hostname === _url.hostname
			const pathMatches = url.pathname.startsWith(path)
			return domainMatches && pathMatches
		})
		const { value: part, done } = reverseHostnameIterator.next()
		if (done) return
		if (cookies[part as string]) yield* CookieJar.CookieIterator(cookies[part as string], url, reverseHostnameIterator)
	}
}

/**
 * Tree of cookies that is used to store cookies based on their host name.
 * This allows for (relatively) quick cookie lookups.
 * @version 1.0.0
 * @since 1.0.0
 */
type CookieTree = {
	[part: string]: CookieTree
	[CookieJar.COOKIES]?: Cookie[]
}

/**
 * Iterates through parts of a hostname in reverse
 * @param hostname The hostname to traverse
 * @version 1.0.0
 * @since 1.0.0
 */
function* ReverseHostnameIterator(hostname: string): Generator<string, void, undefined> {
	yield* hostname.split('.').reverse()[Symbol.iterator]()
}
