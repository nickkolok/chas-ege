var decor = {};

decor.railwayTrainGeneric = ['поезд', 'состав'];
decor.railwayTrainGeneric . description = 'Нейтральные слова для обозначения ж/д составов';

decor.railwayTrainType = ['скорый', 'пассажирский', 'товарный', 'почтовый', 'пожарный', 'пригородный', 'грузовой'];
decor.railwayTrainType . description = 'Прилагательные для описания ж/д составов';

decor.humanSettlementDestination = ['пункт', 'город', 'село', 'деревня'];
decor.humanSettlementDestination . description = 'Названия населённых пунктов для задач о движении: из пункта А в пункт В...';

decor.vehicleRacingOnRoad = ['автобус','маршрутка','трактор','автомобиль','мотоцикл','велосипед','электросамокат','гироскутер','мотоциклист','велосипедист','машина','гонщик','грузовик','автомобилист'];
decor.vehicleRacingOnRoad . description = 'Колёсное транспортное средство для задач про скорость';

decor.pedestrianOnRoad = ['пешеход','человек','турист','пионер','путешественник','дачник','колхозник','лесник','колдун'];
decor.pedestrianOnRoad . description = 'Пешеход, идущий из пункта A в пункт B';

decor.waterbodyWithoutCurrent = ['озеро', 'водохранилище'];
decor.waterbodyWithoutCurrent . description = 'Водоём со стоячей водой, в котором нет течения и скорость всяких лодок постоянна';

decor.activeFloatingVehicleM = ['пароход', 'теплоход', 'каяк', 'корабль', 'паром', 'катер'];
decor.activeFloatingVehicleM . description = 'Плавсредство с собственной скоростью - мужского рода';

decor.activeFloatingVehicleF = ['лодка', 'байдарка', 'баржа', 'яхта', 'моторная лодка'];
decor.activeFloatingVehicleF . description = 'Плавсредство с собственной скоростью - женского рода';

decor.activeFloatingVehicle = decor.activeFloatingVehicleM.concat(decor.activeFloatingVehicleF);
decor.activeFloatingVehicle . description = 'Плавсредство с собственной скоростью';

decor.berthForFloatingVehicle = ['пристань', 'причал'];
decor.berthForFloatingVehicle . description = 'Места, откуда плавает что-то';

decor.objectsFilledWithLiquid = ['бак', 'бассейн', 'ёмкость', 'отстойник', 'резервуар', 'цистерна']
decor.objectsFilledWithLiquid.description = 'Ёмкости, в которые можно залить большой объём жидкости';

decor.objectsTransportingLiquids = ['насос', 'помпа', 'труба', 'шланг'];
decor.objectsTransportingLiquids.description = 'Объекты для перекачивания жидкости';

////////////////////////////////////////////////////////////////////////
// Всякая мелочь
////////////////////////////////////////////////////////////////////////

decor.orderToFind = ['найдите','определите','вычислите'];
decor.orderToFind . description = 'Глаголы для обозначения спрашиваемой величины';
decor.orderToFind . declensionType = 'none';

decor.afterAWhile = ['на следующий день','через день','в этот же день','через два дня','через три дня','через неделю'];
decor.afterAWhile . description = 'Обстоятельство времени наступления следующего собычия';
decor.afterAWhile . declensionType = 'none';



try{
	global. decor = module.exports. decor = decor ;
} catch (e) {
}

