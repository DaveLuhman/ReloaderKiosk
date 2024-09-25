const electronInstaller = require("electron-winstaller")
const makeInstaller = async () => {
try {
    await electronInstaller.createWindowsInstaller({
      appDirectory: './out/ReloaderKiosk-win32-x64/',
      outputDirectory: './out/make/squirrel/',
      authors: 'Dave Luhman',
      exe: 'ReloaderKiosk.exe',
      loadingGif: "./img/kioskPulse.gif",
      owners: 'ADO Software',
      version: '1.0.1-Release',
      name: "Reloader Kiosk",
      iconUrl: './img/kiosk.ico',
      setupIcon: "./img/kiosk.ico"
    });
  } catch (e) {
    console.log(`No dice: ${e.message}`);
  }
}
makeInstaller()