## Installation

via npm:

```bash
$ npm install nm_page
```


## Use

```javascript

    // how to use ?

    var nm_page_obj = Object.create(NMPAGE);

    var opt = {
      dom:$('#nm_page-test')[0],
      totlePage:10,
      currentPage:1,
      callback:function(num){
        console.log(num);
        opt.currentPage = num;
        nm_page_obj.setup(opt);
        // or 
        // window.location.href = '/page?page=' + num;
      },
    }

    nm_page_obj.setup(opt);

```