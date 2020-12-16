import RequestBodySerializer from './RequestBodySerializer'
import RequestBody from '../RequestBody'

/**
 * JSON Value type.
 * @version 1.0.0
 * @since 1.0.0
 */
export type JsonValue =
	| string
	| number
	| null
	| boolean
	| JsonValue[]
	| { [key in string | number | symbol]: JsonValue }

/**
 * Basic JSON body generator. Uses JSON.stringify.
 * @version 1.0.0
 * @since 1.0.0
 */
export default class JsonBodySerializer implements RequestBodySerializer {
	private readonly json: JsonValue = null
	private body?: string

	constructor(json: JsonValue) {
		this.json = json
	}

	getRequestBody(): RequestBody {
		this.body ??= JSON.stringify(this.json) // memoize the value because why not (could improve performance for recurring requests)
		return {
			body: this.body,
			contentType: 'application/json',
		}
	}
}
