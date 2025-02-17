"use strict"
try {
navigator.serviceWorker.register("/js/routerSw.js")
console.log("Service worker registered successfully")
} catch (e) {
	console.log("Something broke while creating the appRouter - apps will not work")
}
