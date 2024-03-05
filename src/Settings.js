var models = [
  "gpt-4",
  "gpt-4-preview",
  "gpt-4-vision-preview",
  "gpt-4-32k",
  "gpt-3.5-turbo-16k",
  "gpt-3.5-turbo"
];

/**
 * Sets the settings to use for the OpenAI GPT API.
 * 
 * @param {string} model - The name of the model to use.
 * @param {number} temperature - A number between 0 and 2, controlling the randomness of the model's output.
 * @param {string} key - Your API key for authentication.
 * @param {number} cacheTime - Time in seconds for how long to store the requested response in the cache.
 * @return {string} - Success message indicating that the settings have been saved.
 * @customfunction
 */
function GPT_SETTINGS(model, temperature, key, cacheTime) {
  model = model || "gpt-3.5-turbo";
  temperature = temperature || 0.35;
  cacheTime = cacheTime || 3600;

  // If an invalid model is provided
  if (!models.includes(model)) {
    throw new Error("Invalid model");
  }

  // If temperature is invalid
  if (!(temperature >= 0 && temperature <= 2)) {
    throw new Error("Temperature must be within 0 and 2");
  }

  // If api key is provided
  if (key) {
    store.setProperty('api-key', key);
  }

  store.setProperties(
    {
      model: model,
      temperature: temperature,
      cacheTime: cacheTime
    }
  )

  Logger.log(`Settings Saved: ${model}, ${temperature}, ${key}, ${cacheTime}.`)

  return `Settings Saved!`;
}









































