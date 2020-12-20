/**
 * Iterators through an iterable with a filter
 * @param iterable Iterator to iterate through
 * @param filter Filter to apply
 */
export function* FilterIterator<T>(
	iterable: Iterable<T>,
	filter: (element: T) => boolean
): Generator<T, void, undefined> {
	for (const t of iterable) {
		if (filter(t)) yield t
	}
}
