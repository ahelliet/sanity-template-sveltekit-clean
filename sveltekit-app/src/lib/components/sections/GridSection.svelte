<script lang="ts">
	import { urlFor } from "$lib/sanity/image";
	import type { SectionGrid, Post, Project } from "$lib/sanity/queries";
	import SectionHeader from "./SectionHeader.svelte";

	interface Props {
		section: SectionGrid;
		posts?: Post[];
		projects?: Project[];
	}

	let { section, posts = [], projects = [] }: Props = $props();

	const items = $derived.by(() => {
		const data = section.source === "posts" ? posts : section.source === "projects" ? projects : [];
		if (section.limit && section.limit > 0) return data.slice(0, section.limit);
		return data;
	});

	const bgClass = $derived(section.alternateBackground ? "bg-accent" : "");
</script>

<section class="px-20 py-24 {bgClass}">
	<div class="flex flex-col gap-16">
		<div class="flex items-center justify-between">
			<div class="flex flex-col gap-4">
				<SectionHeader number={section.sectionNumber} label={section.sectionLabel} />
				{#if section.title}
					<h2 class="font-serif text-4xl italic">{section.title}</h2>
				{/if}
			</div>
			{#if section.viewAllLabel}
				<a href={section.viewAllHref ?? "#"} class="text-sm text-orange-600">
					{section.viewAllLabel}
				</a>
			{/if}
		</div>

		{#if section.source === "posts"}
			<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each items as post}
					{@const p = post as Post}
					<a href="/blog/{p.slug.current}" class="group overflow-hidden rounded-lg border border-border">
						{#if p.mainImage}
							<img src={urlFor(p.mainImage).width(400).height(250).url()} alt={p.title} class="h-48 w-full object-cover" />
						{/if}
						<div class="flex flex-col gap-2 p-4">
							<h3 class="font-medium group-hover:text-orange-600">{p.title}</h3>
							{#if p.excerpt}<p class="text-sm text-muted-foreground">{p.excerpt}</p>{/if}
							{#if p.tags?.length}
								<div class="flex flex-wrap gap-2">
									{#each p.tags as tag}<span class="rounded bg-muted px-2 py-0.5 text-xs">{tag}</span>{/each}
								</div>
							{/if}
						</div>
					</a>
				{/each}
			</div>
		{:else if section.source === "projects"}
			<div class="flex flex-col gap-12">
				{#each items as project}
					{@const p = project as Project}
					<a href="/projets/{p.slug.current}" class="group flex gap-12">
						{#if p.mainImage}
							<img src={urlFor(p.mainImage).width(600).height(400).url()} alt={p.title} class="w-1/2 rounded-lg object-cover" />
						{/if}
						<div class="flex flex-1 flex-col justify-center gap-4">
							<h3 class="font-serif text-2xl italic group-hover:text-orange-600">{p.title}</h3>
							{#if p.description}<p class="text-muted-foreground">{p.description}</p>{/if}
							{#if p.tags?.length}
								<div class="flex flex-wrap gap-2">
									{#each p.tags as tag}<span class="rounded bg-muted px-2 py-0.5 text-xs">{tag}</span>{/each}
								</div>
							{/if}
						</div>
					</a>
				{/each}
			</div>
		{/if}
	</div>
</section>
