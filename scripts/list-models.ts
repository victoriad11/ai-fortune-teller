import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

async function listModels() {
  const apiKey = process.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    console.error('Error: VITE_GEMINI_API_KEY not found in environment variables');
    console.log('Please create a .env file with your API key');
    process.exit(1);
  }

  try {
    console.log('Fetching available models from Google AI API...\n');

    // Use the REST API to list models
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    console.log('Available models for generateContent:\n');
    console.log('='.repeat(80));

    // Filter and display models that support generateContent
    const modelsWithGenerateContent = data.models?.filter((model: any) =>
      model.supportedGenerationMethods?.includes('generateContent')
    );

    if (!modelsWithGenerateContent || modelsWithGenerateContent.length === 0) {
      console.log('No models found that support generateContent');
      return;
    }

    modelsWithGenerateContent.forEach((model: any) => {
      console.log(`\nModel: ${model.name}`);
      console.log(`  Display Name: ${model.displayName}`);
      console.log(`  Description: ${model.description}`);
      console.log(`  Supported Methods: ${model.supportedGenerationMethods?.join(', ')}`);
      console.log(`  Input Token Limit: ${model.inputTokenLimit}`);
      console.log(`  Output Token Limit: ${model.outputTokenLimit}`);
    });

    console.log('\n' + '='.repeat(80));
    console.log('\nTo use a model in your code, use the name without "models/" prefix');
    console.log('Example: For "models/gemini-pro", use "gemini-pro"');
  } catch (error: any) {
    console.error('Error listing models:', error.message);
    if (error.cause) {
      console.error('Cause:', error.cause);
    }
  }
}

listModels();
