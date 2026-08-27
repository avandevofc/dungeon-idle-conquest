import { useState, useCallback, useEffect, useRef } from 'react';
import { GameState } from '../types';

const LOCAL_SAVE_KEY = 'dic_save_v2';
const SAVE_VERSION = 2;

interface SaveMetadata {
  lastSave: number;
  playtime: number;
  powerLevel: number;
  version: number;
}

interface UseSaveReturn {
  // Save info
  hasLocalSave: boolean;
  hasCloudSave: boolean;
  lastSaveTime: number | null;
  
  // Actions
  saveToLocal: (state: GameState, powerLevel: number) => boolean;
  loadFromLocal: () => GameState | null;
  saveToCloud: (state: GameState, powerLevel: number) => Promise<boolean>;
  loadFromCloud: () => Promise<GameState | null>;
  
  // Conflict resolution
  showSaveConflict: boolean;
  localSaveInfo: SaveMetadata | null;
  cloudSaveInfo: SaveMetadata | null;
  resolveConflict: (useLocal: boolean) => void;
  
  // Delete saves
  deleteLocalSave: () => void;
  deleteCloudSave: () => Promise<boolean>;
}

export function useSave(
  token: string | null,
  isAuthenticated: boolean
): UseSaveReturn {
  const [hasLocalSave, setHasLocalSave] = useState(false);
  const [hasCloudSave, setHasCloudSave] = useState(false);
  const [lastSaveTime, setLastSaveTime] = useState<number | null>(null);
  const [showSaveConflict, setShowSaveConflict] = useState(false);
  const [localSaveInfo, setLocalSaveInfo] = useState<SaveMetadata | null>(null);
  const [cloudSaveInfo, setCloudSaveInfo] = useState<SaveMetadata | null>(null);
  const resolveConflictRef = useRef<(useLocal: boolean) => void>(() => {});

  // Check saves on mount
  useEffect(() => {
    // Check local save
    try {
      const localRaw = localStorage.getItem(LOCAL_SAVE_KEY);
      if (localRaw) {
        const parsed = JSON.parse(localRaw);
        if (typeof parsed.gold === 'number' && parsed.dungeon) {
          setHasLocalSave(true);
          setLastSaveTime(parsed.lastSaveTime || null);
          setLocalSaveInfo({
            lastSave: parsed.lastSaveTime || 0,
            playtime: parsed.playtime || 0,
            powerLevel: parsed.powerLevel || 0,
            version: parsed.version || 1,
          });
        }
      }
    } catch {}
  }, []);

  // Check cloud save when authenticated
  useEffect(() => {
    if (!isAuthenticated || !token) return;

    const checkCloudSave = async () => {
      try {
        const res = await fetch('/api/auth/load', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        
        if (data.success && data.saveData && typeof data.saveData.gold === 'number') {
          setHasCloudSave(true);
          setCloudSaveInfo({
            lastSave: data.saveData.lastSaveTime || 0,
            playtime: data.saveData.playtime || 0,
            powerLevel: data.saveData.powerLevel || 0,
            version: data.saveData.version || 1,
          });
        }
      } catch {}
    };

    checkCloudSave();
  }, [isAuthenticated, token]);

  // Save to localStorage
  const saveToLocal = useCallback((state: GameState, powerLevel: number): boolean => {
    try {
      const toSave = {
        ...state,
        lastSaveTime: Date.now(),
        playtime: (state as any).playtime || 0,
        powerLevel,
        version: SAVE_VERSION,
        combatLog: [],
        floatingNumbers: [],
      };
      localStorage.setItem(LOCAL_SAVE_KEY, JSON.stringify(toSave));
      setHasLocalSave(true);
      setLastSaveTime(Date.now());
      setLocalSaveInfo({
        lastSave: Date.now(),
        playtime: toSave.playtime,
        powerLevel,
        version: SAVE_VERSION,
      });
      return true;
    } catch {
      return false;
    }
  }, []);

  // Load from localStorage
  const loadFromLocal = useCallback((): GameState | null => {
    try {
      const raw = localStorage.getItem(LOCAL_SAVE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (typeof parsed.gold !== 'number' || !parsed.dungeon) return null;
      return parsed as GameState;
    } catch {
      return null;
    }
  }, []);

  // Save to cloud
  const saveToCloud = useCallback(async (state: GameState, powerLevel: number): Promise<boolean> => {
    if (!token) return false;

    try {
      const saveData = {
        ...state,
        lastSaveTime: Date.now(),
        playtime: (state as any).playtime || 0,
        powerLevel,
        version: SAVE_VERSION,
        combatLog: [],
        floatingNumbers: [],
      };

      const res = await fetch('/api/auth/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          saveData,
          stats: {
            total_playtime: saveData.playtime,
            highest_power_level: powerLevel,
            total_dungeons_completed: state.dungeon.completedDungeons,
            total_ascensions: state.prestige.ascensions,
          }
        }),
      });
      const data = await res.json();
      
      if (data.success) {
        setHasCloudSave(true);
        setCloudSaveInfo({
          lastSave: Date.now(),
          playtime: saveData.playtime,
          powerLevel,
          version: SAVE_VERSION,
        });
      }
      
      return data.success;
    } catch {
      return false;
    }
  }, [token]);

  // Load from cloud
  const loadFromCloud = useCallback(async (): Promise<GameState | null> => {
    if (!token) return null;

    try {
      const res = await fetch('/api/auth/load', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      
      if (data.success && data.saveData && typeof data.saveData.gold === 'number') {
        return data.saveData as GameState;
      }
      
      return null;
    } catch {
      return null;
    }
  }, [token]);

  // Resolve conflict
  const resolveConflict = useCallback((useLocal: boolean) => {
    setShowSaveConflict(false);
    resolveConflictRef.current(useLocal);
  }, []);

  // Delete local save
  const deleteLocalSave = useCallback(() => {
    localStorage.removeItem(LOCAL_SAVE_KEY);
    setHasLocalSave(false);
    setLastSaveTime(null);
    setLocalSaveInfo(null);
  }, []);

  // Delete cloud save
  const deleteCloudSave = useCallback(async (): Promise<boolean> => {
    if (!token) return false;

    try {
      const res = await fetch('/api/auth/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ saveData: {} }),
      });
      const data = await res.json();
      
      if (data.success) {
        setHasCloudSave(false);
        setCloudSaveInfo(null);
      }
      
      return data.success;
    } catch {
      return false;
    }
  }, [token]);

  return {
    hasLocalSave,
    hasCloudSave,
    lastSaveTime,
    saveToLocal,
    loadFromLocal,
    saveToCloud,
    loadFromCloud,
    showSaveConflict,
    localSaveInfo,
    cloudSaveInfo,
    resolveConflict,
    deleteLocalSave,
    deleteCloudSave,
  };
}
