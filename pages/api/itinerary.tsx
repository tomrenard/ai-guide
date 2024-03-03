import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "openai";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { city, days, preferences } = req.body;

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const prompt = `Create a ${days}-day itinerary for visiting ${city} with interests in ${preferences}. Include places to visit, food to try, and activities to do.`;

    const response = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    res.status(200).json({ itinerary: response.choices[0].message });
  } catch (error) {
    console.error("Error generating itinerary:", error);
    res
      .status(500)
      .json({ error: "Failed to generate itinerary", details: error });
  }
}
