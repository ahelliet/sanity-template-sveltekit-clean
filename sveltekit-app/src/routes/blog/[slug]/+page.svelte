<script lang="ts">
  import {useQuery} from '@sanity/sveltekit'
  import {PortableText} from '@portabletext/svelte'
  import {formatDate} from '$lib/utils/index'
  import {urlFor} from '$lib/sanity/image'
  import Code from '$lib/components/Code.svelte'
  import Mermaid from '$lib/components/Mermaid.svelte'
  import type {PageProps} from './$types'

  const {data}: PageProps = $props()
  const query = $derived(useQuery(data))
  const post = $derived($query.data)
  const author = $derived(data.layout)

  const components = {
    types: {
      code: Code,
      mermaid: Mermaid,
    },
  }
</script>

{#if post}
  <article class="article">
    <header class="article__header">
      <h1 class="article__title">{post.title}</h1>
      <div class="article__meta">
        {#if author?.authorName}
          <div class="article__author">
            {#if author.authorAvatar}
              <img src={urlFor(author.authorAvatar).width(32).height(32).url()} alt={author.authorName} class="article__author-avatar" />
            {/if}
            <span>{author.authorName}</span>
          </div>
        {/if}
        <span>{formatDate(post._createdAt)}</span>
        {#if post.readingTime}
          <span>{post.readingTime} min de lecture</span>
        {/if}
      </div>
      {#if post.tags?.length}
        <div class="tags">
          {#each post.tags as tag}
            <span class="tag">{tag}</span>
          {/each}
        </div>
      {/if}
    </header>

    {#if post.mainImage}
      <img
        class="article__cover"
        src={urlFor(post.mainImage).width(1280).height(480).url()}
        alt="Cover image for {post.title}"
      />
    {/if}

    {#if post.body}
      <div class="article__body">
        <PortableText {components} value={post.body} />
      </div>
    {/if}

    {#if author?.authorBio}
      <div class="article__author-block">
        {#if author.authorAvatar}
          <img src={urlFor(author.authorAvatar).width(64).height(64).url()} alt={author.authorName} class="article__author-block-avatar" />
        {/if}
        <div>
          <p class="article__author-block-name">{author.authorName}</p>
          <p class="article__author-block-bio">{author.authorBio}</p>
        </div>
      </div>
    {/if}

    {#if post.relatedPosts?.length}
      <section class="related">
        <h2 class="related__title">Continuez la lecture</h2>
        <div class="related__grid">
          {#each post.relatedPosts as related}
            <a href="/blog/{related.slug.current}" class="post-card">
              {#if related.mainImage}
                <img src={urlFor(related.mainImage).width(400).height(250).url()} alt={related.title} class="post-card__image" />
              {/if}
              <div class="post-card__content">
                <h3 class="post-card__title">{related.title}</h3>
                {#if related.excerpt}
                  <p class="post-card__excerpt">{related.excerpt}</p>
                {/if}
              </div>
            </a>
          {/each}
        </div>
      </section>
    {/if}
  </article>
{/if}
