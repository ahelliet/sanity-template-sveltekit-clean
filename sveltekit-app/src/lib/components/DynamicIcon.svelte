<script lang="ts">
	import * as icons from "@lucide/svelte";

	interface Props {
		name: string;
		class?: string;
		size?: number;
	}

	let { name, class: className = "", size = 24, ...rest }: Props = $props();

	function toComponentName(kebab: string): string {
		return kebab
			.split("-")
			.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
			.join("");
	}

	const Icon = $derived((icons as Record<string, any>)[toComponentName(name)]);
</script>

{#if Icon}
	<Icon {size} class={className} {...rest} />
{/if}
