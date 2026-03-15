import type {SanityLink} from '$lib/sanity/queries'

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function resolveLink(link?: SanityLink): {href: string; external: boolean} {
  if (!link) return {href: '#', external: false}

  if (link.linkType === 'internal' && link.internalLink) {
    const {_type, slug} = link.internalLink
    let path = '#'
    if (_type === 'homePage') path = '/'
    else if (slug?.current) {
      if (_type === 'page') path = `/${slug.current}`
      else if (_type === 'project') path = `/projets/${slug.current}`
      else if (_type === 'post') path = `/blog/${slug.current}`
    }
    if (link.anchor) {
      const hash = link.anchor.replace(/^[/#]+/, '')
      return {href: `${path}#${hash}`, external: false}
    }
    return {href: path, external: false}
  }

  if (link.linkType === 'external') {
    return {href: link.externalUrl ?? '#', external: !!link.openInNewTab}
  }

  if (link.linkType === 'media' && link.mediaUrl) {
    const filename = link.downloadFilename || link.mediaOriginalFilename
    const href = filename ? `${link.mediaUrl}?dl=${encodeURIComponent(filename)}` : link.mediaUrl
    return {href, external: !!link.openInNewTab}
  }

  return {href: '#', external: false}
}
