
// Requiring the module 
import reader from 'xlsx' 
import OpenAI from 'openai';

// Reading our test file 
const file = reader.readFile('Dataset\\CSE-AI\\Unitwise Marks\\ESE\\ES21203CA_modified.xls');
const openai = new OpenAI({
	apiKey: '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', // This is the default and can be omitted
  });


let data = [] 

const sheets = file.SheetNames 

for(let i = 0; i < sheets.length; i++) 
{ 
const temp = reader.utils.sheet_to_json( 
		file.Sheets[file.SheetNames[i]]) 
temp.forEach((res) => { 
	data.push(res) 
}) 
} 

console.log(data)

async function main(message) {
	const marks=70;
    try {
      const chatCompletion = await openai.chat.completions.create({
	
        messages: [{ role: 'user', content: message }],
        model: 'gpt-3.5-turbo', // Specify GPT-4.5 Turbo model here
      });
  
      console.log(chatCompletion.message); // Log the entire response object
  
      // Access the completion text and log it to the console
      const completionText = chatCompletion.choices[0].message.content;
      console.log(completionText);
    } catch (error) {
      console.error("Error completing chat:", error);
    }
  }

  // main().catch(console.error);

// // Printing data 
// console.log(data)
