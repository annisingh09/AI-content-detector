// Mock logic for demonstration purposes
// In a real app, these would call your backend API
export const analyzeText = async (text) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simulate analysis delay
            const words = text.split(' ');
            const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
            // Mock score based on length (just for variation) or randomness
            // A real detector would use ML models
            const isShort = words.length < 10;
            const score = isShort ? 0 : Math.floor(Math.random() * 100);
            // Identify "AI" sentences randomly for visual demo
            const aiSentences = sentences.map(s => ({
                text: s,
                isAi: Math.random() > 0.5,
                score: Math.random()
            }));
            resolve({
                score: score,
                isAi: score > 50,
                sentences: aiSentences,
                classification: score > 80 ? 'Likely AI' : score > 40 ? 'Mixed' : 'Likely Human'
            });
        }, 1500);
    });
};
export const rewriteText = async (text) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Very basic mock rewriter - replaces some common words or structure
            // Real implementation would call an LLM
            const replacements = {
                "utilize": "use",
                "demonstrate": "show",
                "furthermore": "also",
                "consequently": "so",
                "in order to": "to",
                "is able to": "can"
            };
            let newText = text;
            Object.keys(replacements).forEach(key => {
                const regex = new RegExp(key, 'gi');
                newText = newText.replace(regex, replacements[key]);
            });
            // Just to ensure it looks different
            if (newText === text) {
                newText = "Here is a more human-like version: " + text.toLowerCase();
            }
            resolve(newText);
        }, 2000);
    });
};
