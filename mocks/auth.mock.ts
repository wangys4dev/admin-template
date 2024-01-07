import type { MockConfig, MockMethod } from 'vite-plugin-mock'

export default (mockConfig: MockConfig): MockMethod[] => {
  const VITE_REQUEST_BASE_URL: string = mockConfig.env.VITE_REQUEST_BASE_URL
  const REQUEST_BASE_URL =
    VITE_REQUEST_BASE_URL === '/' ? '' : VITE_REQUEST_BASE_URL
  const MODULE_BASE_URL = __filename.split('/').pop().slice(0, -8)
  const baseUrl = `${REQUEST_BASE_URL}/${MODULE_BASE_URL}`

  return [
    {
      url: `${baseUrl}/login`,
      method: 'get',
      response: () => {
        return {
          code: 0,
          data: null,
          message: 'ok',
        }
      },
    },
  ]
}
