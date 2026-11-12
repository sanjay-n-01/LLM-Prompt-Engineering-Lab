# LLM Prompt Engineering Lab

An interactive research dashboard for exploring how prompt quality changes large-language-model writing.

The lab presents **150 essays about being first** across six prompt-complexity tiers. Browse the generated writing, compare how different instructions shape the output, search the collection, and review the project's conclusions in one place.

## What is included

- 150 essays organized into six prompt tiers
- Search across prompts and essay content
- Tier filtering from raw prompts to stylistically constrained prompts
- Full essay reading in an accessible modal
- Project Reflection mode with observations from the experiment
- Responsive layout for desktop and mobile screens
- Animated transitions and a focused reading experience

## Prompt tiers

| Tier | Focus |
| --- | --- |
| Tier 1: Raw | Short, open-ended prompts with minimal direction |
| Tier 2: Basic | Prompts with a clearer topic or argument |
| Tier 3: Structured | Prompts that specify structure or reasoning |
| Tier 4: Philosophical | Prompts using philosophical frameworks and ideas |
| Tier 5: Adversarial | Prompts that introduce tension, opposition, or competing claims |
| Tier 6: Stylistic | Prompts that use a distinct voice, tone, or writing style |

## Tech stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Motion for React
- Lucide React

## Getting started

### Prerequisites

- Node.js 18 or newer
- npm

### Installation

```bash
git clone https://github.com/sanjay-n-01/LLM-Prompt-Engineering-Lab.git
cd LLM-Prompt-Engineering-Lab
npm install
```

### Run the development server

```bash
npm run dev
```

Open the local URL shown by Vite, usually [http://localhost:3000](http://localhost:3000).

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run the TypeScript compiler without emitting files |
| `npm run clean` | Remove the production build output |

## How to use the lab

1. Select **All Iterations** or a specific complexity tier in the sidebar.
2. Use the search field to find a prompt or phrase within an essay.
3. Select an essay card to open the complete text.
4. Open **Project Reflection** to read the experiment's analysis and conclusion.

## Project structure

```text
.
├── index.html          # Application entry point and document metadata
├── src/
│   ├── App.tsx         # Dashboard layout, filters, search, and reader modal
│   ├── data.ts         # Essay dataset
│   ├── types.ts        # Shared TypeScript types
│   ├── index.css       # Global styles
│   └── main.tsx        # React application bootstrap
├── .env.example        # Example environment configuration for AI Studio
├── metadata.json       # AI Studio project metadata
├── package.json        # Scripts and dependencies
└── vite.config.ts      # Vite configuration
```

## Data and experiment

The essay collection is stored locally in `src/data.ts`. Each record contains:

- A numeric identifier
- Its prompt-complexity tier
- The original prompt
- The generated essay content

The central finding explored by the dashboard is that better results come from clearer thinking and more deliberate instructions—not simply from asking a model to produce more text.

## Environment variables

The repository includes `.env.example` for compatibility with Google AI Studio deployments. The current dashboard reads its essay collection locally and does not require an API key to run.

If AI-backed features are added later, copy the example file to `.env.local` and provide the required values:

```bash
cp .env.example .env.local
```

Do not commit `.env.local` or API keys to the repository.

## License

No license has been specified for this project yet.
