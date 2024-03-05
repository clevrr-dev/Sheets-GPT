var store = PropertiesService.getUserProperties();
var models = [
  "gpt-4",
  "gpt-4-preview",
  "gpt-4-vision-preview",
  "gpt-4-32k",
  "gpt-3.5-turbo-16k",
  "gpt-3.5-turbo"
];

var apiKey = "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";
var apiEndpoint = "https://api.openai.com/v1/chat/completions";


/**
 * Process arguments
 */
function GPT(prompt, ...optionalArgs) {
  // If no prompt is provided
  if (!prompt) {
    return "Error: Please provide a prompt";
  }

  if (optionalArgs.length > 0) {
    for (let option of optionalArgs) {
      prompt += `, ${option}`;
      // allPrompts.push(newPrompt);
    }
  }

  // const responses = [];

  // for (let prompt of allPrompts) {
  const response = sendToAPI(prompt, 1, "gpt-3.5-turbo");
  // responses.push(response)
  // };

  return response;
}


/**
 * Set model and temperature
 */
function GPT_SETTINGS(model="gpt-3.5-turbo", temperature=0.35) {
  // If an invalid model is provided
  if (!models.includes(model)) {
    const m = `Error: Invalid model`
    return m;
  }

  // If temperature is invalid
  if (!(temperature >= 0 && temperature <= 2)) {
    return "Error: Temperature must be within 0 and 2";
  }

  store.setProperties(
    {
      model: model,
      temperature: temperature
    }
  )

  return "Settings Saved";
}

/**
 * Send data to api and return response
 */
function sendToAPI(prompt, temperature, model) {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + apiKey
  }

  const data = {
    "model": model,
    "temperature": temperature,
    "messages": [
      { "role": "user", "content": prompt }
    ],
  };

  const options = {
    "method": "post",
    "headers": headers,
    "payload": JSON.stringify(data)
  }

  const response = UrlFetchApp.fetch(apiEndpoint, options);
  const jsonData = JSON.parse(response.getContentText());
  const message = jsonData.choices[0].message.content;

  return message;
}


/**
 * Test gpt
 */
function test() {
  const prompt = "Generate a slogan for an oil company";

  const response = GPT(prompt);

  console.log(response);
}




































