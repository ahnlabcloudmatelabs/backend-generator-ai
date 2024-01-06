import { Ollama } from "@langchain/community/llms/ollama";
import type { RequestHandler } from './$types';

import type { GenerateRequest } from "$lib/interfaces/generate";

export const POST: RequestHandler = async ({request}) => {
  const {
    language,
    framework,
    etc,
    modelSchema,
    apis,
   }: GenerateRequest = await request.json()
  const model = new Ollama({
    model: "codellama"
  })

  const prompt = `You are specialist at backend development.

---

- Language: ${language}
${framework ? '- Framework: ' + framework : ''}
${etc ? etc : ''}

[Database Schema]

\`\`\`sql
${modelSchema}
\`\`\`

[API]

${apis.map((api) => `- Path: ${api.path}
    - Method: ${api.method}
    - Request Example
        \`\`\`json
        ${api.requestExample}
        \`\`\`
    - Response Example:
        \`\`\`json
        ${api.responseExample}
        \`\`\`
    - Description: ${api.description}`).join('\n')}

---

Generate backend code from this document.
Let's think step by step`

  const result = await model.invoke(prompt)
  return new Response(result)
}