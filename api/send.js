export default async function handler(req, res) {
    // اگر کوئی براؤزر میں کھولے (GET ریکوسٹ)
    if (req.method === 'GET') {
        return res.status(200).send("API is running... Please send a POST request.");
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { message, userName } = req.body;
        
        const BOT_TOKEN = "8167956673:AAEvwwm-vre-8dHJN50wyIplizrZLUlF9Ts";
        const CHAT_ID = "7476240210";
        const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        
        // بالکل صاف ستھرا پروفیشنل ٹیکسٹ
        const text = `*New Feedback Received*\n\n*From:* ${userName || 'Guest'}\n*Details:*\n${message}`;

        const response = await fetch(telegramUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: text,
                parse_mode: "Markdown"
            })
        });

        const result = await response.json();

        if (result.ok) {
            return res.status(200).json({ success: true, message: "Sent to Telegram" });
        } else {
            return res.status(500).json({ success: false, error: result.description });
        }

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}