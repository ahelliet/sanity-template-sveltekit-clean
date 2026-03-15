<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import type { SectionCta } from "$lib/sanity/queries";

	interface Props {
		section: SectionCta;
	}

	let { section }: Props = $props();

	const bgClass = $derived(section.alternateBackground ? "bg-accent" : "");
</script>

<section class="flex flex-col items-center gap-6 px-20 py-20 text-center {bgClass}">
	<div class="h-px w-16 bg-orange-600"></div>

	{#if section.title}
		<h2 class="font-serif text-4xl italic">{section.title}</h2>
	{/if}

	{#if section.description}
		<p class="max-w-lg text-base leading-relaxed text-muted-foreground">{section.description}</p>
	{/if}

	{#if section.button?.label}
		<Button href={section.button.href ?? "#"} class="bg-orange-600 hover:bg-orange-700">
			{section.button.label}
		</Button>
	{/if}
</section>
