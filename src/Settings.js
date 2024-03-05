var models = [
  "gpt-4",
  "gpt-4-preview",
  "gpt-4-vision-preview",
  "gpt-4-32k",
  "gpt-3.5-turbo-16k",
  "gpt-3.5-turbo"
];
var apiKey = "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";


/**
 * Set model and temperature
 */
function GPT_SETTINGS(model, temperature, key) {
  model = model || "gpt-3.5-turbo";
  temperature = temperature || 0.35;

  Logger.log(model);
  Logger.log(temperature);

  // If an invalid model is provided
  if (!models.includes(model)) {
    const m = `Error: Invalid model`
    return m;
  }

  // If temperature is invalid
  if (!(temperature >= 0 && temperature <= 2)) {
    return "Error: Temperature must be within 0 and 2";
  }

  // If api key is provided
  if (key) {
    store.setProperty('api-key', key);
  }

  store.setProperties(
    {
      model: model,
      temperature: temperature
    }
  )

  return `model: ${model}, temperature: ${temperature}. Saved!`;
}









































