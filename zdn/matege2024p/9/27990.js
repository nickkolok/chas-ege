(function() { 'use strict'; retryWhileError(function() {
    let a=sl(1, 9, 0.1);
    let b=Math.pow(2, sl(0, 6)) * Math.pow(5, sl(0, 3)) * [0.1, 1].iz();
    let d=sl(1, 4);
    let e=sl(1, 4);
    let f=sl(1, d);
    let g=sl(1, 4);
    let c=slKrome(g, 2, 3);

    let mantP = Math.pow(b, c);
    genAssertZ1000(mantP);

    let expP = c*f + e;
    while(mantP >= 10 && mantP % 10 == 0){
        mantP /= 10;
        expP++;
    }

    let mantConst = Math.pow(a, c);
    genAssertZ1000(mantConst);

    let expConst = c*d + e;

    let ans = Math.pow(a/b * Math.pow(10, d-f), g);

    genAssertZ1000(ans);
    genAssert((''+ans+'.').split('.')[1].length <=3 && ans <= 10000, 'ans-dot');

    let decorV = ['Найдите, какой объём', 'Какой наибольший объeм'];
    let decorP = ['давлении $p$, равном', 'давлениях $p$ не ниже'];
    let randInd = sl1();

	NAtask.setTask({
		text: `При адиабатическом процессе для идеального газа выполняется закон $pV^k = ${mantConst} \\cdot 10^{${expConst}} \\ \\mbox{Па} \\cdot \\mbox{м}^3$, где $p$ - давление в газе (в $\\mbox{Па}$),
        $V$ - объём газа (в $\\mbox{м}^3$), k = $${c.texrndfrac(g)}$. ${decorV[randInd]} $V$ (в $\\mbox{м}^3$) будет занимать газ при ${decorP[randInd]} $${mantP} \\cdot 10^{${expP}} \\ \\mbox{Па}$.`,
		answers: ans,
		authors: ['mcFrene'],
	});
	NAtask.modifiers.allDecimalsToStandard(/*true*/);
}, 2000);})();
//mcFrene
/*РешуЕГЭ: 27990: 526010, 28419, 42787, 505148, 505169, 28423, 28425, 28427, 28429, 42741, 42743, 
42745, 42747, 42749, 42751, 42753, 42755, 42757, 42759, 42761, 42763, 42765, 42767, 
42769, 42771, 42773, 42775, 42777, 42779, 42781, 42783, 42785
*/
