<script lang="ts">
	import SunIcon from "@lucide/svelte/icons/sun";
	import MoonIcon from "@lucide/svelte/icons/moon";
	import { toggleMode } from "mode-watcher";
	import { Button } from "$lib/components/ui/button";
</script>

<Button
	onclick={toggleMode}
	size="icon"
	class="size-auto p-0 bg-transparent text-muted-foreground shadow-none border-none hover:bg-transparent hover:text-foreground"
>
	<SunIcon class="size-4.5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
	<MoonIcon
		class="absolute size-4.5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
	/>
	<span class="sr-only">Toggle theme</span>
</Button>
