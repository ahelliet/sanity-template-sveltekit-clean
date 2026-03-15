<script lang="ts">
	import { PortableText } from "@portabletext/svelte";
	import { urlFor } from "$lib/sanity/image";
	import type { SectionRichText } from "$lib/sanity/queries";
	import SectionHeader from "./SectionHeader.svelte";
	import Code from "../Code.svelte";
	import Mermaid from "../Mermaid.svelte";

	interface Props {
		section: SectionRichText;
	}

	let { section }: Props = $props();

	const bgClass = $derived(section.alternateBackground ? "bg-accent" : "");
</script>

<section class="px-20 py-24 {bgClass}">
	<div class="flex flex-col gap-16">
		<SectionHeader number={section.sectionNumber} label={section.sectionLabel} />

		<div class="flex gap-20" class:flex-row-reverse={section.imagePosition === 'right'}>
			{#if section.image}
				<div class="w-[380px] shrink-0 overflow-hidden rounded-lg">
					<img
						src={urlFor(section.image).width(760).height(960).url()}
						alt={section.title ?? ""}
						class="h-full w-full object-cover"
					/>
				</div>
			{/if}

			<div class="flex flex-1 flex-col gap-8">
				{#if section.title}
					<h2 class="font-serif text-3xl italic">{section.title}</h2>
				{/if}
				{#if section.body}
					<div class="prose prose-invert max-w-none">
						<PortableText
							value={section.body}
							components={{
								types: {
									code: Code,
									mermaid: Mermaid,
								},
							}}
						/>
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>
