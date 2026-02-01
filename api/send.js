export default async function handler(req, res) {
    // صرف POST میتھڈ کو اجازت دیں تاکہ ڈیٹا محفوظ طریقے سے آئے
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // جو ڈیٹا Lua ایکسٹینشن سے آئے گا اسے یہاں وصول کریں
        const { message, userName } = req.body;
        
        // آپ کی نئی فراہم کردہ معلومات
        const BOT_TOKEN = "8582001627:AAGEccriMREaDryxKzcF9l2Slc8GBw5JHJ8";
        const CHAT_ID = "7476240210";
        
        // ٹیلی گرام API کا مکمل ایڈریس
        const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        
        // میسج کا فارمیٹ جو آپ کو ٹیلی گرام پر موصول ہوگا
        // ہم نے یہاں Markdown کا استعمال کیا ہے تاکہ ٹیکسٹ بولڈ نظر آئے
        const text = `*New Feedback Received*\n\n` +
                     `*User Name:* ${userName || 'Unknown User'}\n` +
                     `*User ID:* ${CHAT_ID}\n` +
                     `*Message Details:*\n${message}\n\n` +
                     `*Status:* Sent from Jieshuo Extension`;

        // ٹیلی گرام کو ڈیٹا بھیجنے کا عمل
        const response = await fetch(telegramUrl, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: text,
                parse_mode: "Markdown"
            })
        });

        // ٹیلی گرام سے آنے والا جواب (Response)
        const result = await response.json();

        // چیک کریں کہ کیا میسج کامیابی سے چلا گیا ہے
        if (result.ok) {
            return res.status(200).json({ 
                success: true, 
                message: "Feedback successfully sent to Muhammad Hanzla" 
            });
        } else {
            // اگر ٹیلی گرام کی طرف سے کوئی خرابی آئے
            return res.status(500).json({ 
                success: false, 
                error: result.description 
            });
        }

    } catch (error) {
        // اگر سرور میں کوئی اور خرابی پیدا ہو جائے
        return res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
}
