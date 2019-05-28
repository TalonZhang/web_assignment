function showCustomer()
{
    var obj;
    var xmlhttp;
    if (window.XMLHttpRequest)
    {
        // IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
        xmlhttp=new XMLHttpRequest();
    }
    else
    {
        // IE6, IE5 浏览器执行代码
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            obj=xmlhttp.responseText;
            obj=JSON.parse(obj);
            console.log(typeof(obj))

            for (var i = 0; i < obj.length; i++) {
                let item=document.createElement('div');
                let title=document.createElement('div');
                let status=document.createElement('div');
                let content=document.createElement('div');
                item.setAttribute('class','item');
                title.setAttribute('class','title');
                status.setAttribute('class','status');
                content.setAttribute('class','content');
                let textnode;
                textnode=document.createTextNode(obj[i]['blog_title']);
                title.appendChild(textnode);
                textnode=document.createTextNode(obj[i]['blog_time']);
                status.appendChild(textnode);
                content.innerHTML=obj[i]['blog_content'];
                item.appendChild(title);
                item.appendChild(status);
                item.appendChild(content);
                document.getElementById("article-list").appendChild(item);
            }
        }
    }
    xmlhttp.open("GET","http://127.0.0.1:8081",true);
    xmlhttp.send();
}
showCustomer();