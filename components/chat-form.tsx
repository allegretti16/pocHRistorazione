"use client"

import { cn } from "@/lib/utils"

import { useChat } from "ai/react"

import { ArrowUpIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { AutoResizeTextarea } from "@/components/autoresize-textarea"
import ReactMarkdown from "react-markdown"

export function ChatForm({ className, ...props }: React.ComponentProps<"form">) {
  const { messages, input, setInput, append } = useChat({
    api: "/api/chat",
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    void append({ content: input, role: "user" })
    setInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)
    }
  }

  const header = (
    <header className="m-auto flex max-w-96 flex-col gap-5 text-center">
      <h1 className="text-2xl font-semibold leading-none tracking-tight">Il tuo assistente HR per la ristorazione</h1>
      <p className="text-muted-foreground text-sm">
      Risposte rapide e precise su contratti, turni, ferie e normative. Chiedi e ottieni subito soluzioni pratiche!
      </p>
 
    </header>
  )

  const messageList = (
    <div className="my-4 flex h-fit min-h-full flex-col gap-4 ">
      {messages.map((message, index) => (
        <div
          key={index}
          data-role={message.role}
          className="max-w-[80%] rounded-xl px-3 py-2 text-sm data-[role=assistant]:self-start data-[role=user]:self-end data-[role=assistant]:bg-gray-100 data-[role=user]:bg-blue-500 data-[role=assistant]:text-black data-[role=user]:text-white"
        >
          {message.role === "assistant" ? (
            <div className="prose prose-sm dark:prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p className="mb-2 leading-relaxed">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>,
                  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                  h1: ({ children }) => <h1 className="text-xl font-bold mb-2 mt-4">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-lg font-bold mb-2 mt-4">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-base font-bold mb-2 mt-4">{children}</h3>,
                  code: ({ children }) => <code className="bg-gray-200 dark:bg-gray-800 rounded px-1 py-0.5 font-mono text-sm">{children}</code>,
                  pre: ({ children }) => <pre className="bg-gray-200 dark:bg-gray-800 rounded p-2 mb-2 overflow-x-auto font-mono text-sm">{children}</pre>,
                  blockquote: ({ children }) => <blockquote className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 my-2 italic">{children}</blockquote>,
                  a: ({ children, href }) => <a href={href} className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">{children}</a>,
                  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                  em: ({ children }) => <em className="italic">{children}</em>,
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          ) : (
            message.content
          )}
        </div>
      ))}
    </div>
  )

  return (
    <main
      className={cn(
        "ring-none mx-auto flex h-svh max-h-svh w-full max-w-[35rem] flex-col items-stretch border-none",
        className,
      )}
      {...props}
    >
      <div className="flex-1 content-center overflow-y-auto scrollbar-hide px-6">{messages.length ? messageList : header}</div>
      <form
        onSubmit={handleSubmit}
        className="border-input bg-background focus-within:ring-ring/10 relative mx-6 mb-6 flex items-center rounded-[16px] border px-3 py-1.5 pr-8 text-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-0"
      >
        <AutoResizeTextarea
          onKeyDown={handleKeyDown}
          onChange={(v) => setInput(v)}
          value={input}
          placeholder="Inserisci un messaggio"
          className="placeholder:text-muted-foreground flex-1 bg-transparent focus:outline-none"
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="sm" className="absolute bottom-1 right-1 size-6 rounded-full">
              <ArrowUpIcon size={16} />
            </Button>
          </TooltipTrigger>
          <TooltipContent sideOffset={12}>Submit</TooltipContent>
        </Tooltip>
      </form>
    </main>
  )
}

