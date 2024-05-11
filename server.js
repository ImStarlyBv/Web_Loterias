"use strict";

const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");

// This example requires environment variables named "LANGUAGE_KEY" and "LANGUAGE_ENDPOINT"
const key = process.env.LANGUAGE_KEY;
const endpoint = process.env.LANGUAGE_ENDPOINT;

//Example sentences in different languages to be analyzed
const documents = [
    "This document is written in English.",
    "这是一个用中文写的文件",
];

//Example of how to use the client library to detect language
async function main() {
    console.log("== Language detection sample ==");
  
    const client = new TextAnalysisClient(endpoint, new AzureKeyCredential(key));
  
    const result = await client.analyze("LanguageDetection", documents);
  
    for (const doc of result) {
      if (!doc.error) {
        console.log(
          `ID ${doc.id} - Primary language: ${doc.primaryLanguage.name} (iso6391 name: ${doc.primaryLanguage.iso6391Name})`
        );
      }
    }
}

main().catch((err) => {
    console.error("The sample encountered an error:", err);
});