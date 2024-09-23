const { app, BrowserWindow, session } = require('electron');

let mainWindow;
let idleTimeout;
let hasStarted = false; // Flag to track if the user has started interacting
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

    mainWindow.on('closed', function () {
        mainWindow = null;
    });

    // Listen for first interaction to start the idle timer
    mainWindow.webContents.on('before-input-event', startIdleTimerOnInteraction);
    mainWindow.webContents.on('cursor-changed', startIdleTimerOnInteraction);
}

// Function to start the idle timer on first interaction
function startIdleTimerOnInteraction() {
    if (!hasStarted) {
        hasStarted = true;  // Set flag to true after first interaction
        console.log('User has started interacting. Idle timer started.');
        resetIdleTimer();    // Start the idle timer
    } else {
        resetIdleTimer();    // Reset idle timer on subsequent interactions
    }
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

        // Reset the flag and destroy the current window
        hasStarted = false;
        mainWindow.close();
        createWindow();
    }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});