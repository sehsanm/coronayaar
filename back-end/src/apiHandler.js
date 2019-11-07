const {
    addDocument
} = require('./dataHandler');
const questions = require('./question_data');
const questions_in_exam = process.env.QUESTION_COUNT || 1; //FOR DEV PURPOSE 1
let current_chunk = 0;
let shuffled_index  =  shuffle([...Array(questions.length).keys()]) ; 

function pre_process_questions(from, to) {
    shuffle_part = shuffled_index.slice(from, to)
    filtered = shuffle_part.map((elem, index) => (questions[elem]))
    return filtered.map((elem, index) => {
        let ret = {}
        ret.title = ['نسبت', elem.question.w0, 'به', elem.question.w1, 'مثل  کدام است؟'].join(' ');
        ret.options = elem.options.map((el) => {
            return [el.w0, 'به', el.w1].join(' ');
        });

        ret.options.push('هیچکدام');
        ret.index = shuffle_part[index];

        return ret;
    });

}

function post_process_answers(payload) {
    ret = {
        userData: payload.userData, 
        answers: payload.answers,
    }
    
    ret.questions = payload.questions.map((elem)=> {
        return {
            shown_question: elem, 
            original_question: questions[elem.index]              
        }
    }) ; 

    return ret ; 
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}


module.exports.answerHandler = function (req, res) {
    let payload = req.body ; 

    addDocument(post_process_answers(payload), console.log);
    res.send('Done');
}

module.exports.questionHandler = function (req, res) {
    if ((current_chunk + 1) * questions_in_exam > questions.length){
        current_chunk = 0;
        console.log('Resetting Chunk');
    }
    console.log('sending next chunck ', current_chunk);
    ret = pre_process_questions(current_chunk * questions_in_exam, 
        (current_chunk + 1) * questions_in_exam) ; 

    res.send(ret);
    current_chunk = current_chunk + 1

}

