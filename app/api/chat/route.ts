import { type CoreMessage, streamText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json()

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: "Fornisci risposte rapide e precise su contratti, turni di lavoro, ferie e normative. Rispondi in modo chiaro e pratico, offrendo soluzioni immediate basate sulle normative vigenti. Se necessario, semplifica i concetti complessi senza perdere accuratezza.",
    messages,
  })

  return result.toDataStreamResponse()
}

