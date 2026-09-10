import { ImageResponse } from 'takumi-js/response'
import { defaultOgTemplate, getImageResponseOptions } from '@/lib/og'
import { truncate } from '@/lib/utils'

const MAX_TITLE_LENGTH = 60
const MAX_DESCRIPTION_LENGTH = 120

export default async function handle(req: Request, env: Env) {
  const url = new URL(req.url)
  const params = url.searchParams

  const title = truncate(params.get('title') ?? 'Untitled', MAX_TITLE_LENGTH)
  const description = params.get('description')
    ? truncate(params.get('description')!, MAX_DESCRIPTION_LENGTH)
    : undefined

  const res = new ImageResponse(
    defaultOgTemplate({ title, description }),
    await getImageResponseOptions({ assets: env.ASSETS, requestUrl: url })
  )

  res.headers.set('cache-control', 'public, max-age=31536000, immutable')
  res.headers.set('content-disposition', 'inline; filename="image.webp"')
  return res
}
