"use strict"
try {
navigator.serviceWorker.register("/js/routerSw.js")
console.log("Service worker registered successfully")
} catch (e) {
	console.log(`Failed to register service worker: ${e}`)
}
