async function getMessage() {
	const API_KEY = "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";
	const url = "https://api.openai.com/v1/chat/completions";

	const options = {
		method: "POST",
		headers: {
			Authorization: `Bearer ${API_KEY}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			model: "gpt-3.5-turbo",
			messages: [
				{ role: "user", content: "Hello Chat GPT how are you??" },
			],
			max_tokens: 100,
		}),
	};

	try {
		const response = await fetch(url, options);
		const data = await response.json();
		console.log(data);
	} catch (error) {
		console.log(error);
	}
}

getMessage();
