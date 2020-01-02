const qdb = require('../db/index.js');
const questionsModel = require('./questionsModel.js');
const { at, apt } = require('../../config.js');

const queryAnswers = (question_id, page, count) => {
  let output = {
    question: question_id,
    page: page,
    count: count
  }

  return new Promise((resolve, reject) => {
    let q = `SELECT * FROM ${at} WHERE question_id = $1 AND reported = $2 ORDER BY helpful DESC`; // OFFSET $3 LIMIT $4
    let p = [question_id, 0]; // , 5, count

    qdb.query(q, p).then((answers) => {
      let photos = [];
      output.results = answers;
      output.results.forEach((el) => {
        el.photos = [];
        photos.push(questionsModel.getPhotos(el.id));
      });
      Promise.all(photos).then((ansPhotos) => {
        ansPhotos.forEach((photo, i) => {
          if (photo.length > 0) {
            photo.forEach((el, j) => {
              output.results.forEach((q, k) => {
                if (q.id === el.answer_id) {
                  q.photos.push({id: el.id, url: el.url});
                }
              })
            })
          }
        })
        resolve(output);
      })
    });
  });
}

module.exports = { queryAnswers };