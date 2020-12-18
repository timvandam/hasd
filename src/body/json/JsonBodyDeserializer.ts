import ResponseBodyDeserializer from '../../Response/ResponseBodyDeserializer'
import { JsonValue } from './JsonValue'
import { Readable } from 'stream'

/**
 * Basic JSON body reader. Uses JSON.parse.
 * @version 1.0.0
 * @since 1.0.0
 */
export default class JsonBodyDeserializer implements ResponseBodyDeserializer<JsonValue> {
	constructor(private readonly body: Readable) {}

	async getResponseBody(): Promise<JsonValue> {
		let json = ''
		for await (const chunk of this.body) json += chunk
		return JSON.parse(json)
	}
}
