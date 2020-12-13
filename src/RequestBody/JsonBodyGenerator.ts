import RequestBody, { RequestBodyGenerator } from './RequestBody'

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

const contentType = 'application/json'

/**
 * Basic JSON body generator. Uses JSON.stringify.
 * @version 1.0.0
 * @since 1.0.0
 */
export default class JsonBodyGenerator implements RequestBodyGenerator {
	private readonly json: JsonValue = null
	private body?: string

	constructor(json: JsonValue) {
		this.json = json
	}

	getRequestBody(): RequestBody {
		this.body ??= JSON.stringify(this.json)
		return {
			body: this.body,
			contentType,
		}
	}
}
