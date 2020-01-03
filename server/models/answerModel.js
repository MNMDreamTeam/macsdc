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
                  q.photos.push({ id: el.id, url: el.url });
                }
              })
            })
          }
        })
        resolve(output);
      })
    })
      .catch((err) => {
        reject('Could not query answers ---', err);
      });
  });
};

const insertP = (id, url) => {
  return new Promise((resolve, reject) => {
    let q = `INSERT INTO ${apt} (answer_id, url) VALUES ($1, $2);`;
    let p = [id, url];

    qdb.query(q, p).then(() => {
      // console.log(arguments)
      resolve('Success');
    })
  })
}

const insertA = (qId, a, n, e, ph) => {
  return new Promise((resolve, reject) => {
    let q = `INSERT INTO ${at} (question_id, body, date_written, answerer_name, answerer_email, helpful)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;`;
    let p = [qId, a, new Date(), n, e, 0];

    qdb.query(q, p).then((aId) => {
      if (ph) {
        let photoArr;
        if (typeof ph === 'string') {
          photoArr = ph.split(',');
        } else {
          photoArr = ph;
        }
        let photos = [];
        photoArr.forEach(el => {
          photos.push(insertP(aId[0].id, el));
        });
        Promise.all(photos).then(() => {
          console.log('Photo(s) Inserted');
        })
        resolve('Success');
      }
    })
      .catch((err) => {
        reject('Counld not insert photos', err);
      })
  });
};

const helpful = (aId) => {
  return new Promise((resolve, reject) => {
    let q = `UPDATE ${at} SET helpful = helpful + $1 WHERE id = $2;`;
    let p = [1, aId];

    qdb.query(q, p).then(() => {
      resolve();
    })
      .catch((err) => {
        console.log(err);
      })
  })
}

const reported = (aId) => {
  return new Promise((resolve, reject) => {
    let q = `UPDATE ${at} SET reported = 1 WHERE id = $1;`;
    let p = [aId];

    qdb.query(q, p).then(() => {
      resolve();
    })
      .catch((err) => {
        console.log(err);
      })
  })
}

module.exports = { queryAnswers, insertA, helpful, reported };