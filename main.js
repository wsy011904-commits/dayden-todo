const { app, BrowserWindow, screen } = require('electron');
const path = require('path');

function createWindow() {
  // 모니터 화면 크기 구하기
  const primaryDisplay = screen.getPrimaryDisplay();
  const { height } = primaryDisplay.workAreaSize;

  const win = new BrowserWindow({
    width: 390,                  // 가로 크기
    height: height,               // 화면 전체 세로 길이에 맞춤
    x: 0,                         // 화면 맨 왼쪽(X좌표 0)에 밀착
    y: 0,                         // 화면 맨 위(Y좌표 0)에 밀착
    frame: false,                 // 상단 윈도우 창 틀 제거 (위젯 느낌)
    alwaysOnTop: false,           // 다른 창 뒤로 넘어갈 수 있게 설정
    resizable: true,              // 크기 조절 가능
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile('index.html');
}

// 윈도우 시작 시 자동 실행 등록
app.setLoginItemSettings({
  openAtLogin: true,
  path: app.getPath('exe')
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
