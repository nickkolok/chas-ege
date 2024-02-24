var decor = {};

decor.railwayTrainGeneric = ['поезд', 'состав'];
decor.railwayTrainGeneric . description = 'Нейтральные слова для обозначения ж/д составов';

decor.railwayTrainType = ['скорый', 'пассажирский', 'товарный', 'почтовый', 'пожарный', 'пригородный'];
decor.railwayTrainType . description = 'Прилагательные для описания ж/д составов';

decor.humanSettlementDestination = ['пункт', 'город', 'село', 'деревня'];
decor.humanSettlementDestination . description = 'Названия населённых пунктов для задач о движении: из пункта А в пункт В...';

decor.vehicleRacingOnRoad = ['автомобиль','мотоцикл','велосипед','электросамокат','гироскутер','мотоциклист','велосипедист','машина','гонщик','грузовик','автомобилист'];
decor.vehicleRacingOnRoad . description = 'Колёсное транспортное средство для задач про скорость';

decor.pedestrianOnRoad = ['пешеход','человек','турист','пионер','путешественник','дачник','колхозник'];
decor.pedestrianOnRoad . description = 'Пешеход, идущий из пункта A в пункт B';


try{
	global. decor = module.exports. decor = decor ;
} catch (e) {
}
