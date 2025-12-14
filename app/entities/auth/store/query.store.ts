import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SavedQueriesStore {
  _items: Record<string, string>;

  getQueryID: (query: string) => string | undefined;
  isQuerySaved: (query: string) => boolean;
  saveQuery: (id: string, query: string) => void;
  removeQuery: (query: string) => void;
}

export const useSavedQueriesStore = create<SavedQueriesStore>()(
  persist(
    (set, get) => ({
      _items: {},

      getQueryID: (query: string) => {
        return get()._items[query];
      },

      isQuerySaved: (query: string) => {
        return get()._items[query] !== undefined;
      },

      saveQuery: (id: string, query: string) => {
        set((state) => ({
          _items: { ...state._items, [query]: id },
        }));
      },

      removeQuery: (query: string) => {
        set((state) => {
          const newItems = { ...state._items };
          delete newItems[query];
          return { _items: newItems };
        });
      },
    }),
    {
      name: 'saved-queries',
    },
  ),
);
