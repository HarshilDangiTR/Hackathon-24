export const createData = function (req, res) {
    console.log("createData");
}

import fs from 'fs';
import csv from 'csv-parser';
import axios from 'axios';

// Define weights for each parameter  
const weights = {
    sum_time_viewed: 0.1,
    count_plays: 0.1,
    avg_time_viewed: 0.1,
    count_loads: 0.1,
    load_play_ratio: 0.1,
    avg_view_drop_off: -0.1,
    engagement_ranking: 0.2,
    avg_completion_rate: 0.3,
};

const apiKey = 'ba3d893b16314ec1ac85abaea9ea9df0'; // Replace with your OpenAI API key
const apiUrl = 'https://a208321-datavizaipocbfv5-zyzj.openai.azure.com/openai/deployments/DatavizAIPOCbFV5-gpt-35-turbo/chat/completions?api-version=2023-07-01-preview'

// Load data from CSV file  
const data = [];

export const readFile = () => {

    // fs.createReadStream('C:\\Users\\6118960\\Downloads\\dataset.json')
    //     .on('data', (row) => {
    //         data.push(row);
    //         getReponseFromOpenAI(input, data[0]);
    //     })
    //     .on('end', () => {
    //         // const results = [];
    //         // // Calculate average value of each parameter  
    //         // const avg_views = data.reduce((sum, row) => sum + parseInt(row.sum_time_viewed), 0) / data.length;  
    //         // const avg_count_plays = data.reduce((sum, row) => sum + parseInt(row.count_plays), 0) / data.length;  
    //         // const avg_avg_time_viewed = data.reduce((sum, row) => sum + parseInt(row.avg_time_viewed), 0) / data.length; 
    //         // const avg_count_loads = data.reduce((sum, row) => sum + parseInt(row.count_loads), 0) / data.length; 
    //         // const avg_load_play_ratio = data.reduce((sum, row) => sum + parseInt(row.load_play_ratio), 0) / data.length;
    //         // const avg_view_drop_off = data.reduce((sum, row) => sum + parseInt(row.avg_view_drop_off), 0) / data.length;
    //         // const avg_engagement_ranking = data.reduce((sum, row) => sum + parseInt(row.engagement_ranking), 0) / data.length;
    //         // const avg_avg_completion_rate = data.reduce((sum, row) => sum + parseInt(row.avg_completion_rate), 0) / data.length;
    //     });

    fs.readFile("C:\\Users\\6118960\\Downloads\\dataset.json", 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        const jsonData = JSON.parse(data);
        console.log(jsonData[0]);
        const finalJSON = [jsonData[0], jsonData[1]];
        getReponseFromOpenAI(input, finalJSON);
      });
}

const getReponseFromOpenAI = (prompts, inputJsonArray) => {
    const headers = {
        'Content-Type': 'application/json',
        'api-key': `${apiKey}`,
    };

    const finalJSON = JSON.stringify(inputJsonArray);

    const finalInput = [
        input[0],
        {
            "role": "user",
            "content": finalJSON
        }
    ]

    // // console.log({ inputJsonArray });
    // inputJsonArray.forEach((element) => {
    //     finalInput.push(element);
    //     }
    // )

    console.log({inputJsonArray});

    const requestBody = {
        "temperature": 0.3,
        "top_p": 1,
        "frequency_penalty": 0,
        "presence_penalty": 0,
        "max_tokens": 350,
        "stop": null,
        "messages": finalInput
    };

    axios.post(apiUrl, requestBody, { headers: headers })
        .then(response => {
            console.log(response.data.choices[0].message.content);
        })
        .catch(error => {
            console.error(error.response);
        });
};

// export const getReponseFromOpenAI = (userInput) => {
//     const headers = new HttpHeaders({
//         'Content-Type': 'application/json',
//         'api-key': `${this.apiKey}`,
//       });

//       const requestBody = {

//         "temperature": 0.3,
//         "top_p": 1,
//         "frequency_penalty": 0,
//         "presence_penalty": 0,
//         "max_tokens": 350,
//         "stop": null, 
//         //"user": "TASK_PANEL",
//           "messages":userInput
//       };


//       return this.http.post<any>(this.apiUrl, requestBody, { headers: headers })
// }

// export const readFile = () => {

