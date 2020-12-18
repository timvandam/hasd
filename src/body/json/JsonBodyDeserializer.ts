import ResponseBodyDeserializer from '../../Response/ResponseBodyDeserializer'
import { IncomingMessage } from 'http'
import { JsonValue } from './JsonValue'

/**
 * Basic JSON body reader. Uses JSON.parse.
 * @version 1.0.0
 * @since 1.0.0
 */
export default class JsonBodyDeserializer implements ResponseBodyDeserializer<JsonValue> {
	constructor(private readonly incomingMessage: IncomingMessage) {}

	async getResponseBody(): Promise<JsonValue> {
		let json = ''
		for await (const chunk of this.incomingMessage) json += chunk
		return JSON.parse(json)
	}
}
