var store = PropertiesService.getUserProperties();
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
    }
  }

  const response = sendToAPI(prompt, 1, "gpt-3.5-turbo");

  return response;
}


/**
 * Send data to api and return response
 */
function sendToAPI(prompt) {
  const model = store.getProperty('model');
  const temperature = Number(store.getProperty('temperature'));
  const apiKey = store.getProperty("api-key");

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
  const settings = store.getProperty('temperature');

  console.log(typeof(settings));
}




































