const electronInstaller = require("electron-winstaller")
const makeInstaller = async () => {
try {
    await electronInstaller.createWindowsInstaller({
      appDirectory: './out/ReloaderKiosk-win32-x64/',
      outputDirectory: './out/make/squirrel/',
      authors: 'ADO Software',
      exe: 'ReloaderKiosk.exe'
    });
  } catch (e) {
    console.log(`No dice: ${e.message}`);
  }
}
makeInstaller()