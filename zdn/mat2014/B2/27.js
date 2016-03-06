(function(){
var G_IN_POUND = 400;

var people_in_recipe;
var filling_in_recipe_factor = sl(1, 3) * 10;
var filling_in_recipe_factor_a = sl(1, filling_in_recipe_factor-1);
var required_people;

var answer;

do {
	people_in_recipe = sl(5, 30);
	required_people = slKrome(people_in_recipe, 3, 12);

	answer = G_IN_POUND / filling_in_recipe_factor * filling_in_recipe_factor_a / people_in_recipe * required_people;
} while(!(answer * 100).isZ());

var product = sklonlxkand([ 'чернослив', 'черника', 'земляника', 'ежевика' ].iz());

window.vopr.txt = 'Имеется рецепт пирога с ' + product.te + '. Для пирога на ' + people_in_recipe + ' человек следует взять ' +
                  '$'+filling_in_recipe_factor_a.frac(filling_in_recipe_factor) + '$ фунта ' + product.re +
                  '. Сколько граммов ' + product.re + ' следует взять для пирога, рассчитанного на ' + required_people +
                  ' человек? Считайте, что 1 фунт равен 0,4 кг';

window.vopr.ver = [ answer ];
})();
//Обзад 318582
// Sergey Naumov aka DrMGC
