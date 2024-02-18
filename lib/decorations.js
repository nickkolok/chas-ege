var decor = {};

decor.railwayTrainGeneric = ['поезд', 'состав'];
decor.railwayTrainGeneric . description = 'Нейтральные слова для обозначения ж/д составов';

decor.railwayTrainType = ['скорый', 'пассажирский', 'товарный', 'почтовый', 'пожарный', 'пригородный'];
decor.railwayTrainType . description = 'Прилагательные для описания ж/д составов';

decor.humanSettlementDestination = ['пункт', 'город', 'село', 'деревня'];
decor.humanSettlementDestination . description = 'Названия населённых пунктов для задач о движении: из пункта А в пункт В...';

decor.vehicleRacingOnRoad = ['автомобиль','мотоцикл','велосипед','электросамокат','гироскутер','мотоциклист','велосипедист','машина','гонщик'];
decor.vehicleRacingOnRoad . description = 'Колёсное транспортное средство для задач про скорость';


try{
	global. decor = module.exports. decor = decor ;
} catch (e) {
}

