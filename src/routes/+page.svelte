<script lang="ts">
	import './+page.css';

	import { Marked } from 'marked';
	import { markedHighlight } from 'marked-highlight';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import hljs from 'highlight.js/lib/core';

	import type { API } from '$lib/interfaces/api';

	const marked = new Marked(
		markedHighlight({
			langPrefix: 'hljs language-',
			highlight(code, lang, info) {
				const language = hljs.getLanguage(lang) ? lang : 'plaintext';
				return hljs.highlight(code, { language }).value;
			}
		}),
		{
			pedantic: false,
			gfm: true,
			breaks: true
		}
	);

	let language = '';
	let framework = '';
	let etc = '';
	let modelSchema = '';
	let loading = false;
	let apis: API[] = [
		{
			method: 'ALL',
			path: '',
			requestExample: '',
			responseExample: '',
			description: ''
		}
	];
	let generatedCode = '';
	let generatedError = '';

	function onClickApiAdd() {
		apis = [
			...apis,
			{
				method: 'ALL',
				path: '',
				requestExample: '',
				responseExample: '',
				description: ''
			}
		];
	}

	async function onClickGenerate() {
		loading = true;

		await fetch('/api/generate', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				language,
				framework,
				etc,
				modelSchema,
				apis
			})
		})
			.then((res) => res.text())
			.then((data) => marked.parse(data))
			.then((html) => {
				generatedCode = html;
			})
			.catch((err) => {
				generatedError = err;
			})
			.finally(() => {
				loading = false;
			});
	}
</script>

<div class="card p-4 mb-4">
	<div class="grid grid-cols-2 gap-4 mb-4">
		<label class="label">
			<span>Language</span>
			<input type="text" class="input" placeholder="Go" bind:value={language} />
		</label>

		<label class="label">
			<span>Framework</span>
			<input type="text" class="input" placeholder="Fiber v2" bind:value={framework} />
		</label>
	</div>

	<label class="label">
		<span>Etc</span>
		<textarea
			class="textarea"
			rows="6"
			bind:value={etc}
			placeholder="- database:
    - host: localhost
    - port: 5432
    - username: postgres
    - password: 1234
    - database: postgres"
		/>
	</label>
</div>

<div class="card p-4 mb-4">
	<label class="label">
		<span>Model Schema</span>
		<textarea
			class="textarea"
			rows="6"
			bind:value={modelSchema}
			placeholder="CREATE TABLE user (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    age INTEGER
)"
		/>
	</label>
</div>

<div class="card p-4 mb-6">
	<h2>API</h2>
	<button type="button" class="btn variant-filled" on:click={onClickApiAdd}>Add</button>

	<hr class="my-6" />

	{#each apis as api}
		<div class="grid grid-cols-8 gap-2">
			<label class="label">
				<span>Method</span>
				<select class="select" bind:value={api.method}>
					<option value="ALL" selected>ALL</option>
					<option value="GET">GET</option>
					<option value="POST">POST</option>
					<option value="PUT">PUT</option>
					<option value="DELETE">DELETE</option>
				</select>
			</label>

			<label class="label">
				<span>Path</span>
				<input type="text" class="input" placeholder="/users/create" bind:value={api.path} />
			</label>

			<label class="label col-span-2">
				<span>Request Example</span>
				<textarea
					class="textarea"
					rows="8"
					bind:value={api.requestExample}
					placeholder={JSON.stringify(
						{
							name: 'John Doe',
							age: 20
						},
						null,
						4
					)}
				/>
			</label>

			<label class="label col-span-2">
				<span>Response Example</span>
				<textarea
					class="textarea"
					rows="8"
					bind:value={api.responseExample}
					placeholder={JSON.stringify(
						{
							data: {
								id: 1,
								name: 'John Doe',
								age: 20
							}
						},
						null,
						4
					)}
				/>
			</label>

			<label class="label col-span-2">
				<span>Description</span>
				<textarea
					class="textarea"
					rows="8"
					bind:value={api.description}
					placeholder="Insert request data to `users` table"
				/>
			</label>
		</div>

		<hr class="my-6" />
	{/each}
</div>

<button
	type="button"
	class="btn variant-filled block w-full mb-6"
	on:click={onClickGenerate}
	disabled={loading}
>
	{#if loading}
		<ProgressRadial width="w-12" class="mx-auto" />
	{:else}
		Generate
	{/if}
</button>

{#if generatedCode}
	<hr class="my-6" />

	{@html generatedCode}
{/if}

{#if generatedError}
	<pre class="text-error-500 p-4">
		{generatedError}
	</pre>
{/if}
