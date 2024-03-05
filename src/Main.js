var store = PropertiesService.getUserProperties();
var cache = CacheService.getUserCache();

var apiEndpoint = "https://api.openai.com/v1/chat/completions";


/**
 * Sends prompt to OpenAI GPT API
 * 
 * @param {string} prompt - The main prompt text.
 * @param {string | cell} ...optioinalArgs - Additional data to include in the prompt.
 * @return The response from the OpenAI GPT API.
 * @customfunction
 */
function GPT(prompt, ...optionalArgs) {
  // If no prompt is provided
  if (!prompt) {
    throw new Error("Error: Please provide a prompt");
  }

  const cacheKey = "GPT_CACHE_" + Utilities.base64EncodeWebSafe(prompt);

  // check if result is already cached
  const cachedResult = cache.get(cacheKey);

  if (cachedResult) {
    Logger.log("Getting from Cache");
    return cachedResult;
  }

  if (optionalArgs.length > 0) {
    for (let option of optionalArgs) {
      prompt += `,${option}`;
    }
  }

  const response = sendToAPI(prompt);

  return response;
}


/**
 * Send data to api and return response
 */
function sendToAPI(prompt) {
  Logger.log("Getting from API");

  const model = store.getProperty('model');
  const temperature = Number(store.getProperty('temperature'));
  const apiKey = store.getProperty("api-key");

  Logger.log(apiKey);

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
    "muteHttpExceptions": true,
    "method": "post",
    "headers": headers,
    "payload": JSON.stringify(data)
  }

  const response = UrlFetchApp.fetch(apiEndpoint, options);

  if (response.getResponseCode() >= 200 && response.getResponseCode() < 300) {
    const jsonData = JSON.parse(response.getContentText());
    const message = jsonData.choices[0].message.content;

    // store in cache
    const cacheTime = store.getProperty("cacheTime");
    cache.put(cacheKey, response, Number(cacheTime));

    return message;
  } else {
    // if an error occured
    Logger.log("API request failed:", response);

    throw new Error("Error: API request failed");
  }
}


/**
 * Test gpt
 */
function test() {
  const settings = store.getProperty('temperature');

  console.log(typeof (settings));
}




































