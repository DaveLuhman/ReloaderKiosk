const { app, BrowserWindow } = require("electron");
let mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({
		fullscreen: true,
		kiosk: true,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
	});

	mainWindow.loadFile("index.html");

	// Hide menu bar
	mainWindow.setMenu(null);

	// Optional: Disable right-click context menu (for further lockdown)
	mainWindow.webContents.on("context-menu", (e) => e.preventDefault());

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
	});

	// Optional: Register a global shortcut for exiting kiosk mode
	const { globalShortcut } = require("electron");
	app.on("ready", () => {
		globalShortcut.register("Control+Shift+Q", () => {
			app.quit(); // Allow exiting kiosk mode with Ctrl+Shift+Q
		});
	});
}
