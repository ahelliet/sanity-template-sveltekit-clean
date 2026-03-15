<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import type { SectionContact } from "$lib/sanity/queries";
	import SectionHeader from "./SectionHeader.svelte";

	interface Props {
		section: SectionContact;
	}

	let { section }: Props = $props();

	const bgClass = $derived(section.alternateBackground ? "bg-accent" : "");
</script>

<section class="px-20 py-24 {bgClass}">
	<div class="flex flex-col gap-16">
		<SectionHeader number={section.sectionNumber} label={section.sectionLabel} />

		<div class="flex gap-20">
			<div class="flex flex-1 flex-col gap-8">
				{#if section.title}
					<h2 class="font-serif text-3xl italic">{section.title}</h2>
				{/if}
				{#if section.description}
					<p class="leading-relaxed text-muted-foreground">{section.description}</p>
				{/if}
				{#if section.email}
					<Button href="mailto:{section.email}" variant="outline">
						{section.email}
					</Button>
				{/if}
			</div>
		</div>
	</div>
</section>
