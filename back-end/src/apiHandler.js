const {
    addDocument
} = require('./dataHandler');
const questions = require('./question_data');
const questions_in_exam = 1;
let current_chunk = 0;

function pre_process_questions(from, to) {
    filtered = questions.filter((elem, index) => (index >= from && index < to))
    return filtered.map((elem, index) => {
        let ret = {}
        ret.title = ['نسبت', elem.question.w0, 'به', elem.question.w1, 'مثل  کدام است؟'].join(' ');
        ret.options = elem.options.map((el) => {
            return [el.w0, 'به', el.w1].join(' ');
        });

        ret.options.push('هیچکدام');
        ret.index = from + index;

        return ret;
    });

}



module.exports.answerHandler = function (req, res) {
    console.log(req.body);
    addDocument(req.body, console.log);
    res.send('Done');
}

module.exports.questionHandler = function (req, res) {
    if ((current_chunk + 1) * questions_in_exam > questions_in_exam.length)
        current_chunk = 0;
    console.log('sending next chunck ', current_chunk);
    res.send(pre_process_questions(current_chunk * questions_in_exam, 
        (current_chunk + 1) * questions_in_exam));
    current_chunk = current_chunk + 1
}