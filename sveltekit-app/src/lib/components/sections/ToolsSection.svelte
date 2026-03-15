<script lang="ts">
	import { urlFor } from "$lib/sanity/image";
	import type { SectionTools } from "$lib/sanity/queries";
	import SectionHeader from "./SectionHeader.svelte";

	interface Props {
		section: SectionTools;
	}

	let { section }: Props = $props();

	const bgClass = $derived(section.alternateBackground ? "bg-accent" : "");
</script>

<section class="px-20 py-24 {bgClass}">
	<div class="flex flex-col gap-16">
		<SectionHeader number={section.sectionNumber} label={section.sectionLabel} />

		{#if section.title}
			<h2 class="font-serif text-4xl italic">{section.title}</h2>
		{/if}

		{#if section.categories?.length}
			<div class="grid grid-cols-2 gap-8 md:grid-cols-4">
				{#each section.categories as category}
					<div class="flex flex-col gap-4">
						{#if category.name}
							<h3 class="text-sm font-medium uppercase tracking-widest text-muted-foreground">{category.name}</h3>
						{/if}
						{#if category.items?.length}
							<div class="flex flex-col gap-3">
								{#each category.items as tool}
									<div class="flex items-center gap-3 rounded-lg border border-border p-3">
										{#if tool.icon}
											<img src={urlFor(tool.icon).width(32).height(32).url()} alt={tool.name} class="h-8 w-8" />
										{/if}
										<span class="text-sm font-medium">{tool.name}</span>
									</div>
								{/each}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	</div>
</section>
