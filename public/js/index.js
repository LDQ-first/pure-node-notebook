
require('../css/index.scss');
require('highlight.js').initHighlightingOnLoad();

setTimeout(function(){
    $.ajax({
        url: '/user.action',
        method: 'get',
        success: function(arr){
            console.log(arr);
            var liStr = arr.map(function(ele){
                return '<li>'+ ele +'</li>'
            }).join('');
            $('#root').html(liStr);

        },
        error: function(error){
            console.log(error);
        }
    })
    $.ajax({
        url: '/list.action',
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        data: JSON.stringify([
            'name', 'ldq'
        ]),
        success: function(arr){
            console.log(arr);
            var liStr = arr.map(function(ele){
                return '<li>'+ ele +'</li>'
            }).join('');
            $('#shop').html(liStr);
            
        },
        error: function(error){
            console.log(error);
        }
    })
},1000)
