<script lang="ts">
	import { urlFor } from "$lib/sanity/image";
	import type { SectionImage } from "$lib/sanity/queries";

	interface Props {
		section: SectionImage;
	}

	let { section }: Props = $props();
</script>

{#if section.image}
	<section class={section.fullWidth ? "px-0" : "px-20 py-8"}>
		<img
			src={urlFor(section.image).width(1440).url()}
			alt={section.alt ?? ""}
			class={section.fullWidth ? "w-full" : "rounded-xl"}
		/>
	</section>
{/if}
