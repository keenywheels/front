import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TokenSubscriptionItem {
  id: string;
  token: string;
  category: string;
  method: string;
  current_interest: number;
  previous_interest: number;
  last_scan: string;
}

interface TokenSubscriptionsStore {
  _items: Record<string, string>;
  subscriptions: TokenSubscriptionItem[];

  setSubscriptions: (subscriptions: TokenSubscriptionItem[]) => void;
  isTokenSubscribed: (token: string) => boolean;
  getSubscriptionID: (token: string) => string | undefined;
  subscribe: (
    id: string,
    token: string,
    category: string,
    method: string,
    current_interest: number,
    previous_interest: number,
    last_scan: string,
  ) => void;
  unsubscribe: (token: string) => void;
}

export const useTokenSubscriptionsStore = create<TokenSubscriptionsStore>()(
  persist(
    (set, get) => ({
      _items: {},

      subscriptions: [],
      setSubscriptions: (subscriptions: TokenSubscriptionItem[]) => {
        set({
          subscriptions,
          _items: subscriptions.reduce(
            (acc, q) => {
              acc[q.token] = q.id;
              return acc;
            },
            {} as Record<string, string>,
          ),
        });
      },

      getSubscriptionID: (token: string) => {
        return get()._items[token];
      },

      isTokenSubscribed: (token: string) => {
        return get()._items[token] !== undefined;
      },

      subscribe: (
        id: string,
        token: string,
        category: string,
        method: string,
        current_interest: number,
        previous_interest: number,
        last_scan: string,
      ) => {
        set((state) => ({
          _items: { ...state._items, [token]: id },
          subscriptions: [
            ...state.subscriptions,
            {
              id,
              token,
              category,
              method,
              current_interest,
              previous_interest,
              last_scan,
            },
          ],
        }));
      },

      unsubscribe: (token: string) => {
        set((state) => {
          const newItems = { ...state._items };
          delete newItems[token];
          return {
            _items: newItems,
            subscriptions: state.subscriptions.filter((q) => q.token !== token),
          };
        });
      },
    }),
    {
      name: 'token-subscriptions',
    },
  ),
);
