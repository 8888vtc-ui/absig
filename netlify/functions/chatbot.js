// Netlify Function: AI Chatbot pour GALRIVIERA
// Supporte OpenAI GPT et xAI Grok

exports.handler = async (event) => {
    // CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    // Handle preflight
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
    }

    try {
        const { message, lang = 'fr' } = JSON.parse(event.body);

        // Déterminer quelle API utiliser
        const useGrok = process.env.XAI_API_KEY && !process.env.OPENAI_API_KEY;
        const apiKey = useGrok ? process.env.XAI_API_KEY : process.env.OPENAI_API_KEY;

        if (!apiKey) {
            // Fallback: réponses locales si pas d'API configurée
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    reply: getLocalResponse(message, lang),
                    source: 'local'
                })
            };
        }

        // System prompt pour le chatbot GALRIVIERA
        const systemPrompt = `Tu es l'assistant virtuel de GALRIVIERA, un service VTC premium sur la Côte d'Azur (Nice, Cannes, Monaco, Saint-Tropez).

Informations clés:
- Téléphone/WhatsApp: +33 6 82 26 73 42
- Email: vtctransportsig@gmail.com
- Adresse: 120 route de macarons, 06560 Valbonne
- Services: Transferts aéroport, circuits touristiques, mariages, business, chauffeurs parlant hébreu
- Flotte: Mercedes Classe S, E, V et Tesla Model S
- Tarifs: À partir de 45€ pour les trajets centre-ville
- Disponibilité: 24/7

Instructions:
- Réponds de manière concise et professionnelle
- Utilise le français ou l'anglais selon la langue du client
- Propose toujours de contacter via WhatsApp pour réserver
- Mets en avant le service premium et personnalisé
- Si on te demande un prix exact, dis de contacter pour un devis personnalisé`;

        let response;

        if (useGrok) {
            // xAI Grok API
            response = await fetch('https://api.x.ai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'grok-beta',
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: message }
                    ],
                    max_tokens: 300,
                    temperature: 0.7
                })
            });
        } else {
            // OpenAI GPT API
            response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: message }
                    ],
                    max_tokens: 300,
                    temperature: 0.7
                })
            });
        }

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        const reply = data.choices[0]?.message?.content || 'Désolé, je n\'ai pas pu traiter votre demande.';

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                reply,
                source: useGrok ? 'grok' : 'openai'
            })
        };

    } catch (error) {
        console.error('Chatbot error:', error);
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                reply: 'Je suis temporairement indisponible. Contactez-nous directement au +33 6 82 26 73 42 ou via WhatsApp.',
                source: 'error'
            })
        };
    }
};

// Réponses locales (fallback sans API)
function getLocalResponse(message, lang) {
    const msg = message.toLowerCase();

    const responses = {
        fr: {
            tarif: "Nos tarifs débutent à 45€ pour les trajets centre-ville. Pour un devis personnalisé, contactez-nous sur WhatsApp: +33 6 82 26 73 42",
            aeroport: "Nous assurons tous les transferts depuis/vers l'aéroport Nice Côte d'Azur. Accueil VIP avec panneau nominatif et suivi de vol en temps réel.",
            monaco: "Nous proposons des transferts et circuits vers Monaco/Monte-Carlo. Découvrez le Casino, le Palais Princier et plus encore.",
            reserve: "Pour réserver, contactez-nous sur WhatsApp au +33 6 82 26 73 42 ou appelez-nous directement. Disponible 24/7.",
            vehicule: "Notre flotte comprend des Mercedes Classe S, E, V (7 places) et Tesla Model S. Tous nos véhicules ont moins de 2 ans.",
            default: "Bienvenue chez GALRIVIERA ! Comment puis-je vous aider ? Pour une réservation rapide: +33 6 82 26 73 42 (WhatsApp)"
        },
        en: {
            tarif: "Our rates start at €45 for city center transfers. For a personalized quote, contact us on WhatsApp: +33 6 82 26 73 42",
            aeroport: "We provide all transfers to/from Nice Côte d'Azur Airport. VIP welcome with name board and real-time flight tracking.",
            monaco: "We offer transfers and tours to Monaco/Monte-Carlo. Discover the Casino, Prince's Palace and more.",
            reserve: "To book, contact us on WhatsApp at +33 6 82 26 73 42 or call us directly. Available 24/7.",
            vehicule: "Our fleet includes Mercedes S-Class, E-Class, V-Class (7 seats) and Tesla Model S. All vehicles are less than 2 years old.",
            default: "Welcome to GALRIVIERA! How can I help you? For quick booking: +33 6 82 26 73 42 (WhatsApp)"
        }
    };

    const r = responses[lang] || responses.fr;

    if (msg.includes('tarif') || msg.includes('prix') || msg.includes('price') || msg.includes('cost')) return r.tarif;
    if (msg.includes('aeroport') || msg.includes('airport') || msg.includes('vol') || msg.includes('flight')) return r.aeroport;
    if (msg.includes('monaco') || msg.includes('monte-carlo') || msg.includes('casino')) return r.monaco;
    if (msg.includes('reserver') || msg.includes('book') || msg.includes('reservation')) return r.reserve;
    if (msg.includes('vehicule') || msg.includes('mercedes') || msg.includes('tesla') || msg.includes('voiture')) return r.vehicule;

    return r.default;
}