//     fs.createReadStream('C:\\Users\\6118960\\Downloads\\hackathon.csv')  
//     .pipe(csv())  
//     .on('data', (row) => {  
//         data.push(row);  
//     })  
//     .on('end', () => {  
//         // Calculate average value of each parameter  
//     const avg_views = data.reduce((sum, row) => sum + parseInt(row.sum_time_viewed), 0) / data.length;  
//     const avg_count_plays = data.reduce((sum, row) => sum + parseInt(row.count_plays), 0) / data.length;  
//     const avg_avg_time_viewed = data.reduce((sum, row) => sum + parseInt(row.avg_time_viewed), 0) / data.length; 
//     const avg_count_loads = data.reduce((sum, row) => sum + parseInt(row.count_loads), 0) / data.length; 
//     const avg_load_play_ratio = data.reduce((sum, row) => sum + parseInt(row.load_play_ratio), 0) / data.length;
//     const avg_view_drop_off = data.reduce((sum, row) => sum + parseInt(row.avg_view_drop_off), 0) / data.length;
//     const avg_engagement_ranking = data.reduce((sum, row) => sum + parseInt(row.engagement_ranking), 0) / data.length;
//     const avg_avg_completion_rate = data.reduce((sum, row) => sum + parseInt(row.avg_completion_rate), 0) / data.length;



//     console.log(avg_views, avg_count_plays, avg_avg_time_viewed);

//     // Calculate weighted average score for each video  
//     data.forEach((row) => {  
//         const score = (
//             weights.sum_time_viewed * parseInt(row.sum_time_viewed)  
//             + weights.count_plays * parseInt(row.count_plays)
//             + weights.avg_time_viewed * parseInt(row.avg_time_viewed)
//             + weights.count_loads * parseInt(row.count_loads)
//             + weights.load_play_ratio * parseInt(row.load_play_ratio)
//             + weights.avg_view_drop_off * parseInt(row.avg_view_drop_off)
//             + weights.engagement_ranking * parseInt(row.engagement_ranking)
//             + weights.avg_completion_rate * parseInt(row.avg_completion_rate)
//         ) / (weights.sum_time_viewed + weights.count_plays + weights.avg_time_viewed + weights.count_loads + weights.load_play_ratio 
//             + weights.avg_view_drop_off + weights.engagement_ranking + weights.avg_completion_rate); 

//         row.score = score;  


//         row.percentage = score / ((weights.sum_time_viewed * avg_views
//             + weights.count_plays * avg_count_plays
//             + weights.avg_time_viewed * avg_avg_time_viewed
//             + weights.count_loads * avg_count_loads
//             + weights.load_play_ratio * avg_load_play_ratio
//             + weights.avg_view_drop_off * avg_view_drop_off
//             + weights.engagement_ranking * avg_engagement_ranking
//             + weights.avg_completion_rate * avg_avg_completion_rate) 
//             / 
//             (weights.sum_time_viewed + weights.count_plays + weights.avg_time_viewed + weights.count_loads 
//                 + weights.load_play_ratio + weights.avg_view_drop_off + weights.engagement_ranking + weights.avg_completion_rate)) * 100;

//             row.success = row.percentage >= 70 ? 1 : 0; 

//             console.log(row.score , row.percentage);
//         });  

//         // Print the resulting data  
//         // console.log(data);  
//     });  

// }

const input = [
    {
        "role": "system",
        "content": `You are an agent which takes some input parameters, for a video and determine whether that video will be successful or not. I have these parameters :   
                    sum_time_viewed - Total time video viewed.  
                    count_plays - Number of times video played.
                    avg_view_drop_off - Number of times the video was dropped off in between.
                    author_name - Name of the author.
                    engagement_ranking - The ranking of engagement of the video.
                    avg_completion_rate - The rate at which a video is seen completely by any user.
                    
                    
                    title - Title of the video.
                    category - Category of the video.
                    
                    More the sum_time_viewed, more the video is successful
                    More the count_plays, more the video is successful
                    More the avg_view_drop_odd, less the video will be successful.
                    The title should be relevant to the category of the video.
                    More the engagement_ranking, more chances of video being successful.
                    The higher the avg_completion_rate, higher the chances of video being successful.
                    I will provide input in the form of JSON.
                    Use this info to determine the success rate of the video.
                    Determine if the video is successful or not. Dont give me details, just tell me if the video is successful or not.
                    Add the success parameter and reason in detail in the json.`
    },
    {
        "role": "user",
        "content": `sum_time_viewed = 20, count_plays = 3, avg_view_drop_odd = 2, author_name = Harshil, title = How to create node server, category = Development, engagement_ranking = 3, avg_completion_rate = 70
                    sum_time_viewed = 10, count_plays = 2, avg_view_drop_odd = 4, author_name = Dhruv,
                    title = How to clean up your desk, category = Cleanliness, engagement_ranking = 2, avg_completion_rate = 80
                    sum_time_viewed = 50, count_plays = 5, avg_view_drop_odd = 1, author_name = Harshil,
                    title = How to drive a car, category = AWS, engagement_ranking = 5, avg_completion_rate = 90
                    . Let me know which videos can be successful.`
    }
]