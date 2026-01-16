import { CodeBlock } from "@/components/docs/code-block"
import { Callout } from "@/components/docs/callout"

export default function IntroductionPage() {
  return (
    <div className="prose prose-invert max-w-none">
      <h1 id="introduction">Introduction</h1>

      <p className="text-lg text-foreground/80 mt-4">
        Vyoma is a developer platform for running code inside secure, isolated
        sandboxes. It allows you to execute commands, manage files, and control
        sandbox lifecycles through a simple API.
      </p>

      <h2 id="what-you-can-build">What you can build with Vyoma</h2>

      <ul>
        <li>Code execution services</li>
        <li>Online IDEs and playgrounds</li>
        <li>Automated testing pipelines</li>
        <li>Education and grading systems</li>
        <li>Secure execution of untrusted code</li>
      </ul>

      <h2 id="how-vyoma-works">How Vyoma works</h2>

      <p>
        Each sandbox runs in its own container with an isolated filesystem and
        process space. Sandboxes can execute multiple commands over their
        lifetime and are billed based on usage.
      </p>

      <h2 id="sdk-and-api">SDK and API</h2>

      <p>
        Vyoma provides both a REST API and an official JavaScript/TypeScript SDK.
        The SDK is recommended for most users.
      </p>

      <CodeBlock
        language="ts"
        code={`import { VyomaClient } from "vyoma"

const client = new VyomaClient({
  apiKey: process.env.VYOMA_API_KEY!,
})

const { sandbox } = await client.sandbox.create({
  templateId: "node-20",
  timeout: 300,
})

const result = await client.sandbox.exec(
  sandbox.id,
  'node -e "console.log(42)"'
)

console.log(result.stdout)`}
        filename="example.ts"
      />

      <Callout type="info" title="Next steps">
        Head to the{" "}
        <a href="/docs/quickstart" className="font-semibold underline">
          Quickstart
        </a>{" "}
        to create your first sandbox.
      </Callout>
    </div>
  )
}
