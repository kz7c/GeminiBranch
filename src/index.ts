import {GoogleGenAI} from '@google/genai';

/* ======================
 * Types
 * ====================== */
export interface GeminiBranchOptions {
  condition: string;
  choices: string[];
  apiKey: string;
  model: string;
  else?: string;
  consoleErrors?: boolean;
}

export interface GeminiBranchResult {
    response: boolean,
      /**
       * true  : No internal library errors (branching behaved as designed by the user)
       * false : Library failure such as schema errors or API errors
       */
    result: string,
    message: string,
}


/* ======================
 * Fail function (Error handling)
 * ====================== */
function fail(
  message: string,
  args: { else?: string; consoleErrors?: boolean }
): GeminiBranchResult {
  if (args.consoleErrors ?? false) {
    console.error(message);
  }
  return {
    response: false,
    result: args.else ?? "",
    message,
  };
}


/* ======================
 * Main function
 * ====================== */
export async function GeminiBranch( args: GeminiBranchOptions ): Promise<GeminiBranchResult> {
  try {
    // condition is non-empty string check
    if (typeof args.condition !== "string" || args.condition.trim() === "") {
      return fail("condition must be a non-empty string", args);
    }

    // choices is non-empty array check
    if (!Array.isArray(args.choices) || args.choices.length === 0) {
      return fail("choices must be a non-empty array", args);
    }

    // Gemini API call
    const ai = new GoogleGenAI({apiKey: args.apiKey});
    const response = await ai.models.generateContent({
      model: args.model,
      contents: `
      You are a strict conditional branching engine.
      From the "choices" array in the JSON below, output **exactly one element that matches completely**.

      {
        "condition": ${JSON.stringify(args.condition)},
        "choices": ${JSON.stringify(args.choices)}
      }

      Output rules:
      - Output exactly one element from "choices"
      - Do NOT output JSON
      - Do NOT add explanations
      - Do NOT add extra spaces or line breaks
      - Do NOT output anything other than an element from "choices"
      - If no element matches, output ${args.else ?? ""}
      `,
    });
    
    const responsemsg = String(response.text ?? "").trim();

    // args.else was selected(≒ Success)
    if (args.else && responsemsg === (args.else)) {
      return {
        response: true,
        result: args.else,
        message: "No matching choice"
      };
    }

    // response is not in args.choices
    if(!args.choices.includes(responsemsg)){
      return fail("Response by Gemini is not in choices: " + responsemsg, args);
    }

    // Success
    return {
      response: true,
      result: responsemsg,
      message: "Success"
    };

  } catch (e) {
    // Gemini API error
    return fail("Gemini API error: " + String(e), args);
  }


  // Unknown error
  return fail("Unknown error", args);
}