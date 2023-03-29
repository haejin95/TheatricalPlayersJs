
function statement (invoice, plays) {
    let totalAmount = 0;
    let result = `Statement for ${invoice.customer}\n`;
    for (let perf of invoice.performances) {
        //3 함수 인라인하기
        result += ` ${playFor(perf).name}: ${usd(getAmount(perf))} (${perf.audience} seats)\n`;
        totalAmount += getAmount(perf)
    }
    //6. 반복문 쪼개기
    let volumeCredits = 0;
    for (let perf of invoice.performances) {
        volumeCredits += getVolumeCredit(perf);
    }
    result += `Amount owed is ${usd(totalAmount)}\n`;
    result += `You earned ${volumeCredits} credits\n`;
    return result;
}

//5. format 함수 추출하고, /100 합쳐주기
function usd(number) {
    return new Intl.NumberFormat("en-US",
        { style: "currency", currency: "USD",
            minimumFractionDigits: 2 }).format(number/100);
}

//4 함수 또 추출하기
function getVolumeCredit(performance) {
    let result = 0;
    result += Math.max(performance.audience - 30, 0);
    if ("comedy" === playFor(performance).type) {
        result += Math.floor(performance.audience / 5)
    }
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
