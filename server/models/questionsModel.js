const qdb = require('../db/index.js');
const { qt, at, apt } = require('../../config.js');

const getAnswers = (qId) => {
  return new Promise((resolve, reject) => {
    let q = `SELECT * FROM ${at} WHERE question_id = $1 AND reported = $2`;
    let p = [qId, 0];

    qdb.query(q, p).then((res) => {
      resolve(res);
    })
  })
}

const getPhotos = (aId) => {
  return new Promise((resolve, reject) => {
    let q = `SELECT * FROM ${apt} WHERE answer_id = $1`;
    let p = [aId];

    qdb.query(q, p).then((res) => {
      resolve(res);
    })
  })
}

const queryQuestions = (product_id, page, count) => {
  let output = {
    product_id: product_id,
  }

  return new Promise((resolve, reject) => {
    let q = `SELECT * FROM ${qt} WHERE product_id = $1 AND reported = $2 ORDER BY question_helpfulness DESC OFFSET $3 LIMIT $4`;
    let p = [product_id, 0, (page * count), count];

    qdb.query(q, p).then((questions) => {
      let answersArr = [];
      output.results = questions;
      output.results.forEach((el, i) => {
        output.results[i].answers = {};
        answersArr.push(getAnswers(el.question_id));
      });
      Promise.all(answersArr).then((answers) => {
        let photos = [];
        answers.forEach((ans, j) => { // fix this nested loop, no need for it
          ans.forEach((obj) => {
            output.results[j].answers[obj.id] = obj;
            output.results[j].answers[obj.id].photos = [];
            photos.push(getPhotos(obj.id));
          })
        });
        Promise.all(photos).then((ansPhotos) => {
          ansPhotos.forEach((photo, i) => {
            if (photo.length > 0) {
              // I'm very sorry for this.....but here we go
              photo.forEach((el, j) => {
                output.results.forEach((q, k) => {
                  if (q.answers.hasOwnProperty(el.answer_id)) {
                    q.answers[el.answer_id].photos.push(el.url);
                  }
                })
              })
            }
          })
          resolve(output);
        })
      });
    })
      .catch((err) => {
        reject('Could not query --', err);
      })
  })
}

const insertQ = (product_id, qu, name, email) => {
  return new Promise((resolve, reject) => {
    let q = `INSERT INTO ${qt}
              (product_id, question_body, question_date, asker_name, asker_email, reported)
              VALUES ($1, $2, $3, $4, $5, $6);`;
    let p = [product_id, qu, new Date(), name, email, 0];

    qdb.query(q, p).then(() => {
      resolve();
    })
      .catch((err) => {
        console.log('Error on Insert', err);
      })
  })
}

const helpful = (question_id) => {
  return new Promise((resolve, reject) => {
    let q = `UPDATE ${qt} SET question_helpfulness = question_helpfulness + $1 WHERE question_id = $2;`;
    let p = [1, question_id];

    qdb.query(q, p).then(() => {
      resolve();
    })
      .catch((err) => {
        console.log(err);
      })
  })
}

const reported = (question_id) => {
  return new Promise((resolve, reject) => {
    let q = `UPDATE ${qt} SET reported = 1 WHERE question_id = $1;`;
    let p = [question_id];

    qdb.query(q, p).then(() => {
      resolve();
    })
      .catch((err) => {
        console.log(err);
      })
  })
}

module.exports = { queryQuestions, getPhotos, insertQ, helpful, reported };