# **ReloaderKiosk Application Documentation**

## **1. Introduction**

### **Project Name**
**ReloaderKiosk** - Version 1.0.0 Release

### **Purpose**
ReloaderKiosk is an Electron-based desktop application designed to operate in kiosk mode. It is deployed on touch-screen POS terminals to enable users to reload their OneCard funds through a secure interface. The application manages the user session through an idle timeout system and provides a simple way to navigate to the OneCard reload page.

### **Target Audience**
This application is intended for use by Madison College students and staff to streamline the process of adding funds to their OneCard accounts.

### **Overview**
The application runs in kiosk mode, preventing users from navigating away from the OneCard reloading page. It resets the session after periods of inactivity, ensuring privacy and security for subsequent users. A USB-ResetButton is available to manually refresh the session when needed.

---

## **2. Application Installation**

### **Step-by-Step Installation Guide**

1. **Download the Installer**:
   - Visit the **[ReloaderKiosk GitHub repository](https://github.com/DaveLuhman/ReloaderKiosk)**.
   - Navigate to the **Releases** section.
   - Download the latest `.msi` installer for **ReloaderKiosk**.

2. **Run the Installer**:
   - Once the `.msi` file is downloaded, double-click it to launch the installer.
   - Follow the on-screen instructions to install the application.

3. **Launch the Application**:
   - After installation, you will need to manually launch the app. When the POS terminal powers up and logs in automatically, open the app from the Start menu or desktop shortcut.

---

## **3. Features**

### **Idle Timeout**
An idle timeout feature ensures that if no user interaction occurs within 1.5 minutes, the application resets, clearing all local storage, cookies, and cached data to prepare for the next user.

### **USB-ResetButton**
There is a **USB-ResetButton** installed behind the screen of the POS terminal. This button is a single-key programmable USB button that is mapped to the F24 key. Pressing this button manually refreshes the session if necessary.

- **Replacement Buttons**: If the ResetButton becomes faulty or is lost/stolen, you can request a replacement by emailing **Sales@ado.software**. Replacement buttons are available for **$30**.

### **Kiosk Mode**
The application operates in full-screen kiosk mode, preventing users from navigating away from the designated page or closing the application. A keyboard is required to close the application, but you can always restart the terminal with the power rocker as well. The application does not automatically start on logon.

---

## **4. Troubleshooting**

### **1. Manually Launching the Application**
   - **Problem**: The app doesn’t automatically launch when the POS terminal powers up.
   - **Solution**: After the terminal powers up and logs in automatically, manually launch the ReloaderKiosk app from the Start menu or desktop shortcut.

### **2. Resetting the Session**
   - **Problem**: The session needs to be manually refreshed due to a frozen screen or input delay.
   - **Solution**: Press the **USB-ResetButton** located behind the screen to reset the session.

### **3. Power Off the Terminal**
   - **Problem**: The system becomes unresponsive, and the ResetButton doesn't resolve the issue.
   - **Solution**: Use the **power rocker switch** on the side of the POS terminal to turn it off, then power it back on. Once the system reboots, manually launch the ReloaderKiosk app.

### **4. Requesting Support**
   - **Problem**: Issues persist or the hardware becomes faulty.
   - **Solution**: Contact support via **support@ado.software** for hardware replacements or further assistance.

---

## **5. Logging**

The application uses **Winston** for logging. All errors, idle timeout triggers, and other relevant events are logged for audit and debugging purposes.

---

## **6. Security Considerations**

### **Data Security**
- The application does not store sensitive user data after the session ends.
- All cached data, local storage, and cookies are cleared when the idle timeout fires.
- Sensitive data (like payment card information) is only processed locally by the website itself and is not transmitted or logged by the application.

### **Exit Kiosk Mode**
To exit the kiosk mode, press the preconfigured key combination (`Ctrl + Shift + Q`) or reboot the device.

---

## **7. Support**

For any support or issues with the application, visit the **[GitHub Issues page](https://github.com/DaveLuhman/ReloaderKiosk/issues)** to report a problem or request help.

