<script lang="ts">
	import SectionRenderer from "$lib/components/sections/SectionRenderer.svelte";
	import type { PageProps } from "./$types";

	const { data }: PageProps = $props();
</script>

{#if data.page?.sections}
	<SectionRenderer
		sections={data.page.sections}
		posts={data.posts}
		projects={data.projects}
	/>
{/if}
