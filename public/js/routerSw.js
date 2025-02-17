self.addEventListener('install' (event) => {
	self.skipWaiting()
})

self.addEventListener('fetch' (event)=> {
	if (event.request.url.endsWith('/js/fcreator')) {
		event.respondWith(
			new Response(`
					Test
				`, headers: {'Content-Type': 'text/html'}
			)
		)
	} else {
		event.respondWith(fetch(event.request))
	}
})
