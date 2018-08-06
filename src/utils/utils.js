import ResizeObserver from 'resize-observer-polyfill'

const isServer = typeof window === 'undefined'

const resizeHandler = entries => {
	entries.forEach(entry => {
		const listeners = entry.target.__resizeListeners__ || []
		listeners.forEach(fn => {
			fn()
		})
	})
}

export const addResizeObserver = (element, fn) => {
	if (isServer) return
	if (!element.__resizeListeners__) {
		element.__resizeListeners__ = []
		element.__ro__ = new ResizeObserver(resizeHandler)
		element.__ro__.observe(element)
	}
	element.__resizeListeners__.push(fn)
}

export const removeResizeObserver = (element, fn) => {
	if (!element || !element.__resizeListeners__) return
	element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1)
	if (!element.__resizeListeners__.length) {
		element.__ro__.disconnect()
	}
}
