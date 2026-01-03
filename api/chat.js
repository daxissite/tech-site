export default async function handler(req, res) {
    // Vercel подставит ключ сам из настроек
    const GROQ_KEY = process.env.GROQ_API_KEY; 

    const { message } = req.body;

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${GROQ_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    { role: "system", content: "Ты помощник учителя технологии." },
                    { role: "user", content: message }
                ]
            })
        });

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

