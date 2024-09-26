const electronInstaller = require("electron-winstaller");
const makeInstaller = async () => {
	try {
		await electronInstaller.createWindowsInstaller({
			appDirectory: "./out/ReloaderKiosk-win32-x64/",
			outputDirectory: "./out/make/squirrel/v1.0.1/x64/",
			authors: "Dave Luhman",
			exe: "ReloaderKiosk.exe",
			setupMsi: "ReloaderKioskInstaller.msi",
			setupExe: "ReloaderKioskSetup.exe",
			loadingGif: "./img/kioskPulse.gif",
			owners: "ADO Software",
			version: "1.0.1-Release",
			name: "ReloaderKiosk",
			iconUrl: "./img/kiosk.ico",
			setupIcon: "./img/kiosk.ico",
			description:
				"A kiosk-mode app for reloading OneCard funds at Madison College",
			shortcutName: "Reloader Kiosk",
			noMsi: false,
			rfc3161TimeStampServer: "http://timestamp.digicert.com",
		});
	} catch (e) {
		console.log(`No dice: ${e.message}`);
	}
};
makeInstaller();
