# ReloaderKiosk

**ReloaderKiosk** is a kiosk-mode desktop application built with Electron, designed to streamline the process of reloading Madison College OneCards. This app is deployed on touch-screen POS terminals and securely interacts with the OneCard system, ensuring ease of use and session security for users.

![ReloaderKiosk](./img/kioskPulse.gif)

## Features

- **Kiosk Mode**: The app runs in a locked-down, full-screen mode to prevent users from navigating away from the OneCard page.
- **Idle Timeout**: Automatically resets the session after 1.5 minutes of inactivity, ensuring privacy for subsequent users by clearing cached data, cookies, and local storage.
- **USB-ResetButton**: A physical button installed behind the screen allows manual session reset when necessary. The button is programmed to simulate an F24 keystroke, triggering a session refresh.
   - Replacement buttons are available for **$30** upon request at **[Sales@ado.software](mailto:Sales@ado.software)**.
- **Manual Launch**: The app does not auto-start with the system, so users must launch the app manually after the terminal powers up and logs in automatically.

## Installation

### Step-by-Step Guide:

1. **Download the Latest Release**:
   - Navigate to the [Releases section](https://github.com/DaveLuhman/ReloaderKiosk/releases) and download the latest `.msi` installer.

2. **Run the Installer**:
   - Execute the downloaded `.msi` file to install the ReloaderKiosk application.

3. **Launching the App**:
   - After installation, launch the app manually from the Start menu or the desktop shortcut.

## Troubleshooting

- **Session Unresponsive?** Use the **USB-ResetButton** located behind the screen to manually refresh the session.
- **App Not Running Automatically?** You’ll need to launch the application manually after the terminal powers up.
- **Terminal Unresponsive?** Use the power rocker switch on the POS terminal to restart the system, then relaunch the app.

## How It Works

The ReloaderKiosk app integrates directly with the OneCard system using a secure interface. It provides a simple way for users to add funds to their OneCard via a streamlined, touch-friendly interface on dedicated POS terminals. Data privacy is ensured with the app’s automatic session reset, clearing all local data after each session.

## Support

For support, open an issue in the **[Issues section](https://github.com/DaveLuhman/ReloaderKiosk/issues)** or contact **[Sales@ado.software](mailto:Sales@ado.software)** for hardware-related inquiries (such as replacement ResetButtons).

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contributors

- **[Dave Luhman](https://github.com/DaveLuhman)** - Lead Developer

