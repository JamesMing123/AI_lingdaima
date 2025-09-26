import { generate } from 'openapi-typescript-codegen';
import { resolve } from 'node:path';
import { mkdir } from 'node:fs/promises';

async function main() {
  const schema = process.env.OPENAPI_SCHEMA ?? 'http://localhost:8080/v3/api-docs';
  const output = resolve(process.cwd(), 'src/services/api/generated');
  await mkdir(output, { recursive: true });
  await generate({
    input: schema,
    output,
    httpClient: 'axios',
    useOptions: true,
    useUnionTypes: true
  });
  console.log(`SDK generated from ${schema} to ${output}`);
}

main().catch((error) => {
  console.error('Failed to generate OpenAPI SDK', error);
  process.exit(1);
});
