const sortByFirstChar = (data) => {
  const extractedData = data.reduce((acc, cur) => {
    // 첫 문자 get -> if string to uppercase
    //            else raw data
    const alphabet =
      typeof cur.login[0] === "string"
        ? cur.login[0].toUpperCase()
        : cur.login[0];

    //acc[alphabet]없으면 생성
    if (!acc[alphabet]) acc[alphabet] = { alphabet, record: [cur] };
    // 있으면 해당 레코드에 push
    else acc[alphabet].record.push(cur);

    return acc;
  }, {});

  const result = Object.values(extractedData).sort((a, b) => {
    const alphabetA = a.alphabet.toUpperCase();
    const alphabetB = b.alphabet.toUpperCase();
    if (typeof alphabetA === "number" && typeof alphabetB === "string") {
      return -1;
    }
    if (alphabetA < alphabetB) {
      return -1;
    }
    if (alphabetA > alphabetB) {
      return 1;
    }
    // 이름이 같을 경우
    return 0;
  });
  return result;
};

export default sortByFirstChar;
