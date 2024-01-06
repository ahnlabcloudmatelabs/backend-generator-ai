# Backend Generator AI

## Description

This is a prototype of backend code generator using LLM.  
Use Ollama to run LLM locally.  
And provides a web interface for easy use.  

## Caution

- This is a prototype.
- Generated code is may not work very nice.

## Prepare

- Install [Ollama](https://ollama.ai/download)
- `ollama pull codellama`

## Start server

```bash
git clone https://github.com/cloudmatelabs/backend-generator-ai.git
cd backend-generator-ai
bun install
bun run dev
```

and open http://localhost:5173

If you not want to use bun, you can use `npm` or `yarn` or `pnpm`.

## Usage

1. Fill in the form and click "Generate" button.
2. Wait for a while and you will see the generated code.

## License

[MIT](LICENSE)
