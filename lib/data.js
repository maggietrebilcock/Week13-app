//import fs from 'fs';
//import path from 'path';

import got from 'got';

// get filepath to data directory
// const dataDir = path.join(process.cwd(), 'data');

const dataURL = "https://dev-srjc-fall-2021-cs55-13.pantheonsite.io/wp-json/twentytwentyone-child/v1/special";

// const dataDirTwo =path.join(process.cwd(), 'data' );
// function returns ids for all json objects in array
export async function getAllIds() {
  //const filePath = path.join(dataDir, 'persons.json');
  // load json file contents
  // const jsonString = fs.readFileSync(filePath, 'utf8');

  let jsonString;
  try {
    jsonString = await got(dataURL);
    console.log(jsonString.body);
  } catch (error) {
    jsonString.body = [];
    console.log(error);
  }

  // convert string from file into json array object
  //const jsonObj = JSON.parse(jsonString);
  // use map() on array to extract just id properties into new array of obj values
  // const filePath2 = path.join(dataDir, 'persons2.json');
  // const jsonString2 = fs.readFileSync(filePath2, 'utf8');
  // const jsonObj2 = JSON.parse(jsonString2);
  // const allJsonObj = jsonObj.concat(jsonObj2);
  const jsonObj = JSON.parse(jsonString.body);

  return jsonObj.map(item => {
    return {
      params: {
        id: item.ID.toString()
      }
    }
  });

}

// function returns names and ids for all json objects in array, sorted by name property
export async function getSortedList() {
  // get filepath to json file
  // const filePath = path.join(dataDir, 'persons.json');
  // load json file contents
  // const jsonString = fs.readFileSync(filePath, 'utf8');
  // convert string from file into json array object
  let jsonString;
  try {
    jsonString = await got(dataURL);
    console.log(jsonString.body);
  } catch (error) {
    jsonString.body = [];
    console.log(error);
  }
  const jsonObj = JSON.parse(jsonString.body);
  // sort json array by name property

  // const filePath2 = path.join(dataDir, 'persons2.json');
  // const jsonString2 = fs.readFileSync(filePath2, 'utf8');
  // const jsonObj2 = JSON.parse(jsonString2);
  // const allJsonObj = jsonObj.concat(jsonObj2);

  jsonObj.sort(function(a, b) {
    return a.post_title.localeCompare(b.post_title);
  });

  // use map() on array to extract just id + name properties into new array of obj values
  return jsonObj.map(item => {
    return {
      id: item.ID.toString(),
      name: item.post_title
    }
  });
}

export async function getData(idRequested) {
  // get filepath to json file
  //const filePath = path.join(dataDir, 'persons.json');
  // load json file contents
  //const jsonString = fs.readFileSync(filePath, 'utf8');
  // convert string from file into json array object
  let jsonString;
  try {
    jsonString = await got(dataURL);
    console.log(jsonString.body);
  } catch (error) {
    jsonString.body = [];
    console.log(error);
  }
  const jsonObj = JSON.parse(jsonString.body);
  // find object value in array that has matching id

  // const filePath2 = path.join(dataDir, 'persons2.json');
  // const jsonString2 = fs.readFileSync(filePath2, 'utf8');
  // const jsonObj2 = JSON.parse(jsonString2);
  // const allJsonObj = jsonObj.concat(jsonObj2);

  const objMatch = jsonObj.filter(obj => {
    return obj.ID.toString() === idRequested;
  });

  // extract object value in filtered array if any
  let objReturned;
  if (objMatch.length > 0) {
    objReturned = objMatch[0];
  } else {
    objReturned = {};
  }
  // console.log(objReturned);

  // return object value found
  return objReturned;
}