import RequestBody, { RequestBodyGenerator } from './RequestBody'

const contentType = 'multipart/form-data'

/**
 * Multipart body builder.
 * @version 1.0.0
 * @since 1.0.0
 */
export default class MultipartBodyGenerator implements RequestBodyGenerator {
	// TODO: Key value content-type, etc. Perhaps use BodyGenerators?
	getRequestBody(): RequestBody {
		return {
			body: 'todo',
			contentType,
		}
	}
}
