import { CodeBlock } from "@/components/docs/code-block"
import { Callout } from "@/components/docs/callout"

export default function SandboxesPage() {
  return (
    <div className="prose prose-invert max-w-none">
      <h1 className="heading-anchor" id="sandboxes">Sandboxes</h1>

      <p className="text-lg text-foreground/80 mt-4">
        Sandboxes are isolated execution environments where your code runs safely
        and independently.
      </p>

      <h2 className="heading-anchor" id="what-is-a-sandbox">What is a sandbox?</h2>

      <p>
        Each Vyoma sandbox runs in its own container with a dedicated filesystem
        and process space. Sandboxes are long-lived and can execute multiple
        commands over time.
      </p>

      <h2 className="heading-anchor" id="key-features">Key features</h2>

      <ul>
        <li>Strong isolation using containers</li>
        <li>Dedicated filesystem per sandbox</li>
        <li>Execute arbitrary commands</li>
        <li>Write and read files</li>
        <li>Time-based automatic shutdown</li>
      </ul>

      <h2 className="heading-anchor" id="creating-a-sandbox">Creating a sandbox</h2>

      <CodeBlock
        language="ts"
        code={`const { sandbox } = await client.sandbox.create({
  templateId: "node-20",
  timeout: 300,
})`}
      />

      <Callout type="info" title="Templates">
        Templates define the runtime environment for your sandbox (Node.js,
        Python, Go, etc.). More templates will be added over time.
      </Callout>

      <h2 className="heading-anchor" id="sandbox-status">Checking sandbox status</h2>

      <CodeBlock
        language="ts"
        code={`const status = await client.sandbox.status(sandbox.id)

console.log(status.status) // "starting" | "running" | "stopped"`}
      />

      <h2 className="heading-anchor" id="executing-commands">Executing commands</h2>

      <CodeBlock
        language="ts"
        code={`const result = await client.sandbox.exec(
  sandbox.id,
  "node -e \\"console.log('Hello')\\""
)

console.log(result.stdout)`}
      />

      <h2 className="heading-anchor" id="writing-files">Writing files</h2>

      <CodeBlock
        language="ts"
        code={`await client.sandbox.write(
  sandbox.id,
  "app.js",
  'console.log("Hello from file")'
)

const result = await client.sandbox.exec(
  sandbox.id,
  "node app.js"
)

console.log(result.stdout)`}
      />

      <h2 className="heading-anchor" id="stopping-a-sandbox">Stopping a sandbox</h2>

      <CodeBlock
        language="ts"
        code={`await client.sandbox.stop(sandbox.id)`}
      />

      <Callout type="success">
        Stopping a sandbox immediately frees resources and stops billing.
      </Callout>
    </div>
  )
}
