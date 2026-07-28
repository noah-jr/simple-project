import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';

interface GlobalState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;

  isSearchModalOpen: boolean;
  toggleSearchModal: () => void;
  
  // Preferências do utilizador
  userPreferences: {
    compactView: boolean;
    notificationsEnabled: boolean;
  };
  updatePreferences: (prefs: Partial<GlobalState['userPreferences']>) => void;
}

export const useGlobalStore = create<GlobalState>()(
  persist(
    (set) => ({
      theme: 'system',
      setTheme: (theme) => set({ theme }),
      
      isSidebarOpen: false,
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),

      isSearchModalOpen: false,
      toggleSearchModal: () => set((state) => ({ isSearchModalOpen: !state.isSearchModalOpen })),
      
      userPreferences: {
        compactView: false,
        notificationsEnabled: true,
      },
      updatePreferences: (prefs) => 
        set((state) => ({
          userPreferences: { ...state.userPreferences, ...prefs }
        })),
    }),
    {
      name: 'petrohost-global-storage',
      // Apenas persiste o tema e as preferências (não estados voláteis como modais)
      partialize: (state) => ({ theme: state.theme, userPreferences: state.userPreferences }), 
    }
  )
);
