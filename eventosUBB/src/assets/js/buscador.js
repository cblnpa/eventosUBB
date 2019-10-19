$(document).ready(function(){
    $('#buscador-evento').keyup(function(){
        var nombres = $('#nombre-evento');
        var buscando = $(this).val();
        var item= '';
        for( var i=0; i < nombres.length; i++){
            item = $(nombres[i]).html().toLowerCase();
            console.log(item);
            for( var x = 0; x < item.length; x++){
                if(buscando.length == 0 || item.indexOf(buscando) > -1) {
                    console.log(buscando);
                    $(nombres[i]).parents('#card').show();
                } else {
                    $(nombres[i]).parents('#card').hide();
                }
            }
        }
    })
})

