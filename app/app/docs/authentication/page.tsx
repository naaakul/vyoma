import { CodeBlock } from "@/components/docs/code-block"
import { Callout } from "@/components/docs/callout"

export default function AuthenticationPage() {
  return (
    <div className="prose prose-invert max-w-none">
      <h1 id="authentication">Authentication</h1>

      <p className="text-lg text-foreground/80 mt-4">
        All requests to the Vyoma API must be authenticated using an API key.
      </p>

      <h2 id="getting-an-api-key">Getting an API key</h2>

      <ol>
        <li>
          Sign in to your{" "}
          <a href="/dashboard" className="underline">
            Vyoma dashboard
          </a>
        </li>
        <li>Navigate to API Keys</li>
        <li>Create a new key</li>
        <li>Copy and store the key securely</li>
      </ol>

      <Callout type="warning" title="Security warning">
        Never commit API keys to version control. Treat them like passwords.
      </Callout>

      <h2 id="using-the-sdk">Using the SDK</h2>

      <CodeBlock
        language="ts"
        code={`import { VyomaClient } from "vyoma"

const client = new VyomaClient({
  apiKey: process.env.VYOMA_API_KEY!,
})`}
        filename="client.ts"
      />

      <h2 id="using-the-rest-api">Using the REST API</h2>

      <p>
        Include your API key in the{" "}
        <code className="rounded bg-muted px-2 py-1 text-sm">
          Authorization
        </code>{" "}
        header.
      </p>

      <CodeBlock
        language="bash"
        code={`curl -X POST http://localhost:3000/api/sandbox/create \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"templateId":"node-20"}'`}
      />

      <h2 id="environment-variables">Environment variables</h2>

      <p>
        Store your API key in an environment variable and load it at runtime.
      </p>

      <CodeBlock
        language="bash"
        code={`VYOMA_API_KEY=vy_live_xxxxxxxxxxxxx`}
        filename=".env.local"
      />

      <Callout type="info">
        Rotate API keys periodically and revoke unused keys to maintain security.
      </Callout>

      <p className="text-sm text-foreground/70 mt-6">
        Continue with the{" "}
        <a href="/docs/quickstart" className="underline">
          Quickstart
        </a>{" "}
        to make your first authenticated request.
      </p>
    </div>
  )
}
