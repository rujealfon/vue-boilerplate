import { useLoading as loading } from 'vue-loading-overlay'

export function useLoading() {
  return loading({
    color: 'green',
    width: 100,
    height: 100
  })
}
