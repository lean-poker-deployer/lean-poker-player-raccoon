'use strict';

function actionFold() {
    return 0;
}

function  actionCall(currentBuyIn, bet) {
    return +currentBuyIn - (+bet);
}

function actionRaise(currentBuyIn, bet, minimumRaise) {
    return actionCall(currentBuyIn, bet) + (+minimumRaise);
}

module.exports = {
    fold : actionFold,
    call : actionCall,
    raise : actionRaise
};
