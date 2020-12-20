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
	public cookieTree: CookieTree = { [CookieJar.COOKIES]: [] }

	public put(cookie: Cookie): void {
		if (!cookie.valid) return
		let cookieTreeReference: CookieTree = this.cookieTree
		const hostname = cookie.domain ?? cookie.url.hostname
		for (const part of ReverseHostnameIterator(hostname)) {
			cookieTreeReference[part] ??= {}
			cookieTreeReference = cookieTreeReference[part]
		}
		cookieTreeReference[CookieJar.COOKIES] ??= []
		// @ts-ignore
		cookieTreeReference[CookieJar.COOKIES].push(cookie)
	}

	/**
	 * Gets a cookie header value for the given url
	 * @param url
	 */
	public getCookieHeader(url: URL): string {
		const cookies = [...CookieJar.CookieIterator(this.cookieTree, url)]
		return cookies.map(({ name, value }) => `${name}=${value}`).join('; ')
	}

	/**
	 * Iterates through the cookies for some url
	 * @param cookies All cookies
	 * @param url Url
	 * @param reverseHostnameIterator Reverse iterator through parts of the url
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
			console.log(url.pathname, path)
			return domainMatches && url.pathname.startsWith(path)
		})
		const { value: part, done } = reverseHostnameIterator.next()
		if (done || typeof part !== 'string') return
		if (cookies[part]) yield* CookieJar.CookieIterator(cookies[part], url, reverseHostnameIterator)
	}
}

/**
 * Tree of cookies that is used to store cookies based on their host name.
 * This allows for (relatively) quick cookie lookups.
 */
type CookieTree = {
	[part: string]: CookieTree
	[CookieJar.COOKIES]?: Cookie[]
}

function* ReverseHostnameIterator(hostname: string) {
	yield* hostname.split('.').reverse()[Symbol.iterator]()
}

const jar = new CookieJar()
jar.put(
	new Cookie(new URL('http://bye.search.google.com'), 'cookeName', 'cookieValue', {
		domain: 'search.google.com',
		path: '/haha/',
	})
)
jar.put(new Cookie(new URL('http://google.com'), 'cookeName1231', 'cookieValue', { domain: 'google.com' }))

const it = jar.getCookieHeader(new URL('http://hello.search.google.com/haha'))
console.log(it)
