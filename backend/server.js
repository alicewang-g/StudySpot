require("dotenv").config();
const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
const multer = require("multer");
const pdfParse = require("pdf-parse");

const app = express();

const PORT = process.env.PORT || 3001;

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY
});

const upload = multer({
  storage: multer.memoryStorage()
});

const pdfText = await extractText(req.file.buffer);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is working!");
});

app.post("/api/create-plan", upload.single("file"), async (req, res) => {
  try {
    console.log("===== CREATE PLAN REQUEST =====");
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);

    const { subject, time, course, exam} = req.body;

    console.log("Subject:", subject);
    console.log("Time:", time);
    console.log("Exam:", exam);
    
    /* * EXTRACT TEXT FROM PDF */ 
    let uploadedMaterial = ""; 
    if (req.file) { 
      console.log( "Uploaded file:", req.file.originalname ); 
      console.log( "File size:", req.file.size ); 
      try { 
        const pdfData = await pdfParse( req.file.buffer ); 
        uploadedMaterial = pdfData.text; 
        console.log( "Extracted PDF text length:", uploadedMaterial.length ); 
        console.log( "First 1000 characters:", uploadedMaterial.substring(0, 1000) ); 
      } catch (pdfError) { 
        console.error( "PDF extraction error:", pdfError ); 
        return res.status(400).json({ 
          error: "Could not read the uploaded PDF." 
        }); 
      } 
    } else { 
      console.log("No file uploaded"); 
    }

    const response = await openai.chat.completions.create({
        model: "openrouter/free",

        messages: [
            {role: "system",
            content: `You are StudySpot, an AI study planning assistant.
            Your job is to create personalized study plans for students.
            A valid subject is ANY legitimate academic subject or course that a student
            could reasonably study.
            Examples include:
            - Biology
            - Psychology
            - Chemistry
            - Physics
            - Mathematics
            - Calculus
            - Statistics
            - Computer Science
            - Programming
            - Economics
            - Accounting
            - Finance
            - History
            - World History
            - U.S. History
            - Political Science
            - Sociology
            - Philosophy
            - English
            - Literature
            - Writing
            - Spanish
            - French
            - Art History
            - Music Theory
            - Engineering
            - Anatomy
            - Physiology
            - Neuroscience
            - Astronomy
            - Environmental Science
            - Geography

            Do NOT require the subject to appear in a predefined list.
            Accept specific courses such as:
            - "Psychology 101"
            - "AP Psychology"
            - "Intro to Psychology"
            - "Organic Chemistry"
            - "Calculus II"
            - "CS 32"
            - "Physics 1C"

            Minor spelling mistakes should be interpreted when the intended subject
            is obvious. For example:
            - "Pyschology" → Psychology
            - "biolgy" → Biology
            - "calclus" → Calculus

            Abreviations are accepted. For example:
            - "CS" → Computer science
            - "Bio" → Biology
            - "Psych" → Psychology

            Reject the input only if it clearly does not represent an academic subject
            or course.

            For example:
            - "pizza"
            - "I don't know"
            - "asdfgh"
            - "football game tonight"

            The examples above are illustrative, NOT an exhaustive list. 
            When the subject is valid, create an appropriate study plan.`},

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
            - Use the user uploaded notes to parse what they are learning and generate practice questions based on the notes specifically.
            - If the user uploads textbook files, let the user know what pages they can reference when studying.

            For each study step:

            - "task" describes what the student should do.
            - "duration" is the number of minutes.
            - "resources" contains references to the uploaded material.
            - "practice" contains practice questions generated from the uploaded material.

            If the uploaded material does not contain useful information for a particular
            task, resources may be an empty array.

            If practice questions would not be useful for a particular task,
            practice.questions may be an empty array.

            When referencing uploaded material, use the page numbers from the uploaded PDF.

            Return ONLY valid JSON matching the schema.
          `}
        ],
      
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "study_plan",
          strict: true,
          schema: {
            type: "object",
            properties: {
              valid: {
                type: "boolean"
              },
              subject: {
                type: "string"
              },
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
                    },
                    material: {
                      type: "object",
                      properties: {
                        pages: {
                          type: "string"
                        }
                      },
                      required: ["pages"],
                      additionalProperties: false
                    },
                    practice: {
                      type: "object",
                      properties: {
                        questions: {
                          type: "array",
                          items: {
                            type: "string"
                          }
                        }
                      },
                      required: ["questions"],
                      additionalProperties: false
                    }
                  },
                  required: [
                    "task",
                    "duration",
                    "material",
                    "practice"
                  ],
                  additionalProperties: false
                }
              }
            },
            required: [
              "valid",
              "subject",
              "steps"
            ],
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
  console.log(`Server running on port ${PORT}`);
});


//activities[subject]; gives specific subject plan == activies.biology, but [] allows variable

/*
KEY:
GET  → "Give me some information"
POST → "Here's some information; do something with it"
*/