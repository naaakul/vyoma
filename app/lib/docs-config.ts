export interface DocsNavItem {
  title: string
  href?: string
}

export interface DocsNavSection {
  title: string
  items: DocsNavItem[]
}

export const docsConfig: {
  sidebarNav: DocsNavSection[]
} = {
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        { title: "Introduction", href: "/docs/introduction" },
        { title: "Quickstart", href: "/docs/quickstart" },
        { title: "Authentication", href: "/docs/authentication" },
      ],
    },
    {
      title: "Core Concepts",
      items: [
        { title: "Sandboxes", href: "/docs/sandboxes" },
      ],
    },
    {
      title: "SDK Reference",
      items: [
        { title: "Installation", href: "/docs/quickstart#install" },
        { title: "VyomaClient", href: "/docs/quickstart#setup-client" },
        { title: "sandbox.create", href: "/docs/sandboxes#creating-a-sandbox" },
        { title: "sandbox.status", href: "/docs/sandboxes#sandbox-status" },
        { title: "sandbox.exec", href: "/docs/sandboxes#executing-commands" },
        { title: "sandbox.write", href: "/docs/sandboxes#writing-files" },
        { title: "sandbox.stop", href: "/docs/sandboxes#stopping-a-sandbox" },
      ],
    },
    // {
    //   title: "API Reference",
    //   items: [
    //     { title: "REST Overview", href: "/docs/api" },
    //     { title: "POST /sandbox/create", href: "/docs/api#create" },
    //     { title: "POST /sandbox/exec", href: "/docs/api#exec" },
    //     { title: "POST /sandbox/write", href: "/docs/api#write" },
    //     { title: "POST /sandbox/stop", href: "/docs/api#stop" },
    //     { title: "GET /sandbox/status", href: "/docs/api#status" },
    //   ],
    // },
    // {
    //   title: "Guides",
    //   items: [
    //     { title: "Running Code", href: "/docs/guides/running-code" },
    //     { title: "Writing Files", href: "/docs/guides/files" },
    //     { title: "Handling Failures", href: "/docs/guides/errors" },
    //   ],
    // },
  ],
}
