self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    
    if (url.pathname.startsWith('/js/fcreator')) {

		//url.search==params
        event.respondWith(
            new Response(
                `<html>
                    <script>${decodeURIComponent(url.search.substring(1))}</script>
                </html>`, // really hacky but it works
                {
                    headers: { 'Content-Type': 'text/html' }
                }
            )
        );
    } else {
        event.respondWith(fetch(event.request));
    }
});