<script lang="ts">
	import type { SectionPageHeader } from "$lib/sanity/queries";

	interface Props {
		section: SectionPageHeader;
	}

	let { section }: Props = $props();
</script>

<section class="px-20 pb-16 pt-20">
	{#if section.title}
		<h1 class="font-serif text-5xl italic">{section.title}</h1>
	{/if}
	{#if section.description}
		<p class="mt-6 text-lg leading-relaxed text-muted-foreground">{section.description}</p>
	{/if}
</section>
