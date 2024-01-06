<script lang="ts">
	import '../app.postcss';

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';
	import python from 'highlight.js/lib/languages/python';
	import ruby from 'highlight.js/lib/languages/ruby';
	import rust from 'highlight.js/lib/languages/rust';
	import go from 'highlight.js/lib/languages/go';
	import php from 'highlight.js/lib/languages/php';
	import java from 'highlight.js/lib/languages/java';
	import kotlin from 'highlight.js/lib/languages/kotlin';
	import c from 'highlight.js/lib/languages/c';
	import cpp from 'highlight.js/lib/languages/cpp';
	import csharp from 'highlight.js/lib/languages/csharp';
	import elixir from 'highlight.js/lib/languages/elixir';
	import sql from 'highlight.js/lib/languages/sql';
	import dockerfile from 'highlight.js/lib/languages/dockerfile';
	import plaintext from 'highlight.js/lib/languages/plaintext';
	import bash from 'highlight.js/lib/languages/bash';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('js', javascript);
	hljs.registerLanguage('typescript', typescript);
	hljs.registerLanguage('ts', typescript);
	hljs.registerLanguage('python', python);
	hljs.registerLanguage('ruby', ruby);
	hljs.registerLanguage('rust', rust);
	hljs.registerLanguage('go', go);
	hljs.registerLanguage('php', php);
	hljs.registerLanguage('java', java);
	hljs.registerLanguage('kotlin', kotlin);
	hljs.registerLanguage('c', c);
	hljs.registerLanguage('cpp', cpp);
	hljs.registerLanguage('csharp', csharp);
	hljs.registerLanguage('elixir', elixir);
	hljs.registerLanguage('sql', sql);
	hljs.registerLanguage('dockerfile', dockerfile);
	hljs.registerLanguage('bash', bash);
	hljs.registerLanguage('plaintext', plaintext);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<main class="container mx-auto p-4">
	<slot />
</main>
