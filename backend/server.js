
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

// console.log(
//   "API key loaded:",
//   Boolean(process.env.OPENROUTER_API_KEY)
// );

const app = express();

const PORT = 3001;

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is working!");
});

app.post("/api/create-plan", async (req, res) => {
  try {
    const { subject, time } = req.body;

    console.log("Subject:", subject);
    console.log("Time:", time);

    const response = await openai.chat.completions.create({
        model: "openrouter/free",

        messages: [
            {role: "system",
            content: `You are a study planning assistant. 
            Create realistic study plans for students.`
            },
            {role: "user",
            content: `
            Create a study plan for ${subject}.

            The student has exactly ${time} minutes.

            Requirements:
            - Divide the total time into several meaningful study tasks.
            - The sum of all task durations must equal exactly ${time} minutes.
            - Tasks should be appropriate for the subject, and appropriate within given time frame.
            - Give specific tasks relevant to the course they are taking and what exam it is for.
            - Include active learning such as practice, recall, problem solving, or self-testing when appropriate.
            - Do not make every task the same length.
            - Return only the study plan in the requested structured format. 
            Determine whether the user's input is a legitimate academic subject, if not respond with "invalid".

            Return ONLY valid JSON in this exact format:

            {
            "steps": [
                {
                "task": " description of task",
                "duration": 15
                }
            ]
            }
            `}
        ],
      
      text: {
        format: {
          type: "json_schema",
          name: "study_plan",
          strict: true,
          schema: {
            type: "object",
            properties: {
              steps: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    task: {
                      type: "string"
                    },
                    duration: {
                      type: "number"
                    }
                  },
                  required: ["task", "duration"],
                  additionalProperties: false
                }
              }
            },
            required: ["steps"],
            additionalProperties: false
          }
        }
      }
    });

    const aiText = response.choices[0].message.content;

    console.log("AI response:", aiText);

    const plan = JSON.parse(aiText);

    console.log("AI Plan:", plan);

    res.json(plan);

  } catch (error) {
    console.error("AI Error:", error);

    res.status(500).json({
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


//activities[subject]; gives specific subject plan == activies.biology, but [] allows variable

/*
KEY:
GET  → "Give me some information"
POST → "Here's some information; do something with it"
*/