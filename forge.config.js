const { FusesPlugin } = require("@electron-forge/plugin-fuses");
const { FuseV1Options, FuseVersion } = require("@electron/fuses");

module.exports = {
	packagerConfig: {
		asar: true,
	},
	rebuildConfig: {},
	makers: [
		{
			name: "@electron-forge/maker-wix",
			config: {
				ui: {
					chooseDirectory: true, // Let user choose the install directory
					template: "Minimal", // Set to Minimal for simple install UI, or leave out for default
				},
				description:
					"A kiosk-mode app for reloading OneCard funds at Madison College.",
				manufacturer: "ADO Software",
				shortcutFolderName: "ReloaderKiosk",
				outputDirectory: "./out/x64", // Where the output installer files are saved
				appUserModelId: "com.adosoftware.reloaderkiosk", // Unique app ID
			},
		},
		{
			name: "@electron-forge/maker-zip",
			platforms: ["darwin"],
		},
		{
			name: "@electron-forge/maker-deb",
			config: {},
		},
		{
			name: "@electron-forge/maker-rpm",
			config: {},
		},
	],
	plugins: [
		{
			name: "@electron-forge/plugin-auto-unpack-natives",
			config: {},
		},
		// Fuses are used to enable/disable various Electron functionality
		// at package time, before code signing the application
		new FusesPlugin({
			version: FuseVersion.V1,
			[FuseV1Options.RunAsNode]: false,
			[FuseV1Options.EnableCookieEncryption]: true,
			[FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
			[FuseV1Options.EnableNodeCliInspectArguments]: false,
			[FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
			[FuseV1Options.OnlyLoadAppFromAsar]: true,
		}),
	],
};
