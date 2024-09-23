const { app, BrowserWindow } = require("electron");

let mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({
		fullscreen: true,
		kiosk: true, // Enforces kiosk mode
		webPreferences: {
			nodeIntegration: true, // Needed for loading local files
			contextIsolation: false,
		},
	});

	mainWindow.loadFile("./src/index.html"); // Load the HTML file

	// Optional: Hide the menu bar to further lock the window down
	mainWindow.setMenu(null);

	mainWindow.on("closed", () => {
		mainWindow = null;
	});
}

// Create window once the app is ready
app.whenReady().then(createWindow);

// Quit the app when all windows are closed, except on macOS
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
