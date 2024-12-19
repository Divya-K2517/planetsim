//API function

const { api } = require('./api');


    function getQuestionData() {
        return api.getMercury();

    }

    console.log(getQuestionData());
