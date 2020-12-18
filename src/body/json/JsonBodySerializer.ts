import RequestBodySerializer from '../../Request/RequestBodySerializer'
import RequestBody from '../../Request/RequestBody'
import { JsonValue } from './JsonValue'

/**
 * Basic JSON body generator. Uses JSON.stringify.
 * @version 1.0.0
 * @since 1.0.0
 */
export default class JsonBodySerializer implements RequestBodySerializer {
	constructor(private readonly json: JsonValue) {}

	getRequestBody(): RequestBody {
		return {
			body: JSON.stringify(this.json),
			contentType: 'application/json',
		}
	}
}
