const { app, BrowserWindow, session } = require("electron");
const HID = require("node-hid");

let mainWindow;
let idleTimeout;
let hasStarted = false; // Flag to track if the user has started interacting
const IDLE_TIME_LIMIT = 2 * 60 * 1000; // Set idle time limit to 5 minutes (in milliseconds)
// let cardData = ""; // Variable to store card data

function createWindow() {
	mainWindow = new BrowserWindow({
		fullscreen: true,
		kiosk: true, // Enforces kiosk mode
		webPreferences: {
			nodeIntegration: false, // Ensure no unnecessary access to Node.js API
			contextIsolation: true, // Security measure
		},
	});

// 	// Initialize HID device
// 	const devices = HID.devices();
// 	const deviceInfo = devices.find(
// 		(d) => d.vendorId === 0x0acd && d.productId === 0x2030,
// 	);
// 	if (deviceInfo) {
// 		const device = new HID.HID(deviceInfo.path);
// 		device.on("data", (data) => {
// 			// Process card data
// 			const cardData = data.toString();
// 			const cardNumber = cardData.slice(1, 17); // Extract card number
// 			const expirationDate = cardData.slice(19, 23); // Extract expiration date
// 			const expirationYear = `20${expirationDate.slice(0, 2)}`; // Extract year
// 			const expirationMonth = expirationDate.slice(2, 4); // Extract month
// 			console.log("Card Data:", cardData);
// 			// Inject JavaScript to fill in the card number and expiration date
// 			mainWindow.webContents
// 				.executeJavaScript(`
// document.getElementById('card_number').value = '${cardNumber}';
// document.getElementById('card_expiry_month').value = '${expirationMonth}';
// document.getElementById('card_expiry_year').value = '${expirationYear}';
// document.getElementById('card_expiry_month').dispatchEvent(new Event('change'));
// document.getElementById('card_expiry_year').dispatchEvent(new Event('change'));
// `)
// 				.catch((err) => {
// 					console.error("JavaScript Injection Error:", err);
// 				});
// 		});
// 		device.on("error", (err) => {
// 			console.error("HID Device Error:", err);
// 		});
// 	} else {
// 		console.error("HID Device not found");
// 	}

	mainWindow.loadURL("https://onecard.madisoncollege.edu");

	// Hide menu bar to further lock down the window
	mainWindow.setMenu(null);

	mainWindow.on("closed", () => {
		mainWindow = null;
	});

	// Listen for first interaction to start the idle timer
	mainWindow.webContents.on("before-input-event", startIdleTimerOnInteraction);
	mainWindow.webContents.on("cursor-changed", startIdleTimerOnInteraction);

// 	// Listen for keyboard input to capture card data
// 	mainWindow.webContents.on("before-input-event", (event, input) => {
// 		if (input.type === "keyDown") {
// 			const key = input.key;
// 			if (key === "Enter") {
// 				// Process card data when Enter key is pressed
// 				console.log("Card Data:", cardData);
// 				cardData = ""; // Reset card data
// 			} else {
// 				cardData += key; // Append key to card data
// 			}
// 		}
// 	});
}

// Function to start the idle timer on first interaction
function startIdleTimerOnInteraction() {
	if (!hasStarted) {
		hasStarted = true; // Set flag to true after first interaction
		console.log("User has started interacting. Idle timer started.");

		// General error handler
		process.on("uncaughtException", (err) => {
			console.error("Uncaught Exception:", err);
		});

		process.on("unhandledRejection", (reason, promise) => {
			console.error("Unhandled Rejection at:", promise, "reason:", reason);
		});
		resetIdleTimer(); // Start the idle timer
	} else {
		resetIdleTimer(); // Reset idle timer on subsequent interactions
	}
}

// Set up the idle timeout
function setupIdleTimeout() {
	clearTimeout(idleTimeout); // Clear any existing timeouts
	idleTimeout = setTimeout(handleIdleTimeout, IDLE_TIME_LIMIT); // Set the idle timer
}

// Reset the idle timer on user activity
function resetIdleTimer() {
	clearTimeout(idleTimeout);
	setupIdleTimeout(); // Restart the idle timeout countdown
}

function handleIdleTimeout() {
	if (mainWindow) {
		// Clear the cache
		session.defaultSession.clearCache().then(() => {
			console.log("Cache cleared.");
		});

		// Clear local storage and cookies
		session.defaultSession
			.clearStorageData({
                storages: ['localstorage', 'cookies', 'sessionstorage', 'indexdb'] // clears all local storage containers
			})

			.then(() => {
				console.log("Local storage and cookies cleared.");
			})
			.catch((err) => {
				console.error("Error clearing storage data:", err);
			});

		// Reset the flag and destroy the current window
		hasStarted = false;
		mainWindow.close();
		createWindow(); // Reopen the window
	}
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
})
