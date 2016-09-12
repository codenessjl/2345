/**
 * Created by jianglei on 2016-08-13.
 */
if(window.localStorage){
    var storage = window.localStorage;
    //写入localstorage
    for(var i=0;i<storage.length;i++){
        //key(i)获得相应的键，再用getItem()方法获得对应的值
        document.write(storage.key(i)+ " : " + storage.getItem(storage.key(i)) + "<br>");
    }
}else{
    document.write('此浏览器不支持localStorage');
}