import type { BrowserWindow } from 'electron';
import { ipcMain } from 'electron';

export default function setupEvent(mainWindow: BrowserWindow) {
  ipcMain.on('window-close', () => {
    mainWindow.close();
  });

  ipcMain.on('window-minimize', (_, arg: boolean) => {
    if (arg) {
      mainWindow.hide();
    } else {
      mainWindow.minimize();
    }
  });
}
