import ogHandler from '@/api/og-handler'
import ssrHandler from '@/api/ssr-handler'
import { OG_IMAGE_URL_PATHNAME } from './constants'

export default {
  fetch(req: Request, env: Env) {
    const url = new URL(req.url)

    if (url.pathname.endsWith(OG_IMAGE_URL_PATHNAME)) return ogHandler(req, env)

    return ssrHandler(req)
  },
}
