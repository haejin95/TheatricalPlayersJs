
function statement (invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`;
    const format = new Intl.NumberFormat("en-US",
        { style: "currency", currency: "USD",
            minimumFractionDigits: 2 }).format;

    for (let perf of invoice.performances) {
        //3 ㅎ함수 인라인하기
        volumeCredits += Math.max(perf.audience - 30, 0);
        if ("comedy" === playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5);

        result += ` ${playFor(perf).name}: ${format(getAmount(perf)/100)} (${perf.audience} seats)\n`;
        totalAmount += getAmount(perf);
    }
    result += `Amount owed is ${format(totalAmount/100)}\n`;
    result += `You earned ${volumeCredits} credits\n`;
    return result;
}



//2 임시변수를 질의 함수로 바꾸기 & 변수 쉽게 만들기
function playFor(performance) {
    return plays[performance.playID];
}

//1 함수 추출
function getAmount(performance) {
    let audience = performance.audience;
    let playType = playFor(performance).type;
    let result = 0;
    switch (playType) {
        case "tragedy":
            result = 40000;
            if (audience > 30) {
                result += 1000 * (audience - 30);
            }
            break;
        case "comedy":
            result = 30000;
            if (performance.audience > 20) {
                result += 10000 + 500 * (audience - 20);
            }
            result += 300 * audience;
            break;
        default:
            throw new Error(`unknown type: ${playType}`);
    }
    return result;
}

module.exports = statement;
