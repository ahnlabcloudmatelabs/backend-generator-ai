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

  const response = await model.stream(prompt)

  const stream = new ReadableStream({
    start (controller) {
      function push() {
        response.next()
          .then(({value, done}) => {
            if (done) {
              controller.close()
              return
            }

            controller.enqueue('data: ' + value + '\n\n')
            push()
          })
      }

      push()
    },

    cancel (reason) {
      response.cancel(reason)
    }
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream"
    }
  })
}
