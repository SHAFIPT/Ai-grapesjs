import { openai } from "../config/openai.config";
import { formatPrompt } from "../utils/promptFormatter";

export class GenerateService {
  async generateWebsite(rawPrompt: string): Promise<string> {
    const formattedPrompt = formatPrompt(rawPrompt);
    const completion = await openai.chat.completions.create({
      model: "mistralai/mixtral-8x7b-instruct",
      messages: [
        {
          role: "system",
          content:
            "You generate GrapesJS-compatible modular HTML, CSS, and JS.",
        },
        {
          role: "user",
          content: formattedPrompt,
        },
      ],
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error("No content generated.");
    return content;
  }
}
