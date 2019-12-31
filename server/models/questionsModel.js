const qdb = require('../db/index.js');
const { qt, at, apt } = require('../../config.js');

const getAnswers = (qId) => {
  return new Promise( (resolve, reject) => {
    let q = `SELECT * FROM ${at} WHERE question_id = $1`;
    let p = [qId];

    qdb.query(q, p).then( (res) => {
      resolve(res);
    })
  })
}

const getPhotos = (aId) => {
  return new Promise( (resolve, reject) => {
    let q = `SELECT * FROM ${apt} WHERE answer_id = $1`;
    let p = [aId];

    qdb.query(q, p).then( (res) => {
      resolve(res);
    })
  })
}

const queryQuestions = (product_id, count) => {
  let output = {
    product_id: product_id,
  }

  return new Promise( (resolve, reject) => {
    let q = `SELECT * FROM ${qt} WHERE product_id = $1 AND reported = $2 ORDER BY question_id LIMIT $3`;
    let p = [product_id, 0, count];

    qdb.query(q, p).then( (questions) => {
      let answersArr = [];
      output.results = questions;
      output.results.forEach( (el, i) => {
        output.results[i].answers = {};
        answersArr.push(getAnswers(el.question_id));
      });
      Promise.all(answersArr).then( (answers) => {
        let photos = [];
        answers.forEach( (ans, j) => { // fix this nested loop, no need for it
          ans.forEach( (obj) => {
            output.results[j].answers[obj.id] = obj;
            output.results[j].answers[obj.id].photos = [];
            photos.push(getPhotos(obj.id));
          })
        });
        Promise.all(photos).then( (ansPhotos) => {
          ansPhotos.forEach( (photo, h) => {
            if (photo.length > 0) {
              console.log(output.results.answers[photo.answer_id]);
            }
          })
          resolve(output);
        })
      });
    })
  })
}

module.exports = { queryQuestions };