const { app, BrowserWindow, session, globalShortcut } = require("electron");
if (require("electron-squirrel-startup")) app.quit();
let mainWindow;
let idleTimeout;
let hasStarted = false; // Flag to track if the user has started interacting
const IDLE_TIME_LIMIT = 2 * 60 * 1000; // Set idle time limit to 5 minutes (in milliseconds)

function createWindow() {
	mainWindow = new BrowserWindow({
		fullscreen: true,
		kiosk: true, // Enforces kiosk mode
		webPreferences: {
			nodeIntegration: false, // Ensure no unnecessary access to Node.js API
			contextIsolation: true, // Security measure
		},
	});

	mainWindow.loadURL("https://onecard.madisoncollege.edu");
	mainWindow.webContents.setWindowOpenHandler(({ url }) => {
		console.log(`Blocked opening a new window to ${url}`);
		return { action: "deny" }; // Prevents the new window from being created
	});
	// Hide menu bar to further lock down the window
	mainWindow.setMenu(null);

	mainWindow.on("closed", () => {
		mainWindow = null;
	});

	// Listen for first interaction to start the idle timer
	mainWindow.webContents.on("before-input-event", startIdleTimerOnInteraction);
	mainWindow.webContents.on("cursor-changed", startIdleTimerOnInteraction);
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
				storages: ["localstorage", "cookies", "sessionstorage", "indexdb"], // clears all local storage containers
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
	globalShortcut.register("F24", handleIdleTimeout);
});
