(function(){'use strict';
// 1 - пирамиды с треугольным основанием
    var polyhedron1 = ['$D, B, B_1, C_1$','$D_1, B, B_1, C_1$','$A, B, B_1, C_1$','$A_1, B, B_1, C_1$',
                        '$D, B, B_1, C$','$D_1, B, B_1, C$','$A, B, B_1, C$','$A_1, B, B_1, C$',
                        '$A, A_1, D_1, B_1$','$A, A_1, D_1, C_1$','$A, A_1, D_1, B$','$A, A_1, D_1, C$',
                        '$A, A_1, D, B_1$','$A, A_1, D, C_1$','$A, A_1, D, B$','$A, A_1, D, C$',
                        '$C, C_1, B_1, A_1$','$C, C_1, B_1, A$','$C, C_1, B_1, D_1$','$C, C_1, B_1, D$',
                        '$C, C_1, B, A_1$','$C, C_1, B, A$','$C, C_1, B, D_1$','$C, C_1, B, D$',
                        '$A, D, D_1, B_1$','$A, D, D_1, C_1$','$A, D, D_1, B$','$A, D, D_1, C$',
                        '$A_1, D, D_1, B_1$','$A_1, D, D_1, C_1$','$A_1, D, D_1, B$','$A_1, D, D_1, C$',
                        '$A, B, D, C_1$','$A_1, B_1, D_1, C$','$B, C, D, A_1$','$B_1, C_1, D_1, A$',
                        '$D, A, C, B_1$','$D_1, A_1, C_1, B$','$A, B, C, D_1$','$A_1, B_1, C_1, D$',
                        '$D_1, D, C_1, B$','$D_1, D, C_1, B_1$','$D_1, D, C, B$','$D_1, D, C, B_1$',
                        '$A, A_1, B_1, C_1$','$A, A_1, B_1, C$','$A, A_1, B, C_1$','$A, A_1, B, C$',
                        '$A_1, B, B_1, D_1$','$A_1, B, B_1, D$','$A, B, B_1, D_1$','$A, B, B_1, D$',
                        '$C, C_1, A_1, D_1$','$C, C_1, A, D_1$','$C, C_1, A_1, D$','$C, C_1, A, D$',].iz();
// 2 - треугольные призмы
    var polyhedron2 = ['$A, B, D, A_1, C, B_1$', '$D_1, C_1, D, A_1, C, B_1$', '$D, C, D_1, A, C_1, B$',
                        '$A_1, B_1, D_1, A, C_1, B$','$A, B, D, B_1, C, C_1$', '$A, A_1, D, B_1, D_1, C_1$',
                        '$A, B, D, A_1, C, D_1$', '$B, A_1, C, B_1, D_1, C_1$', '$A, A_1, B_1, D_1, D, B$',
                        '$C, C_1, B_1, D_1, D, B$', '$A, A_1, C_1, D_1, D, C$', '$A, A_1, C_1, B_1, B, C$'].iz();
// 3 - пирамиды с прямоугольниками в основании
    var polyhedron3 = ['$B, C, C_1, B_1, A_1$', '$B, C, C_1, B_1, A$', '$B, C, C_1, B_1, D$', '$B, C, C_1, B_1, D_1$',
                        '$A, D, D_1, A_1, B$', '$A, D, D_1, A_1, B_1$', '$A, D, D_1, A_1, C$', '$A, D, D_1, A_1, C_1$',
                        '$C, D, D_1, C_1, B$', '$C, D, D_1, C_1, A$', '$C, D, D_1, C_1, B_1$', '$C, D, D_1, C_1, A_1$',
                        '$A, B, B_1, A_1, C_1$', '$A, B, B_1, A_1, D_1$', '$A, B, B_1, A_1, C$', '$A, B, B_1, A_1, D$',
                        '$A, B, C, D, C_1$', '$A, B, C, D, A_1$', '$A, B, C, D, B_1$', '$A, B, C, D, D_1$',
                        '$A_1, B_1, C_1, D_1, C$', '$A_1, B_1, C_1, D_1, A$', '$A_1, B_1, C_1, D_1, B$',
                        '$A_1, B_1, C_1, D_1, D$'].iz();
    var length_name = ['AB','CD','A_1B_1','C_1D_1'].iz();
    var width_name = ['AD','BC','A_1D_1','B_1C_1'].iz();
    var height_name = ['AA_1','BB_1','CC_1','DD_1'].iz();
    var vertices_in_points = [', вершинами которого являются точки ', ' с вершинами в точках ', ', заданного точками '].iz();
    var n = [sluchch(3,15,3), sluchch(1,15), sluchch(1,15)].shuffle();
    var length = n[0];
    var width = n[1];
    var height = n[2];
   
    var nConcated = sl(0,3);
   
    var parallelepipedDescription = ' '+
        'прямоугольного параллелепипеда $ABCDA_1B_1C_1D_1$'+
        (', у которого ').esli(nConcated)+
        ('$'+length_name+' = '+length+'$').esli(nConcated>=1)+
        (', $' + width_name +' = '+width +'$').esli(nConcated>=2)+
        (', $' + height_name+' = '+height+'$'     ).esli(nConcated>=3)+
        ','.esli(nConcated);
    chas2.task.setCountableTask([
        [
            {
                vel:"объём многогранника"+vertices_in_points+polyhedron1+parallelepipedDescription,
                nah:1, vin:1, zna:length*width*height/6
            },
            {
                vel:"объём многогранника"+vertices_in_points+polyhedron2+parallelepipedDescription,
                nah:1, vin:1, zna:length*width*height/2
            },
            {
                vel:"объём многогранника"+vertices_in_points+polyhedron3+parallelepipedDescription,
                nah:1, vin:1, zna:length*width*height/3
            }
        ].iz(),
    ].concat([
            {
                vel:"", bkv:length_name,nah:1,zna:length,rod:1,vin:1
            },
            {
                vel:"", bkv:width_name,nah:1,zna:width,rod:1,vin:1
            },
            {
                vel:"", bkv:height_name,nah:1,zna:height,rod:1,vin:1
            }
    ].slice(nConcated)
    )
    );
    chas2.task.modifiers.variativeABC();
    window.vopr.txt = window.vopr.txt.replace(/,,/g,',');
    window.vopr.txt = window.vopr.txt.replace(/,\?/g,'?');
})();
//https://matematikalegko.ru/prizmi/parallelepiped-chast-5.html, Обзад 245335, 245336, 245337, 245338, 245339
//Aisse-258
