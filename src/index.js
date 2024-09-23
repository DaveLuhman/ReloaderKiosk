const { app, BrowserWindow, session } = require('electron');

let mainWindow;
let idleTimeout;
const IDLE_TIME_LIMIT = 5 * 60 * 1000; // Set idle time limit to 5 minutes (in milliseconds)

function createWindow() {
    mainWindow = new BrowserWindow({
        fullscreen: true,
        kiosk: true,  // Enforces kiosk mode
        webPreferences: {
            nodeIntegration: false,  // Ensure no unnecessary access to Node.js API
            contextIsolation: true,   // Security measure
        }
    });

    mainWindow.loadURL('https://onecard.madisoncollege.edu');

    // Hide menu bar to further lock down the window
    mainWindow.setMenu(null);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // Reset idle timer whenever there's user activity
    setupIdleTimeout();
    mainWindow.webContents.on('before-input-event', resetIdleTimer);
    mainWindow.webContents.on('dom-ready', resetIdleTimer);  // Reset on page load

    // Optional: Capture mouse and keyboard input as activity
    mainWindow.webContents.on('cursor-changed', resetIdleTimer);
}

// Set up the idle timeout
function setupIdleTimeout() {
    clearTimeout(idleTimeout); // Clear any existing timeouts
    idleTimeout = setTimeout(handleIdleTimeout, IDLE_TIME_LIMIT);  // Set the idle timer
}

// Reset the idle timer on user activity
function resetIdleTimer() {
    clearTimeout(idleTimeout);
    setupIdleTimeout();  // Restart the idle timeout countdown
}

// Handle what happens when the user is idle
function handleIdleTimeout() {
    // Close the window, clear cache, and reopen the window for the next user
    if (mainWindow) {
        // Clear session and cache
        session.defaultSession.clearCache().then(() => {
            console.log("Cache cleared.");
        });

        // Destroy the current window and recreate it
        mainWindow.close();
        createWindow();
    }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});