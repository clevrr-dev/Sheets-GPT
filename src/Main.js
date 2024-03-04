var models = [
  "gpt-4",
  "gpt-4-preview",
  "gpt-4-vision-preview",
  "gpt-4-32k",
  "gpt-3.5-turbo-16k",
  "gpt-3.5-turbo"
];


/**
 * Send prompt to api and return result
 */
function GPT(prompt, m = "gpt-3.5-turbo", t = 0.35) {
  const apiKey = "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";
  const apiEndpoint = "https://api.openai.com/v1/chat/completions";

  // If no prompt is provided
  if (!prompt) {
    return "Error: Please provide a prompt";
  }

  // If an invalid model is provided
  if (!models.includes(m)) {
    const m = `Error: Invalid model.

    Choose one of these: 
    - ${models.join("\n- ")}`
    return m;
  }

  // If temperature is invalid
  if (!(t >= 0 && t <= 2)) {
    return "Error: Temperature must be within 0 and 2";
  }

  const headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + apiKey
  }

  const data = {
    "model": m,
    "temperature": t,
    "messages": [
      { "role": "user", "content": prompt }
    ],
  };

  const options = {
    "method": "post",
    "headers": headers,
    "payload": JSON.stringify(data)
  }

  // const response = UrlFetchApp.fetch(apiEndpoint, options);

  // const jsonData = JSON.parse(response.getContentText());

  // const message = jsonData.choices[0].message.content;

  return "Done";
}


/**
 * Test gpt
 */
function test() {
  const prompt = "Generate a slogan for an oil company";

  const response = GPT(prompt);

  console.log(response);
}




































