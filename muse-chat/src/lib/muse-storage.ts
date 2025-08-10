import { MuseConfig } from '@/types/muse';
import { DEFAULT_MUSE_CONFIG } from './constants';

const STORAGE_KEY = 'muse-chat-config';
const ACTIVE_MUSE_KEY = 'muse-chat-active';

export class MuseStorage {
  static saveMuseConfig(config: MuseConfig): void {
    try {
      const configs = this.getAllConfigs();
      const existingIndex = configs.findIndex(c => c.id === config.id);
      
      if (existingIndex >= 0) {
        configs[existingIndex] = config;
      } else {
        configs.push(config);
      }
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(configs));
    } catch (error) {
      console.error('Failed to save muse config:', error);
      // If localStorage is full (often due to large images), alert user
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        alert('Storage quota exceeded. Try using a smaller image for your avatar.');
      }
    }
  }

  static getAllConfigs(): MuseConfig[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        return [];
      }
      
      const configs = JSON.parse(stored) as MuseConfig[];
      return configs.map(config => ({
        ...config,
        createdAt: new Date(config.createdAt),
        updatedAt: new Date(config.updatedAt)
      }));
    } catch (error) {
      console.error('Failed to load muse configs:', error);
      return [];
    }
  }

  static getMuseById(id: string): MuseConfig | null {
    const configs = this.getAllConfigs();
    return configs.find(c => c.id === id) || null;
  }

  static deleteMuseConfig(id: string): void {
    try {
      const configs = this.getAllConfigs().filter(c => c.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(configs));
    } catch (error) {
      console.error('Failed to delete muse config:', error);
    }
  }

  static setActiveMuseId(id: string): void {
    try {
      localStorage.setItem(ACTIVE_MUSE_KEY, id);
    } catch (error) {
      console.error('Failed to save active muse:', error);
    }
  }

  static getActiveMuseId(): string | null {
    try {
      return localStorage.getItem(ACTIVE_MUSE_KEY);
    } catch (error) {
      console.error('Failed to get active muse:', error);
      return null;
    }
  }

  static getActiveMuse(): MuseConfig {
    const activeId = this.getActiveMuseId();
    if (activeId) {
      const muse = this.getMuseById(activeId);
      if (muse) {
        return muse;
      }
    }

    // Return default muse if no active one found
    const defaultMuse: MuseConfig = {
      id: 'default',
      ...DEFAULT_MUSE_CONFIG,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    return defaultMuse;
  }

  static initializeDefaultMuse(): MuseConfig {
    const configs = this.getAllConfigs();
    
    // If no configs exist, create and save the default one
    if (configs.length === 0) {
      const defaultMuse: MuseConfig = {
        id: 'default',
        ...DEFAULT_MUSE_CONFIG,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      this.saveMuseConfig(defaultMuse);
      this.setActiveMuseId(defaultMuse.id);
      return defaultMuse;
    }
    
    // If no active muse set, set the first one as active
    const activeId = this.getActiveMuseId();
    if (!activeId || !configs.find(c => c.id === activeId)) {
      this.setActiveMuseId(configs[0].id);
      return configs[0];
    }
    
    return this.getActiveMuse();
  }
}