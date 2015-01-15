(function(){
    NAinfo.requireApiVersion(0, 0);
    var sred=sl(1,100);
    
    NAtask.setCountableTask([
        {vel:"средняя линия №%",nah:1,rod:1,zna:sred,nmn:"см",vin:"средняя линия №%",},
        {vel:"периметр №%",nah:1,rod:0,zna:sred*6,nmn:"см",vin:1},
    ]);
    NAtask.replaceCodeInText("№%",["равностороннего треугольника $ABC$","этого треугольника"]);
    NAtask.variativeABC();
})();
