"use strict"
try {
navigator.serviceWorker.register("/js/routerSw.js")
} catch (e) {
	console.log("Something broke while creating the appRouter - apps will not work")
}
