import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface QueryItem {
  id: string;
  query: string;
}

interface SavedQueriesStore {
  _items: Record<string, string>;

  queries: QueryItem[];
  setQueries: (queries: QueryItem[]) => void;

  getQueryID: (query: string) => string | undefined;
  isQuerySaved: (query: string) => boolean;
  saveQuery: (id: string, query: string) => void;
  removeQuery: (query: string) => void;
}

export const useSavedQueriesStore = create<SavedQueriesStore>()(
  persist(
    (set, get) => ({
      _items: {},

      queries: [],
      setQueries: (queries: QueryItem[]) => {
        set({
          queries,
          _items: queries.reduce(
            (acc, q) => {
              acc[q.query] = q.id;
              return acc;
            },
            {} as Record<string, string>,
          ),
        });
      },

      getQueryID: (query: string) => {
        return get()._items[query];
      },

      isQuerySaved: (query: string) => {
        return get()._items[query] !== undefined;
      },

      saveQuery: (id: string, query: string) => {
        set((state) => ({
          _items: { ...state._items, [query]: id },
          queries: [...state.queries, { id, query }],
        }));
      },

      removeQuery: (query: string) => {
        set((state) => {
          const newItems = { ...state._items };
          delete newItems[query];
          return {
            _items: newItems,
            queries: state.queries.filter((q) => q.query !== query),
          };
        });
      },
    }),
    {
      name: 'saved-queries',
    },
  ),
);
