
function statement (invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`;
    const format = new Intl.NumberFormat("en-US",
        { style: "currency", currency: "USD",
            minimumFractionDigits: 2 }).format;

    for (let perf of invoice.performances) {
        const play = plays[perf.playID];
        let thisAmount = getAmount(perf.audience, play.type);

        // add volume credits
        volumeCredits += Math.max(perf.audience - 30, 0);
        // add extra credit for every ten comedy attendees
        if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);
        // print line for this order
        result += ` ${play.name}: ${format(thisAmount/100)} (${perf.audience} seats)\n`;
        totalAmount += thisAmount;
    }
    result += `Amount owed is ${format(totalAmount/100)}\n`;
    result += `You earned ${volumeCredits} credits\n`;
    return result;
}

//1 함수 추출
function getAmount(audience, playType) {
    let result;
    switch (playType) {
        case "tragedy":
            result = 40000;
            if (audience > 30) {
                result += 1000 * (audience - 30);
            }
            break;
        case "comedy":
            result = 30000;
            if (audience > 20) {
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
