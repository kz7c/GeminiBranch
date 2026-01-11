# GeminiBranch
[![npm version](https://img.shields.io/npm/v/gemini-branch.svg)](https://www.npmjs.com/package/gemini-branch)
[![license](https://img.shields.io/npm/l/gemini-branch.svg)](LICENSE)

This library performs conditional branching using natural language, powered by Google's Gemini API.
Think of it as a natural language `if/else` or `switch` statement.

## Features
- **Natural Language branching**: Branch complex, nuanced, or subjective conditions that are difficult to express with traditional code.
- **Dynamic Branching**: Select the most appropriate option from a set of choices based on a natural language prompt.
- **Simple & Typed API**: Easy-to-use, typed interface for seamless integration into TypeScript projects.
- **Error Handling**: Built-in error handling for API failures and unexpected responses.

## Installation
```shell
npm install gemini-branch
```

## Usage
First, obtain a Google Gemini API key. You can get one from the [Google AI Studio](https://aistudio.google.com/app/apikey).

=========ここにサンプル後で書く=========
```

```

## Model Selection
You need to select a model from the [Gemini](https://ai.google.dev/gemini-api/docs/models) or [Gemma 3](https://ai.google.dev/gemma/docs/core) model list.


## API Reference
GeminiBranch is the main function that performs the conditional branching.

### GeminiBranchOptions
| Parameter | Type | Description | Required |
|-----------|------|-------------|----------|
| condition | string | The natural language condition used for branching. | Yes |
| choices | string[] | A list of candidate values. Gemini selects the single best-matching option. | Yes |
| apiKey | string | Your Google Gemini API Key. | Yes |
| model | string | The model to use for branching. | Yes |
| else | string | A fallback value returned when no choice sufficiently matches the condition. | No |
| consoleErrors | boolean | Log internal errors to the console. Default is false. | No |

### GeminiBranchResult
| Parameter | Type | Description |
|-----------|------|-------------|
| response | boolean | **true** : The library executed correctly (including when the fallback `else` value is returned). <br> **false** : An internal error occurred (API failure, schema violation, etc.). |
| result | string | On success, a Gemini-selected value from `choices` or the fallback (`else`) value; on failure, `""` or the `else` value if provided. |
| message | string | Error message on failure, `"Success"` on success, "No matching choice" when `else` is selected |

⚠️ If `else` is not provided, the model is instructed to output `""` when no choice matches.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.