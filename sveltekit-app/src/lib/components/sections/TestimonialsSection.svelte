<script lang="ts">
	import { urlFor } from "$lib/sanity/image";
	import type { SectionTestimonials } from "$lib/sanity/queries";
	import SectionHeader from "./SectionHeader.svelte";

	interface Props {
		section: SectionTestimonials;
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

		{#if section.items?.length}
			<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
				{#each section.items as t}
					<div class="flex flex-col justify-between gap-6 rounded-lg border border-border bg-accent p-8">
						<p class="text-muted-foreground">"{t.content}"</p>
						<div class="flex items-center gap-3">
							{#if t.avatar}
								<img src={urlFor(t.avatar).width(40).height(40).url()} alt={t.name} class="h-10 w-10 rounded-full" />
							{/if}
							<div>
								<p class="text-sm font-medium">{t.name}</p>
								{#if t.role}<p class="text-xs text-muted-foreground">{t.role}</p>{/if}
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</section>
