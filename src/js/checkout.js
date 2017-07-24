/* funcion que se ejecuta hasta que termina de cargar las etiquetas html */ 
$(document).ready(function(){
    
var app = angular.module('product1', []);
app.controller('Ctrl1', function($scope) {
   // $scope.total1 = $("#price1").text()*$scope.quant1;
    //$("#total1").text($("#price1").text()*$scope.quant1)
});

$("#ini").attr('disabled', false);
/* input para incremetar o disminuir cantidad de articulos */ 
$('.btn-number').click(function(e){
    e.preventDefault();
    
    fieldName = $(this).attr('data-field');
    type      = $(this).attr('data-type');
    var input = $("input[name='"+fieldName+"']");
    var currentVal = parseInt(input.val());
    if (!isNaN(currentVal)) {
        if(type == 'minus') {
            
            if(currentVal > input.attr('min')) {
                input.val(currentVal - 1).change();
                var price=$("#price"+fieldName.replace("quant", "")).text();
                price=price.replace("$", "");
                price=price.replace(",", "");
                var num=input.val();
                num=num*price;
                $("#total"+fieldName.replace("quant", "")).text(currency(num.toFixed(2), 2, [',', "'", '.']));
                /* actualización de los precios según cantidad */ 
                var gTotal1=$("#total1").text();
                gTotal1=gTotal1.replace("$", "");
                gTotal1=gTotal1.replace(",", "");
                var gTotal2=$("#total2").text();
                gTotal2=gTotal2.replace("$", "");
                gTotal2=gTotal2.replace(",", "");
                var gTotal3=$("#total3").text();
                gTotal3=gTotal3.replace("$", "");
                gTotal3=gTotal3.replace(",", "");
                var gTotal= parseFloat(gTotal1)+parseFloat(gTotal2)+parseFloat(gTotal3);
                $("#gTotal").text(currency(gTotal.toFixed(2), 2, [',', "'", '.']));
                $("#granTotal").text(currency(gTotal.toFixed(2), 2, [',', "'", '.']));
            } 
            if(parseInt(input.val()) == input.attr('min')) {
                $(this).attr('disabled', true);
            }

        } else if(type == 'plus') {

            if(currentVal < input.attr('max')) {
                input.val(currentVal + 1).change();
                var price=$("#price"+fieldName.replace("quant", "")).text();
                price=price.replace("$", "");
                price=price.replace(",", "");
                var num=input.val();
                num=num*price;
                $("#total"+fieldName.replace("quant", "")).text(currency(num.toFixed(2), 2, [',', "'", '.']));
                /* actualización de los precios según cantidad */ 
                var gTotal1=$("#total1").text();
                gTotal1=gTotal1.replace("$", "");
                gTotal1=gTotal1.replace(",", "");
                var gTotal2=$("#total2").text();
                gTotal2=gTotal2.replace("$", "");
                gTotal2=gTotal2.replace(",", "");
                var gTotal3=$("#total3").text();
                gTotal3=gTotal3.replace("$", "");
                gTotal3=gTotal3.replace(",", "");
                var gTotal= parseFloat(gTotal1)+parseFloat(gTotal2)+parseFloat(gTotal3);
                $("#gTotal").text(currency(gTotal.toFixed(2), 2, [',', "'", '.']));
                $("#granTotal").text(currency(gTotal.toFixed(2), 2, [',', "'", '.']));
            }
            if(parseInt(input.val()) == input.attr('max')) {
                $(this).attr('disabled', true);
            }

        }
    } else {
        input.val(0);
    }
});
$('.input-number').focusin(function(){
   $(this).data('oldValue', $(this).val());
});
    /* validacion del rango de productos */ 
$('.input-number').change(function() {
    
    minValue =  parseInt($(this).attr('min'));
    maxValue =  parseInt($(this).attr('max'));
    valueCurrent = parseInt($(this).val());
    
    name = $(this).attr('name');
    if(valueCurrent >= minValue) {
        $(".btn-number[data-type='minus'][data-field='"+name+"']").removeAttr('disabled')
    } else {
        alert('Sorry, the minimum value was reached');
        $(this).val($(this).data('oldValue'));
    }
    if(valueCurrent <= maxValue) {
        $(".btn-number[data-type='plus'][data-field='"+name+"']").removeAttr('disabled')
    } else {
        alert('Sorry, the maximum value was reached');
        $(this).val($(this).data('oldValue'));
    }
    
    
});
    /* validacion numericas en los input */ 
$(".input-number").keydown(function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
             
            (e.keyCode == 65 && e.ctrlKey === true) || 
             
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 
                 return;
        }
        
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
    
});

/* forma de pago */ 
function creditCard(){
    if($('input[name=optradio]:checked').val()==1){
        alert("Estableciendo conexión con Pay Pal para realizar el pago");
    }
    else if($('input[name=optradio]:checked').val()==2){
        $("#creditCard").modal('show');
    }
    else if($('input[name=optradio]:checked').val()==3){
        alert("Generando código para pagar en Oxxo");
    }
}

/* validacion de los campos de tarjeta de credito */ 
function pago(){
    var f = new Date();
    $("#alert").attr("class","alert alert-danger fade out");
    if($("#nombre").val()!=$("#nombre").val().match(/^[a-zA-Z\s]*$/) ){
        $("#alert").attr("class","alert alert-danger fade in");
        $("#valText").text("En el Nombre del titular no estan permitidos caracteres especiales o números");
    }
    else if($("#card").val().length!=16 || $("#card").val()!=$("#card").val().match(/^[0-9]+$/)){
        $("#alert").attr("class","alert alert-danger fade in");
        $("#valText").text("El numero de tarjeta debe contener 16 digitos numericos");
    }
    else if($("#cvv").val().length!=3 || $("#cvv").val()!=$("#cvv").val().match(/^[0-9]+$/)){
        $("#alert").attr("class","alert alert-danger fade in");
        $("#valText").text("El codigo CVV debe contener 3 digitos numericos");
    }
    else if($("#month").val()<f.getMonth() +1 && $("#year").val()<=f.getFullYear()){
        $("#alert").attr("class","alert alert-danger fade in");
        $("#valText").text("La fecha no puede ser anterior al día de hoy");
    }
    else{
        alert("Datos ingresados correctamente efectuando pago");
    }
}

/* funcion para transformar un string en una cadena de moneda */ 
function currency(value, decimals, separators) {
    decimals = decimals >= 0 ? parseInt(decimals, 0) : 2;
    separators = separators || ['.', "'", ','];
    var number = (parseFloat(value) || 0).toFixed(decimals);
    if (number.length <= (4 + decimals))
        return number.replace('.', separators[separators.length - 1]);
    var parts = number.split(/[-.]/);
    value = parts[parts.length > 1 ? parts.length - 2 : 0];
    var result = value.substr(value.length - 3, 3) + (parts.length > 1 ?
        separators[separators.length - 1] + parts[parts.length - 1] : '');
    var start = value.length - 6;
    var idx = 0;
    while (start > -3) {
        result = (start > 0 ? value.substr(start, 3) : value.substr(0, 3 + start))
            + separators[idx] + result;
        idx = (++idx) % 2;
        start -= 3;
    }
    return "$"+(parts.length == 3 ? '-' : '') + result;
}