import { CodeBlock } from "@/components/docs/code-block"
import { Callout } from "@/components/docs/callout"

export default function QuickstartPage() {
  return (
    <div className="prose prose-invert max-w-none">
      <h1 className="heading-anchor" id="quickstart">Quickstart</h1>

      <p className="text-lg text-foreground/80 mt-4">
        Get up and running with Vyoma in minutes.
      </p>

      <h2 className="heading-anchor" id="install">Install the SDK</h2>

      <CodeBlock language="bash" code={`npm install vyoma`} />

      <h2 className="heading-anchor" id="setup-client">Create a client</h2>

      <CodeBlock
        language="ts"
        code={`import { VyomaClient } from "vyoma"

const client = new VyomaClient({
  apiKey: process.env.VYOMA_API_KEY!,
})`}
        filename="client.ts"
      />

      <h2 className="heading-anchor" id="create-sandbox">Create a sandbox</h2>

      <CodeBlock
        language="ts"
        code={`const { sandbox } = await client.sandbox.create({
  templateId: "node-20",
  timeout: 300, // seconds
})

console.log("Sandbox ID:", sandbox.id)`}
        filename="sandbox.ts"
      />

      <h2 className="heading-anchor" id="execute-code">Execute code</h2>

      <CodeBlock
        language="ts"
        code={`const result = await client.sandbox.exec(
  sandbox.id,
  'node -e "console.log(42)"'
)

console.log(result.stdout)`}
        filename="exec.ts"
      />

      <h2 className="heading-anchor" id="write-files">Write files</h2>

      <CodeBlock
        language="ts"
        code={`await client.sandbox.write(
  sandbox.id,
  "hello.js",
  'console.log("Hello from Vyoma")'
)

const result = await client.sandbox.exec(
  sandbox.id,
  "node hello.js"
)

console.log(result.stdout)`}
        filename="files.ts"
      />

      <h2 className="heading-anchor" id="cleanup">Stop the sandbox</h2>

      <CodeBlock
        language="ts"
        code={`await client.sandbox.stop(sandbox.id)`}
        filename="cleanup.ts"
      />

      <Callout type="success">
        You’ve successfully created a sandbox, executed code, and managed files.
      </Callout>
    </div>
  )
}
