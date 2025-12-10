export enum AppView {
  HOME = 'HOME',
  INSTALL = 'INSTALL',
  TROUBLESHOOT = 'TROUBLESHOOT',
  ANTICHEAT = 'ANTICHEAT',
}

export enum LinuxDistro {
  UBUNTU = 'Ubuntu/Debian',
  ARCH = 'Arch Linux/Manjaro',
  FEDORA = 'Fedora',
  OPENSUSE = 'OpenSUSE',
  OTHER = 'Other',
}

export enum InstallMethod {
  LUTRIS = 'Lutris',
  HEROIC = 'Heroic Games Launcher',
  BOTTLES = 'Bottles',
  WINE_DIRECT = 'Wine (Manual)',
}

export interface ScriptResponse {
  script: string;
  instructions: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  isScript?: boolean;
}